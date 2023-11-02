// External
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    selectChannelsList,
    setMembersList,
    selectMembersList,
} from '@/redux'
import { CONSTANTS } from "@/data/CONSTANTS"
import { ProfileDTO } from "@/types";

export const useSpaces = () => {
    // Hooks
    const { httpPostWithData, httpGetRequest } = useAxios()
    const router = useRouter()

    // Internal variables
    let spaceContentLoading: boolean = false
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [spacesList, setSpacesList] = useState<Array<Object>>()
    const urlSpaceName: string = router.query.spaceName?.toString()!
    const routerChannelName = router.query.channelName
    const errorCodes: { [key: string]: string } = {
        wrong_credentials: 'Incorrect credentials. Please try again.'
    }
    const emptyChannels: {[key: string]: []} = {
            'text': [],
            'audio': [],
            'video': [],
        }

    // Redux
    const dispatch = useAppDispatch()
    const createErrorType = useTypedSelector(selectCreateErrorType)
    const theSpace = useTypedSelector(selectTheSpace)
    const channelsList = useTypedSelector(selectChannelsList)
    const membersList = useTypedSelector(selectMembersList)

    // Methods
    const resetChannelsListToRender = async () => {
        dispatch(setChannelsList({ "data": emptyChannels }))
        return
    }

    const getAllChannels = async () => {
        await getChannelsList("text")
        await getChannelsList("audio")
        await getChannelsList("video")
    }

    const resetChannels = () => {
        //console.log("reset")
        resetChannelsListToRender()
        getAllChannels()
    }

    const initChannels = () => {
        if (!channelsList['text'].length) getAllChannels()
        return
    }

    const getSpacesList = async () => {
        // Send request to the API for spaces array
        try {
            const data = await httpGetRequest("getSpacesList")
            const goToCreateSpace = "/create/space"
            if (data.message == "NotAnyMember" && router.asPath !== goToCreateSpace) {
                if (confirm("You are not a member of any spaces. Click OK to create your own. Or cancel to continue exploring others.")) {
                    window.location.href = goToCreateSpace
                }
                return
            }

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
        // Request space from the unique space name
        if (urlSpaceName) {
            // Variables to send to backend API
            const getSpaceVariables = {
                "Space_Name": urlSpaceName
            }

            // Send request to the API for space
            try {
                const data = await httpPostWithData("getTheSpace", getSpaceVariables)
                if (data.data) {
                    dispatch(setTheSpace({
                        "data": data.data
                    }))
                }
            } catch (e) {
                console.log("useSpaces getSpace error", e)
            }
        }
        return
    }

    const getMembersOfTheSpace = async () => {
        // Request members list of space from the unique space name
        if (urlSpaceName) {
            // Variables to send to backend API
            const getMembersOfSpaceVariables = {
                "Space_Name": urlSpaceName
            }

            // Send request to the API for space
            try {
                const data = await httpPostWithData("getMembersOfSpaceList", getMembersOfSpaceVariables)
                if (data.data) {
                    dispatch(setMembersList({
                        "data": data.data
                    }))
                }
            } catch (e) {
                console.log("useSpaces getMembersOfSpace error", e)
            }
        }
        return
    }

    const getChannelsList = async (channelFormat: string) => {
        // Request channel lists from the unique space name
        if (channelFormat && theSpace?.Space_Name && !channelsList[channelFormat].length) {
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
        return
    }

    const afterSuccess = (theResult: any) => {
        const spaceName = theResult.data.Space_Name
        const redirectTo = CONSTANTS.SPACE_URL + spaceName
        
        if (urlSpaceName && urlSpaceName !== spaceName) { // Hard refresh needed
            window.location.href = redirectTo
        } else { // Router push is enough
            router.push(redirectTo)
        }
    }

    // Handle error dispatch and set state of them correspondingly
    const onError = (fromAction: string, errors?: any) => {
        if (createErrorType) {
            const theErrorMsg = errors?.message || createErrorType
            //console.log(theErrorMsg)
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
        //console.log("space processResult()", theResult)

        if (theResult.success === true) {
            if (theResult.message == "The space was deleted") {
                alert("The space was deleted")
                window.location.href = "/"
            }

            afterSuccess(theResult)
            return true
        }

        onError(fromAction, theResult)
        return false
    }

    const handleDeleteSubmit = async (deleteSpaceName: string): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!deleteSpaceName) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            processResult("delete", errorData)
            return false
        }

        // Variables to send to backend API
        const deleteVariables = {
            "Space_Name": deleteSpaceName
        }

        // Send delete variables to the API the deleting
        try {
            const data = await httpPostWithData("deleteSpace", deleteVariables)
            return processResult("delete", data)
        } catch (e) {
            console.log("useSpaces deleteSpace error", e)
            return false
        }
    }

    const handleEditNameSubmit = async (newSpaceName: string,  oldSpaceName: string): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!newSpaceName || !oldSpaceName) {
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
            "Space_Name_old": oldSpaceName,
            "Space_Name_new": newSpaceName,
        }

        // Send edit variables to the API for saving
        try {
            const data = await httpPostWithData("editSpace", createVariables)
            return processResult('edit', data)
        } catch (e) {
            console.log("useSpaces editName error", e)
            return false
        }
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

    useEffect(() => {
        if (theSpace?.Space_ID) {
            const init = () => {
                if (!spaceContentLoading) {
                    spaceContentLoading = true
                    initChannels()
                    getMembersOfTheSpace()
                }
            }
            init()
        }
    }, [theSpace])

    useEffect(() => {
        if (urlSpaceName) getTheSpace()
    }, [])

    return {
        theSpace,
        getTheSpace,
        spacesList,
        getSpacesList,
        membersList,
        getMembersOfTheSpace,
        channelsList,
        getChannelsList,
        resetChannelsListToRender,
        resetChannels,
        handleDeleteSubmit,
        handleEditNameSubmit,
        handleCreateSubmit,
        errorMsg,
        status
    }
}