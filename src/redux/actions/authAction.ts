// External
import { Dispatch } from 'redux'

// Internal
import { useAxios } from '@/hooks'

export const useAuthActions = () => {
    const { httpGetRequest, httpPostWithData } = useAxios()
    
    const fetchIsLoggedInStatus = (__reducer: Function) => async (dispatch: Dispatch) => {
        try {
            const data = await httpGetRequest("userLoggedInTest")
            if (data.message === "Is logged in") {
                dispatch(__reducer(data))
            }
        } catch (e) {
            console.log("fetchIsLoggedInStatus", e)
        }
    }

    const adminDoLogin = (loginVariables : Object, __reducer: Function) => async (dispatch: Dispatch) => {
        try {
            const data = await httpPostWithData("adminLogin", loginVariables)
            dispatch(__reducer(data))
        } catch (e) {
            console.log("adminDoLogin", e)
        }
    }

    const adminDoLogout = (__reducer: Function) => async (dispatch: Dispatch) => {
        try {
            const data = await httpGetRequest("adminLogout")
            dispatch(__reducer(data))
        } catch (e) {
            console.log("adminDoLogout", e)
        }
    }

    return {
        fetchIsLoggedInStatus,
        adminDoLogin,
        adminDoLogout
    }
}