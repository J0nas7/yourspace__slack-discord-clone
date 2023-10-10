// External
import axios from 'axios'

// Internal
import { env, paths } from '@/env.local'
import { useAuthContext } from './'

export const useAxios = () => {
    const { getAuthContext } = useAuthContext()

    axios.defaults.withCredentials = true

    const postWithData = async (apiEndPoint : string, postContent : any = '') => {
        //await getLaravelSanctumToken()
        return axios
            .post(`${env.url.API_URL+paths.API_ROUTE}/${apiEndPoint}`, 
            {
                postContent: JSON.stringify(postContent),
                /*authID: authID,
                authKey: authKey*/
            },
            {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json'
                },
            })
    }

    const httpPostWithData = async (apiEndPoint : string, postContent : any = '') => {
        try {
            const { data: response } = await axios.post(
                `${env.url.API_URL + paths.API_ROUTE + apiEndPoint}`, 
                {
                    postContent: JSON.stringify(postContent),
                },
                {
                    withCredentials: true,
                    headers: {
                        Accept: 'application/json',
                        Authorization: "Bearer " + getAuthContext('accessToken')
                    },
                }
            )
            return response
        } catch(e:any) {
            if (e.response) console.log("httpPostWithData", e)
            return false
        }
    }

    const httpGetRequest = async (apiEndPoint : string) => {
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
        } catch (e:any) {
            if (e.response && e.response.statusText === "Unauthorized") {
                console.log("httpGetRequest", e)
                //router.push("/logout")
                return e.response.statusText
            }
            return false
        }
    }

    const getRequest = async (apiEndPoint : string) => {
        return axios.get(`${env.url.API_URL+paths.API_ROUTE}/${apiEndPoint}`)
    }

    /*const getLaravelSanctumToken = async () => {
        await axios.post(`${env.url.API_URL+paths.API_ROUTE}/tokens/create`).then(response => {
            console.log(response)
            //axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
        });
    }*/

    const getLaravelSanctumCSRF = async () => {
        await axios.get(`${env.url.API_URL}/sanctum/csrf-cookie`).then(response => {
            console.log(response)
            console.log(response.data.token)
            //axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
        });
    }

    const requestCSRF = async () => {
        return axios.get(`${env.url.API_URL}/sanctum/csrf-cookie`)
    }

    return {
        postWithData,
        getRequest,
        httpPostWithData,
        httpGetRequest,
        requestCSRF,
        getLaravelSanctumCSRF,
        //getLaravelSanctumToken,
    }
}