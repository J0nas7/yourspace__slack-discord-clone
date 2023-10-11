// External
import axios from 'axios'

// Internal
import { env, paths } from '@/env.local'
import { useAuthContext } from './'

export const useAxios = () => {
    const { getAuthContext, removeTokens } = useAuthContext()

    axios.defaults.withCredentials = true

    const httpPostWithData = async (apiEndPoint: string, postContent: any = '') => {
        try {
            let postHeaders
            if (getAuthContext('accessToken')) {
                postHeaders = {
                    Accept: 'application/json',
                    Authorization: "Bearer " + getAuthContext('accessToken')
                }
            } else {
                postHeaders = {
                    Accept: 'application/json'
                }
            }
            const { data: response } = await axios.post(
                `${env.url.API_URL + paths.API_ROUTE + apiEndPoint}`,
                {
                    postContent: JSON.stringify(postContent),
                },
                {
                    withCredentials: true,
                    headers: postHeaders,
                }
            )
            return response
        } catch (e: any) {
            if (e.response && (e.response.statusText === "UserOnly Unauthorized" || e.response.data.message === "Token has expired")) {
                /*removeTokens()
                window.location.href = '/'*/
            }
            console.log("httpPostWithData", e)
            return false
        }
    }

    const httpGetRequest = async (apiEndPoint: string) => {
        try {
            const { data: response } = await axios.get(
                `${env.url.API_URL + paths.API_ROUTE + apiEndPoint}`,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: "Bearer " + getAuthContext('accessToken')
                    }
                }
            )
            return response
        } catch (e: any) {
            if (e.response && (e.response.statusText === "UserOnly Unauthorized" || e.response.data.message === "Token has expired")) {
                removeTokens()
                window.location.href = '/'
            }
            console.log("httpGetRequest", e)
            return false
        }
    }

    return {
        httpPostWithData,
        httpGetRequest,
    }
}