// External
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Internal
import { useAxios } from './'
import { CONSTANTS } from "@/data/CONSTANTS"
import { apiResponseDTO } from "@/types"
import {
    useAppDispatch,
    useTypedSelector,
    // Create channel
    selectCreateErrorType,
    setCreateErrorType,
    // Page: /space/*/channel/*
    /*setTheChannel,
    selectTheChannel,*/
} from '../redux'

export const useChannels = () => {
    // Hooks
    const { httpPostWithData, httpGetRequest } = useAxios()
    const router = useRouter()

    // Internal variables
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const errorCodes: { [key: string]: string } = {
        wrong_credentials: 'Incorrect credentials. Please try again.'
    }

    // Redux
    const dispatch = useAppDispatch()
    const createErrorType = useTypedSelector(selectCreateErrorType)

    /**
     * Misc. Methods
     */
    const afterSuccess = (fromAction: string, theResult: apiResponseDTO, onSuccess?: Function) => {
        const channelName = theResult.data.Channel_Name
        if (onSuccess) onSuccess()
        const redirect = CONSTANTS.SPACE_URL + router.query.spaceName +
            CONSTANTS.CHANNEL_URL + channelName

        /*if (fromAction == "updateChannel") {
            window.location.href = redirect
        } else {
            router.push(redirect)
        }*/
    }

    // Handle error dispatch and set state of them correspondingly
    const onError = (fromAction: string, errorMsgFromAPI?: string) => {
        if (createErrorType) {
            const theErrorMsg = errorMsgFromAPI || createErrorType
            console.log(theErrorMsg)
            setErrorMsg(
                errorCodes[theErrorMsg] || theErrorMsg
            )
        } else if (errorMsgFromAPI) {
            dispatch(setCreateErrorType({
                "data": errorMsgFromAPI
            }))
        } else if (createErrorType === "") {
            setErrorMsg('')
        }
    }

    const processResult = (fromAction: string, theResult: apiResponseDTO, onSuccess?: Function) => {
        setStatus('resolved')
        console.log("channel processResult()", theResult)

        if (theResult.success === true) {
            afterSuccess(fromAction, theResult, onSuccess)
            return true
        }

        onError(fromAction, theResult.message)
        return false
    }

    /**
     * Generic Methods
     */
    const createChannel = async (channelName: string, channelFormat: string, onSuccess: Function): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!channelName || !channelFormat) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            processResult('createChannel', errorData)
            return false
        }

        // Variables to send to backend API
        const createVariables = {
            "Space_Name": router.query.spaceName,
            "Channel_Name": channelName,
            "Channel_Format": channelFormat
        }

        // Send create variables to the API for creation
        try {
            const data = await httpPostWithData("createChannel", createVariables)
            return processResult('createChannel', data, onSuccess)
        } catch (e) {
            console.log("useChannels create error", e)
        }
        return true
    }

    const updateChannel = async (channelName: string, oldChannelName: string, onSuccess: Function): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!channelName) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            processResult('updateChannel', errorData)
            return false
        }

        // Variables to send to backend API
        const editVariables = {
            "Space_Name": router.query.spaceName,
            "Channel_Name": channelName,
            "Old_Channel_Name": oldChannelName
        }

        // Send edit variables to the API for editing
        try {
            const data = await httpPostWithData("updateChannel", editVariables)
            return processResult('updateChannel', data, onSuccess)
        } catch (e) {
            console.log("useChannels edit error", e)
        }
        return true
    }

    const deleteChannel = async (channelName: string, onSuccess: Function): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!channelName) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            processResult('deleteChannel', errorData)
            return false
        }

        // Variables to send to backend API
        const deleteVariables = {
            "Space_Name": router.query.spaceName,
            "Channel_Name": channelName
        }

        // Send create variables to the API for creation
        try {
            const data = await httpPostWithData("deleteChannel", deleteVariables)
            return processResult('deleteChannel', data, onSuccess)
        } catch (e) {
            console.log("useChannels delete error", e)
            return false
        }
    }

    useEffect(() => {
        onError('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createErrorType])

    return {
        createChannel,
        updateChannel,
        deleteChannel,
        status,
        errorMsg,
    }
}