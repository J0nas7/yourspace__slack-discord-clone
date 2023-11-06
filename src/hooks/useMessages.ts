// External
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Internal
import { useAxios } from './'
import {
    useAppDispatch,
    useTypedSelector,
    setMessageStream,
    selectMessageStream
} from '@/redux'
import { CONSTANTS } from "@/data/CONSTANTS"
import { MessageDTO, ProfileDTO } from "@/types";

export const useMessages = () => {
    // Hooks
    const { httpPostWithData, socketEmit } = useAxios()
    const router = useRouter()

    // Internal variables
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [newMessage, setNewMessage] = useState<string>('')
    const [editMessage, setEditMessage] = useState<boolean | MessageDTO>(false)
    const spaceName = router.query.spaceName?.toString()!
    const channelName = router.query.channelName

    // Redux
    const dispatch = useAppDispatch()
    const reduxMessageStream = useTypedSelector(selectMessageStream)

    /**
     * Misc. Methods
     */
    const updateMessageFromStream = (updateMessage: MessageDTO) => {
        if (reduxMessageStream) {
            const index = reduxMessageStream.findIndex((message: MessageDTO) => message.Message_ID === updateMessage.Message_ID)
            const newStream = [
                ...reduxMessageStream.slice(0, index),
                updateMessage,
                ...reduxMessageStream.slice(index + 1, reduxMessageStream.length)
            ]
            dispatch(setMessageStream({
                "data": newStream
            }))
        }
    }

    const deleteMessageFromStream = (deleteMessage: MessageDTO) => {
        const newStream = reduxMessageStream?.filter((message: MessageDTO) => message.Message_ID !== deleteMessage.Message_ID)

        dispatch(setMessageStream({
            "data": newStream
        }))
    }

    /**
     * CRUD Methods
     */
    // Submit new message from input field
    const createNewMessage = (e: any = '') => {
        e.preventDefault()
        const messageData = {
            Message_Content: newMessage,
            Channel_Name: channelName,
            Space_Name: spaceName
        }

        // Send to API
        socketEmit('sendChatToServer', messageData)
        setNewMessage('')
    }

    // Request first 10 messages in the channel
    const readFirstMessages = async () => {
        if (channelName && spaceName) {
            // Variables to send to backend API
            const getMessagesVariables = {
                "Space_Name": spaceName,
                "Channel_Name": channelName,
            }

            // Send request to the API for messages
            try {
                const data = await httpPostWithData("read10Messages", getMessagesVariables)
                if (data.data && data.data.length) {
                    dispatch(setMessageStream({
                        "data": [...data.data]
                    }))
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
        let newMessageStream: MessageDTO[]
        if (message) {
            newMessageStream = [...reduxMessageStream!, message]
        } else if (reset) {
            newMessageStream = []
        }

        dispatch(setMessageStream({
            "data": newMessageStream!
        }))
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

        // Methods
        createNewMessage,
        readFirstMessages,
        updateExistingMessage,
        updateMessageStream,
        deleteMessage
    }
}