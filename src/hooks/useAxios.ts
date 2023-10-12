// External
import axios from 'axios'

// Internal
import { env, paths } from '@/env.local'
import { useAuthContext, useCookie } from './'
import {
    useAppDispatch,
    useTypedSelector,

    useAuthActions,

    setAccessToken,

    selectAccessToken,
    selectRefreshToken,
} from '@/redux'
import { useState } from 'react'

export const useAxios = () => {
    // Redux
    const accessToken = useTypedSelector(selectAccessToken)
    const refreshToken = useTypedSelector(selectRefreshToken)
    
    // Hooks
    const { setTheCookie, getTheCookie } = useCookie()

    // Internal variables
    const tokens: { [key: string]: string } = { "accessToken": accessToken, "refreshToken": refreshToken }

    // Axios stuff
    axios.defaults.withCredentials = true

    const axiosAction = async (actionType: string, apiEndPoint: string, tokenName: string, postContent: any = '') => {
        let axiosUrl = `${env.url.API_URL + paths.API_ROUTE + apiEndPoint}`
        let headers: any = {
            Accept: 'application/json',
            Authorization: (tokens[tokenName] ? "Bearer "+(tokens[tokenName]) : tokenName)
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
            } catch (e: any) {
                console.log("axiosAction GET error", e)
                return e
            }
        } else if (actionType === "post") {
            try {
                const { data: response } = await axios.post(axiosUrl, postContent, config)
                return response
            } catch (e: any) {
                console.log("axiosAction GET error", e)
                return e
            }
        }
    }

    const handleError = async (e: any, actionType: string, apiEndPoint: string, tokenName: string, postContent: any) => {
        // If need for JWT refresh token
        if (e.response && (e.response.data.error === "UserOnly Unauthorized" || e.response.data.message === "Token has expired")) {
            try {
                // Request a new JWT access token
                const getToken = await axiosAction("get", "refreshJWT", "refreshToken")
                const newToken = getToken.authorisation?.newAccessToken
                if (newToken) {
                    // Re-try original axios request with new token
                    try {
                        setTheCookie("accessToken", newToken)
                        const { data: tryAgain } = await axiosAction(actionType, apiEndPoint, newToken, postContent)
                        return tryAgain
                    } catch (e: any) {
                        console.log("tryAgain E", e)
                    }
                }
            } catch (e: any) {
                console.log("getToken E", e)
            }
        }
        
        return e
    }

    const httpPostWithData = async (apiEndPoint: string, postContent: any = '', tokenName: string = 'accessToken') => {
        let send = await axiosAction("post", apiEndPoint, tokenName, postContent)
        console.log("POST SEND", send)

        if (send.response?.data?.error && tokenName === "accessToken") {
            send = await handleError(send, "post", apiEndPoint, tokenName, postContent)
            return false
        }
        return send
    }

    const httpGetRequest = async (apiEndPoint: string, tokenName: string = 'accessToken') => {
        const send = await axiosAction("get", apiEndPoint, tokenName)
        console.log("GET SEND", send)

        /*if (send.response?.data?.error && tokenName === "accessToken") {
            await jwtAxiosError(send)
            return false
        }*/
        return send
    }

    return {
        httpPostWithData,
        httpGetRequest,
    }
}