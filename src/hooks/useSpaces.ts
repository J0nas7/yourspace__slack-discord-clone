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
    deleteMemberFromList,
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
    const urlSpaceName: string = router.query.spaceName?.toString()!
    const routerChannelName = router.query.channelName
    const [status, setStatus] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [alreadyMember, setAlreadyMember] = useState<boolean>(true)
    const [spacesList, setSpacesList] = useState<SpaceDTO[]>()
    const channelTypes: string[] = ['text', 'audio', 'video']
    const errorCodes: { [key: string]: string } = {
        wrong_credentials: 'Incorrect credentials. Please try again.'
    }
    const emptyChannels: { [key: string]: [] } = {
        'text': [],
        'audio': [],
        'video': [],
    }

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
    const filterModeratorsAndAbove = (role: string) => {
        if (membersList) return membersList.filter((member: ProfileDTO, i: any) => member.Member_Role == role)
    }

    // Get all spaces that a profile is a member of
    const getMemberOfSpacesList = async (profileID?: number) => {
        // Send request to the API for spaces array
        try {
            const getMemberOfSpacesListVariables = {
                "Profile_ID": profileID
            }
            const data = await httpPostWithData("readMemberOfSpacesList", getMemberOfSpacesListVariables)
            const goToCreateSpace = "/create/space"
            if (!profileID && data.message == "NotMemberOfSpace" && router.asPath !== goToCreateSpace) {
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

    // Get all public spaces to the explore list
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

    /**
     * Create/Update Space handling methods
     */
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
    /**
     * CRUD channels
     */
    const readChannels = () => !channelsList['text'].length ? channelTypes.map(type => readChannelsList(type)) : 0

    const readChannelsAgain = async () => {
        console.log("resetChannels")
        channelTypes.map(type => readChannelsList(type, true))
    }

    const readChannelsList = async (channelFormat: string, forceReset: boolean = false) => {
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
    /**
     * CRUD memberships
     */
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

    // Read all members of a specific space
    const readMembers = async () => {
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
                    console.log("useSpaces readMembers")
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

    // Update a members role
    const updateMemberRole = async (role: string, theProfile: ProfileDTO, spaceName: string) => {
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

    const updateConfirmRole = (role: string, theProfile: ProfileDTO) => {
        if (confirm("Make " + theProfile.Profile_DisplayName + " a/an " + role + "?")) {
            updateMemberRole(role.toLocaleUpperCase(), theProfile, urlSpaceName)
        }
    }

    const deleteThisMember = (theProfile: ProfileDTO) => {
        if (confirm("Are you sure you want to the delete " + theProfile.Profile_DisplayName + "'s membership of this space?")) {
            deleteMember(theProfile, "admin", urlSpaceName)
        }
    }

    // Delete membership from the unique space name
    const deleteMember = async (theProfile: ProfileDTO, from: string, spaceName?: string) => {
        const theProfileID = theProfile.Profile_ID
        if (theProfileID && (spaceName || urlSpaceName)) {
            // Variables to send to backend API
            const removeMembershipVariables = {
                "Space_Name": spaceName || urlSpaceName,
                "Profile_ID": theProfileID
            }

            // Send request to the API for membership
            try {
                const data = await httpPostWithData("deleteMember", removeMembershipVariables)
                // If member deleted itself
                if (data.success && from == "member") {
                    window.location.href = '/space/' + urlSpaceName
                    return
                }

                // If member is deleted by an admin
                if (data.success && from == "admin") {
                    dispatch(deleteMemberFromList({
                        "data": theProfile
                    }))
                    return
                }
            } catch (e) {
                console.log("useSpaces removeMember error", e)
            }
        }
        return
    }

    /**
     * CRUD spaces
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

    const readSpace = async (spaceName?: string) => {
        if (spaceName || urlSpaceName) {
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
        filterModeratorsAndAbove,
        getMemberOfSpacesList,
        getHighlightedSpacesList,

        // Generic methods
        // Channels
        readChannels,
        readChannelsAgain,
        readChannelsList,
        // Members
        createMember,
        readMembers,
        updateConfirmRole,
        deleteThisMember,
        deleteMember,
        // Spaces
        createSpace,
        readSpace,
        updateSpace,
        deleteSpace,
    }
}