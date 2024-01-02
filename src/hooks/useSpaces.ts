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
    updateMembersListPosition,
    selectMembersList,
    setHighlightedSpaces,
    selectHighlightedSpaces
} from '@/redux'
import { CONSTANTS } from "@/data/CONSTANTS"
import { ProfileDTO, SpaceDTO, apiResponseDTO } from "@/types";

export const useSpaces = () => {
    // Hooks
    const { httpPostWithData, httpGetRequest } = useAxios()
    const router = useRouter()

    // Internal variables
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [alreadyMember, setAlreadyMember] = useState<boolean>(true)
    const [spacesList, setSpacesList] = useState<SpaceDTO[]>()
    const urlSpaceName: string = router.query.spaceName?.toString()!
    const routerChannelName = router.query.channelName
    const errorCodes: { [key: string]: string } = {
        wrong_credentials: 'Incorrect credentials. Please try again.'
    }
    const emptyChannels: { [key: string]: [] } = {
        'text': [],
        'audio': [],
        'video': [],
    }
    const channelTypes: string[] = ['text', 'audio', 'video']

    // Redux
    const dispatch = useAppDispatch()
    const createErrorType = useTypedSelector(selectCreateErrorType)
    const theSpace = useTypedSelector(selectTheSpace)
    const highlightedSpacesList = useTypedSelector(selectHighlightedSpaces)
    const channelsList = useTypedSelector(selectChannelsList)
    const membersList = useTypedSelector(selectMembersList)

    /**
     * Misc. Methods
     */
    const getAllChannels = () => channelTypes.map(type => getChannelsList(type))

    const resetChannels = async () => {
        console.log("reset")
        channelTypes.map(type => getChannelsList(type, true))
    }

    const initChannels = () => !channelsList['text'].length ? getAllChannels() : 0

    const getMemberOfSpacesList = async () => {
        // Send request to the API for spaces array
        try {
            const data = await httpGetRequest("readMemberOfSpacesList")
            const goToCreateSpace = "/create/space"
            if (data.message == "NotMemberOfSpace" && router.asPath !== goToCreateSpace) {
                if (confirm("You are not a member of a space. Click OK to create your own. Or cancel to continue exploring others.")) {
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

    const getHighlightedSpacesList = async () => {
        // Send get request to API
        try {
            const data = await httpGetRequest("readHighlightedSpacesList")
            dispatch(setHighlightedSpaces({
                "data": data.data
            }))
        } catch (e) {
            console.log("useSpaces getHighlightedSpaces error", e)
        }
        return true
    }

    // Remove membership from the unique space name
    const removeMember = async (Profile_ID: number = 0) => {
        if (urlSpaceName) {
            // Variables to send to backend API
            const removeMembershipVariables = {
                "Space_Name": urlSpaceName,
                "Profile_ID": Profile_ID
            }

            // Send request to the API for membership
            try {
                const data = await httpPostWithData("removeMember", removeMembershipVariables)
                if (data.success) {
                    window.location.href = '/space/' + urlSpaceName
                }
            } catch (e) {
                console.log("useSpaces removeMember error", e)
            }
        }
        return
    }

    // Create membership from the unique space name
    const createMember = async () => {
        if (urlSpaceName) {
            // Variables to send to backend API
            const createMembershipVariables = {
                "Space_Name": urlSpaceName
            }

            // Send request to the API for membership
            try {
                const data = await httpPostWithData("createMember", createMembershipVariables)
                if (data.success) {
                    window.location.href = '/space/' + urlSpaceName
                }
            } catch (e) {
                console.log("useSpaces createMember error", e)
            }
        }
        return
    }

    // Change membership role
    const changeMembershipRole = async (role: string, theProfile: ProfileDTO, spaceName: string) => {
        const theProfileID = theProfile.Profile_ID

        if (role && theProfileID && spaceName) {
            // Variables to send to backend API
            const changeMembershipRoleVariables = {
                "Space_Name": spaceName,
                "Profile_ID": theProfileID,
                "New_Role": role
            }

            // Send request to the API for membership
            try {
                const data = await httpPostWithData("updateMembershipRole", changeMembershipRoleVariables)
                if (data.success) {
                    theProfile = {
                        ...theProfile,
                        Member_Role: role
                    }
                    dispatch(updateMembersListPosition({
                        "data": theProfile
                    }))
                }
            } catch (e) {
                console.log("useSpaces changeMembershipRole error", e)
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
                const data = await httpPostWithData("readMembersOfSpaceList", getMembersOfSpaceVariables)
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

    const getChannelsList = async (channelFormat: string, forceReset: boolean = false) => {
        // Request channel lists from the unique space name
        const spaceName = theSpace?.Space_Name || urlSpaceName
        if (channelFormat && spaceName && (!channelsList[channelFormat].length || forceReset)) {
            //console.log(channelFormat, spaceName, channelsList)
            // Variables to send to backend API
            const getChannelsVariables = {
                "Space_Name": spaceName,
                "Channel_Format": channelFormat
            }

            // Send request to the API for channel list
            try {
                const data = await httpPostWithData("readChannelsList", getChannelsVariables)
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

    const afterSuccess = (theResult: apiResponseDTO) => {
        const spaceName = theResult.data.Space_Name
        const redirectTo = CONSTANTS.SPACE_URL + spaceName

        if (urlSpaceName && urlSpaceName !== spaceName) { // Hard refresh needed
            window.location.href = redirectTo
        } else { // Router push is enough
            router.push(redirectTo)
        }
    }

    // Handle error dispatch and set state of them correspondingly
    const onError = (fromAction: string, errorMsgFromAPI?: string) => {
        if (createErrorType) {
            const theErrorMsg = errorMsgFromAPI || createErrorType
            //console.log(theErrorMsg)
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

    useEffect(() => {
        onError('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createErrorType])

    const processResult = (fromAction: string, theResult: apiResponseDTO) => {
        setStatus('resolved')
        //console.log("space processResult()", theResult)

        if (theResult.success === true) {
            if (theResult.message == "The space was deleted") {
                alert("The space was deleted")
                window.location.href = "/explore/all"
            }

            afterSuccess(theResult)
            return true
        }

        onError(fromAction, theResult.message)
        return false
    }

    /**
     * Generic Methods
     */
    const createSpace = async (spaceName: string, spaceImage: string): Promise<boolean> => {
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
            processResult('createSpace', errorData)
            return false
        }

        // Variables to send to backend API
        const createVariables = {
            "Space_Name": spaceName,
            "Space_ImageUrl": spaceImage
        }

        // Send create variables to the API for creation
        try {
            const data = await httpPostWithData("createSpace", createVariables)
            return processResult('createSpace', data)
        } catch (e) {
            console.log("useSpaces create error", e)
        }
        return true
    }

    // Request space from the unique space name
    const readSpace = async (spaceName?: string) => {
        if (urlSpaceName || spaceName) {
            // Variables to send to backend API
            const getSpaceVariables = {
                "Space_Name": spaceName ? spaceName : urlSpaceName
            }

            // Send request to the API for space
            try {
                const data = await httpPostWithData("readSpace", getSpaceVariables)
                if (data.data) {
                    dispatch(setTheSpace({
                        "data": data.data
                    }))
                } else {
                    alert("The space was not found.")
                    router.push("/explore/all")
                    return
                }
                setAlreadyMember(data.alreadyMember)
            } catch (e) {
                console.log("useSpaces getSpace error", e)
            }
        }
        return
    }

    const updateSpace = async (newSpaceName: string, oldSpaceName: string): Promise<boolean> => {
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
            processResult('updateSpace', errorData)
            return false
        }

        // Variables to send to backend API
        const createVariables = {
            "Space_Name_old": oldSpaceName,
            "Space_Name_new": newSpaceName,
        }

        // Send edit variables to the API for saving
        try {
            const data = await httpPostWithData("updateSpace", createVariables)
            return processResult('updateSpace', data)
        } catch (e) {
            console.log("useSpaces editName error", e)
        }
        return false
    }

    const deleteSpace = async (deleteSpaceName: string): Promise<boolean> => {
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
            processResult("deleteSpace", errorData)
            return false
        }

        // Variables to send to backend API
        const deleteVariables = {
            "Space_Name": deleteSpaceName
        }

        // Send delete variables to the API the deleting
        try {
            const data = await httpPostWithData("deleteSpace", deleteVariables)
            return processResult("deleteSpace", data)
        } catch (e) {
            console.log("useSpaces deleteSpace error", e)
            return false
        }
    }

    return {
        // Variables
        urlSpaceName,
        theSpace,
        spacesList,
        membersList,
        channelsList,
        errorMsg,
        status,
        alreadyMember,
        highlightedSpacesList,

        // Misc. methods
        getMemberOfSpacesList,
        getMembersOfTheSpace,
        initChannels,
        getChannelsList,
        resetChannels,
        getHighlightedSpacesList,
        removeMember,
        createMember,
        changeMembershipRole,

        // Generic methods
        readSpace,
        createSpace,
        updateSpace,
        deleteSpace,
    }
}