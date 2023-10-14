// External
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Internal
import { useAxios } from './'
import {
    useAppDispatch,
    useTypedSelector,
    // Create space
    selectCreateErrorType,
    setCreateErrorType,
    // Page: /space/
    setTheSpace,
    selectTheSpace,
    setChannelsList,
    selectChannelsList
} from '../redux'
import { CONSTANTS } from "@/data/CONSTANTS"

export const useSpaces = (tempSpaceName: string) => {
    // Internal variables
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [spacesList, setSpacesList] = useState<Array<Object>>()
    const errorCodes: { [key: string]: string } = {
        wrong_credentials: 'Incorrect credentials. Please try again.'
    }

    // Hooks
    const { httpPostWithData, httpGetRequest } = useAxios()
    const router = useRouter()

    // Redux
    const dispatch = useAppDispatch()
    const createErrorType = useTypedSelector(selectCreateErrorType)
    const theSpace = useTypedSelector(selectTheSpace)
    const channelsList = useTypedSelector(selectChannelsList)

    // Methods
    const getSpacesList = async () => {
        // Send request to the API for spaces array
        try {
            const data = await httpGetRequest("getSpacesList")
            if (data.data && data.data.length) {
                setSpacesList(data.data)
                /*dispatch(setSpacesList({
                    "data": data.data
                }))*/
            }
        } catch (e) {
            console.log("useAuth create error", e)
        }
    }

    const getTheSpace = async () => {
        // Request the space from the unique space name
        // Variables to send to backend API
        const getSpaceVariables = {
            "Space_Name": tempSpaceName
        }

        // Request space from the unique space name
        try {
            const data = await httpPostWithData("getTheSpace", getSpaceVariables)
            if (data.data) {
                dispatch(setTheSpace({
                    "data": data.data
                }))
                return data.data.Space_Name
            }
        } catch (e) {
            console.log("useSpaces getTheSpace error", e)
        }
        return
    }

    const getChannelsList = async (channelFormat: string) => {
        if (channelFormat) {
            // Request channel lists from the unique space name
            // Variables to send to backend API
            const getChannelsVariables = {
                "Space_Name": theSpace.Space_Name,
                "Channel_Format": channelFormat
            }

            // Send request to the API for channel list
            try {
                const data = await httpPostWithData("getChannelsList", getChannelsVariables)
                if (data.data && data.data.length) {
                    dispatch(setChannelsList({
                        "format": channelFormat,
                        "data": data.data
                    }))
                }
            } catch (e) {
                console.log("useSpaces getChannelsList error", e)
            }
        }
    }

    const afterSuccess = (theResult: any) => {
        const spaceName = theResult.data.Space_Name
        const spaceID = theResult.data.Space_ID
        router.push(CONSTANTS.SPACE_URL + spaceName)
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
        console.log("space processResult()", theResult)

        if (theResult.success === true) {
            afterSuccess(theResult)
            return true
        }

        onError(fromAction, theResult)
        return false
    }

    const handleCreateSubmit = async (spaceName: string, spaceImage: string): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!spaceName) {
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
            "Space_Name": spaceName,
            "Space_ImageUrl": spaceImage
        }

        // Send create variables to the API for creation
        try {
            const data = await httpPostWithData("createNewSpace", createVariables)
            return processResult('create', data)
        } catch (e) {
            console.log("useSpaces create error", e)
        }
        return true
    }

    return {
        theSpace,
        getTheSpace,
        spacesList,
        getSpacesList,
        channelsList,
        getChannelsList,
        handleCreateSubmit,
        errorMsg,
        status
    }
}