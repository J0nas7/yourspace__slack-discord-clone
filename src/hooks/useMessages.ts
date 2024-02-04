// External
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Internal
import { useAxios } from './'
import {
    useAppDispatch,
    useTypedSelector,
    setMessageStream,
    selectMessageStream,
    setConversationStream,
    selectConversationStream,
} from '@/redux'
import { CONSTANTS } from "@/data/CONSTANTS"
import { DirectMessageDTO, MessageDTO, ProfileDTO } from "@/types";
import { channel } from "diagnostics_channel";

export const useMessages = () => {
    // Hooks
    const { httpPostWithData, socketEmit } = useAxios()
    const router = useRouter()

    // Internal variables
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [newMessage, setNewMessage] = useState<string>('')
    const [editMessage, setEditMessage] = useState<boolean | MessageDTO>(false)
    const spaceName: string = router.query.spaceName ? router.query.spaceName as string : ""
    const channelName: string = router.query.channelName ? router.query.channelName as string : ""
    const partnerProfileID: number = router.query.profileID ? parseInt(router.query.profileID.toString()) : 0

    // Redux
    const dispatch = useAppDispatch()
    const reduxMessageStream = useTypedSelector(selectMessageStream)
    const reduxConversationStream = useTypedSelector(selectConversationStream)

    /**
     * Misc. Methods
     */
    const updateMessageFromStream = (updateMessage: any) => {
        let stream
        if (spaceName && channelName && reduxMessageStream) {
            stream = reduxMessageStream
        } else if (partnerProfileID && reduxConversationStream) {
            stream = reduxConversationStream
        }

        if (stream) {
            let index
            if (spaceName && channelName) {
                stream = stream as MessageDTO[]
                index = stream.findIndex((message: MessageDTO) => message.Message_ID === updateMessage.Message_ID)
            } else if (partnerProfileID) {
                stream = stream as DirectMessageDTO[]
                index = stream.findIndex((dm: DirectMessageDTO) => dm.DM_ID === updateMessage.DM_ID)
            }

            if (index) {
                const newStream = [
                    ...stream.slice(0, index),
                    updateMessage,
                    ...stream.slice(index + 1, stream.length)
                ]
                if (spaceName && channelName) {
                    dispatch(setMessageStream({
                        "data": newStream
                    }))
                } else if (partnerProfileID) {
                    dispatch(setConversationStream({
                        "data": newStream
                    }))
                }
            }
        }
    }

    const deleteMessageFromStream = (deleteMessage: any) => {
        if (spaceName && channelName) {
            const newStream = reduxMessageStream?.filter((message: MessageDTO) => message.Message_ID !== deleteMessage.Message_ID)
            dispatch(setMessageStream({
                "data": newStream
            }))
        } else if (partnerProfileID) {
            const newStream = reduxConversationStream?.filter((dm: DirectMessageDTO) => dm.DM_ID !== deleteMessage.DM_ID)
            dispatch(setConversationStream({
                "data": newStream
            }))
        }
    }

    /**
     * CRUD Methods
     */
    // Submit new message from input field
    const createNewMessage = (e?: FormEvent) => {
        e?.preventDefault()
        const messageData = {
            Message_Content: newMessage,
            Channel_Name: channelName,
            Space_Name: spaceName,
            Partner_ProfileID: partnerProfileID
        }

        // Send to API
        socketEmit('sendChatToServer', messageData)
        setNewMessage('')
    }

    // Request first 25 messages in the channel
    const readFirstMessages = async () => {
        if ((channelName && spaceName) || partnerProfileID) {
            // Variables to send to backend API
            const getMessagesVariables = {
                "Space_Name": spaceName,
                "Channel_Name": channelName,
                "Partner_ProfileID": partnerProfileID,
            }

            // Send request to the API for messages
            try {
                const data = await httpPostWithData("read25Messages", getMessagesVariables)

                if (data.data && data.data.length) {
                    if (channelName && spaceName) {
                        dispatch(setMessageStream({
                            "data": [...data.data]
                        }))
                    } else if (partnerProfileID) {
                        dispatch(setConversationStream({
                            "data": [...data.data]
                        }))
                    }
                }
            } catch (e) {
                console.log("useMessages readFirstMessages error", e)
            }
        }
    }

    const updateExistingMessage = async (existingMessage: MessageDTO, newContent: string) => {
        // Variables to send to backend API
        const updateMessageVariables = {
            "Message_ID": existingMessage.Message_ID,
            "New_Content": newContent
        }

        // Send update request to the API
        try {
            const data = await httpPostWithData("updateExistingMessage", updateMessageVariables)
            if (data.data) {
                updateMessageFromStream(data.data)
            }
        } catch (e) {
            console.log("useMessages updateExistingMessage error", e)
        }
    }

    // Reset message stream on channel-load
    const updateMessageStream = async (reset: boolean = true, message?: MessageDTO) => {
        let newMessageStream: any
        if (message && spaceName && channelName) {
            newMessageStream = [...reduxMessageStream!, message]
        } else if (message && partnerProfileID) {
            newMessageStream = [...reduxConversationStream!, message]
        } else if (reset) {
            newMessageStream = []
        }
        
        if (spaceName && channelName) {
            dispatch(setMessageStream({
                "data": newMessageStream!
            }))
        } else if (partnerProfileID) {
            dispatch(setConversationStream({
                "data": newMessageStream!
            }))
        }
    }

    // Delete message
    const deleteMessage = async (message: MessageDTO) => {
        if (!confirm("Are you sure you want to delete this message?")) return

        // Variables to send to backend API
        const deleteMessageVariables = {
            "Message_ID": message.Message_ID
        }

        // Send delete request to the API
        try {
            const data = await httpPostWithData("deleteMessage", deleteMessageVariables)
            deleteMessageFromStream(message)
        } catch (e) {
            console.log("useMessages deleteMessage error", e)
        }
    }

    return {
        // State
        newMessage, setNewMessage,

        // Variables
        reduxMessageStream,
        reduxConversationStream,

        // Methods
        createNewMessage,
        readFirstMessages,
        updateExistingMessage,
        updateMessageStream,
        deleteMessage
    }
}