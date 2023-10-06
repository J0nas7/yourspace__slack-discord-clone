// External
import { Dispatch } from 'redux'

// Internal
import { useAuthContext, useAxios } from '@/hooks'

export const useAuthActions = () => {
    const { httpGetRequest, httpPostWithData } = useAxios()
    const { setAuthContext } = useAuthContext()
    
    const fetchIsLoggedInStatus = (__reducer: Function) => async (dispatch: Dispatch) => {
        try {
            const data = await httpGetRequest("?Category=Profiles&Action=CheckLoggedIn")
            if (data.Result === "IS logged in") {
                setAuthContext(data.ProfileID)
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