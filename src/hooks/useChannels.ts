// External
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Internal
import { useAxios } from './'
import { CONSTANTS } from "@/data/CONSTANTS"
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

export const useChannels = (tempChannelName: string) => {
    // Internal variables
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const errorCodes: { [key: string]: string } = {
        wrong_credentials: 'Incorrect credentials. Please try again.'
    }

    // Hooks
    const { httpPostWithData, httpGetRequest } = useAxios()
    const router = useRouter()

    // Redux
    const dispatch = useAppDispatch()
    const createErrorType = useTypedSelector(selectCreateErrorType)

    // Methods
    const afterSuccess = (theResult: any, onSuccess?: Function) => {
        const channelName = theResult.data.Channel_Name
        if (onSuccess) onSuccess()
        router.push(CONSTANTS.SPACE_URL + router.query.spaceName +
            CONSTANTS.CHANNEL_URL + channelName)
    }

    // Handle error dispatch and set state of them correspondingly
    const onError = (fromAction: string, errors?: any) => {
        if (createErrorType) {
            const theErrorMsg = errors?.message || createErrorType
            console.log(theErrorMsg)
            setErrorMsg(
                errorCodes[theErrorMsg] || theErrorMsg
            )
        } else if (errors) {
            dispatch(setCreateErrorType({
                "data": errors.message
            }))
        } else if (createErrorType === "") {
            setErrorMsg('')
        }
    } //);
    useEffect(() => {
        onError('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createErrorType])

    const processResult = (fromAction: string, theResult: any, onSuccess?: Function) => {
        setStatus('resolved')
        console.log("channel processResult()", theResult)

        if (theResult.success === true) {
            afterSuccess(theResult, onSuccess)
            return true
        }

        onError(fromAction, theResult)
        return false
    }

    const handleEditSubmit = async (channelName: string, oldChannelName: string, onSuccess: Function): Promise<boolean> => {
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
            processResult('edit', errorData)
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
            const data = await httpPostWithData("editChannel", editVariables)
            return processResult('edit', data, onSuccess)
        } catch (e) {
            console.log("useChannels edit error", e)
        }
        return true
    }

    const handleCreateSubmit = async (channelName: string, channelFormat: string, onSuccess: Function): Promise<boolean> => {
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
            processResult('create', errorData)
            return false
        }

        // Variables to send to backend API
        const createVariables = {
            "Channel_Name": channelName,
            "Channel_Format": channelFormat
        }

        // Send create variables to the API for creation
        try {
            const data = await httpPostWithData("createNewChannel", createVariables)
            return processResult('create', data, onSuccess)
        } catch (e) {
            console.log("useChannels create error", e)
        }
        return true
    }

    return {
        handleEditSubmit,
        handleCreateSubmit,
        status,
        errorMsg,
    }
}