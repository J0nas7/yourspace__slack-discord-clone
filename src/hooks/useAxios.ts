// External
import axios from 'axios'

// Internal
import { env, paths } from '@/env.local'
import { useAuthContext, useCookie } from './'
import {
    useTypedSelector,
    selectTheSpace,
} from '@/redux'
import { useSocket } from '@/components/providers/socket-provider'
import { axiosHeaders, postContent } from '@/types'

export const useAxios = () => {
    // Redux
    //const theSpace = useTypedSelector(selectTheSpace)
    
    // Hooks
    const { setTheCookie } = useCookie()
    const { getCurrentToken, getAuthContext, doLogout } = useAuthContext()
    const { socket } = useSocket()

    // Socket.io stuff
    const socketEmit = async (apiEndPoint: string, postContent?: postContent) => {
        if (!socket) return
        let headers: axiosHeaders = {
            Accept: 'application/json',
            Authorization: "Bearer "+getCurrentToken("accessToken")
        }
        let config = {
            withCredentials: true,
            headers: headers,
        }
        const postAndConfig = {
            post: {
                postContent: JSON.stringify(postContent)
            },
            config: config
        }
        socket.emit(apiEndPoint, postAndConfig)
    }

    // Axios stuff
    axios.defaults.withCredentials = true

    const axiosAction = async (actionType: string, apiEndPoint: string, tokenName: string, postContent?: postContent) => {
        //console.log("API: "+apiEndPoint, postContent)
        //console.log("axios", theSpace, getCurrentToken("accessToken")!.slice(0, 5))
        let axiosUrl = `${env.url.API_URL + paths.API_ROUTE + apiEndPoint}`
        let headers: axiosHeaders = {
            Accept: 'application/json',
            Authorization: "Bearer "+getCurrentToken(tokenName)
        }
        let config = {
            withCredentials: true,
            headers: headers,
        }
        postContent = { postContent: JSON.stringify(postContent) }

        if (actionType === "get") {
            try {
                const { data: response } = await axios.get(axiosUrl, config)
                return response
            } catch (e: unknown) {
                console.log("axiosAction GET error", e)
                return e
            }
        } else if (actionType === "post") {
            try {
                const { data: response } = await axios.post(axiosUrl, postContent, config)
                return response
            } catch (e: unknown) {
                console.log("axiosAction GET error", e)
                return e
            }
        }
    }

    type ErrorProps = {
        errorContext: any
        actionType: string
        apiEndPoint: string
        tokenName: string
        postContent?: postContent
    }

    const refreshJWTAndTryAgain = async ({ errorContext, actionType, apiEndPoint, tokenName, postContent } : ErrorProps) => {
        // If need for JWT refresh token
        let newE
        if (errorContext.response && 
            (errorContext.response.data.error === "UserOnly Unauthorized" || 
            errorContext.response.data.message === "Token has expired")
        ) {
            try {
                // Request a new JWT access token
                const getToken = await axiosAction("get", "refreshJWT", "refreshToken")
                const newToken = getToken.authorisation?.newAccessToken
                if (newToken) {
                    // Re-try original axios request with new token
                    try {
                        setTheCookie("accessToken", newToken)
                        const { data: tryAgain } = await axiosAction(actionType, apiEndPoint, newToken, postContent)
                        console.log("useAxios refreshJWTAndTryAgain() success", tryAgain)
                        return tryAgain
                    } catch (e: unknown) {
                        newE = e
                        console.log("tryAgain E", e)
                    }
                } else {
                    return false
                }
            } catch (e: unknown) {
                newE = e
                console.log("getToken E", e)
            }
        }
        
        return newE
    }

    const handleError = async ({ errorContext, actionType, apiEndPoint, tokenName, postContent } : ErrorProps) => {
        if (errorContext.response) console.log(actionType+" send", errorContext)

        if (errorContext.response?.data?.error && tokenName === "accessToken") {
            const refreshProps = { errorContext, actionType, apiEndPoint, tokenName, postContent }
            const send = await refreshJWTAndTryAgain(refreshProps)
            
            console.log("handleError send", send)
            if (send.response?.data || !send) {
                if (getAuthContext("accessToken")) {
                    alert("Your login session has expired. You will be logged out.")
                }
                doLogout()
                return false
            }
            return send
        }
    }

    const httpPostWithData = async (apiEndPoint: string, postContent?: postContent, tokenName: string = 'accessToken') => {
        const actionType = "post"
        let send = await axiosAction(actionType, apiEndPoint, tokenName, postContent)
        
        if (send.response?.data?.error && tokenName === "accessToken") {
            const errorContext = send
            const errorProps = { errorContext, actionType, apiEndPoint, tokenName, postContent }
            send = await handleError(errorProps)
            
            if (send.response?.data || !send) return false
        }
        return send
    }

    const httpGetRequest = async (apiEndPoint: string, tokenName: string = 'accessToken') => {
        const actionType = "get"
        let send = await axiosAction(actionType, apiEndPoint, tokenName)
        
        if (send.response?.data?.error && tokenName === "accessToken") {
            const errorContext = send
            const errorProps = { errorContext, actionType, apiEndPoint, tokenName }
            send = await handleError(errorProps)

            if (send.response?.data || !send) return false
        }
        return send
    }

    return {
        httpPostWithData,
        httpGetRequest,
        socketEmit,
    }
}