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

    const afterSuccess = (theResult: any) => {
        const channelName = theResult.data.Channel_Name
        router.push(
            CONSTANTS.SPACE_URL + router.query.spaceName + 
            CONSTANTS.CHANNEL_URL + channelName
        )
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

    const processResult = (fromAction: string, theResult: any) => {
        setStatus('resolved')
        console.log("channel processResult()", theResult)

        if (theResult.success === true) {
            afterSuccess(theResult)
            return true
        }

        onError(fromAction, theResult)
        return false
    }
    
    const handleCreateSubmit = async (channelName: string, channelFormat: string): Promise<boolean> => {
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
            return processResult('create', data)
        } catch (e) {
            console.log("useChannels create error", e)
        }
        return true
    }
    
    return {
        handleCreateSubmit,
        status,
        errorMsg,
    }
}