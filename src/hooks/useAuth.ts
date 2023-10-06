// External
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Internal
import { useAxios, useAuthContext } from './'
import {
    useAppDispatch, 
    useTypedSelector, 
    useAuthActions, 
    setLoggedIn, 
    setLoggedOut, 
    setLoginErrorType, 
    selectLoginErrorType 
} from '../redux'

const errorCodes : any = {
    wrong_credentials: 'Incorrect credentials. Please try again.',
	invalid_username: 'Invalid username or email address. Please check it and try again.',
	invalid_email: 'Invalid email address. Please check it and try again.',
	incorrect_password: 'Incorrect password. Please try again, or reset your password.',
	empty_username: 'Please provide your username.',
	empty_password: 'Please provide your password.',
    "Login Attempt Failed": 'Incorrect credentials. Please try again.',
    "Empty request": 'Name or password not provided.',
}

export const useAuth = () => {
    const router = useRouter()
    const { isLoggedIn, setIsLoggedIn, setAuthContext, removeAuthContext } = useAuthContext()
    const { httpPostWithData, requestCSRF } = useAxios()
    const [errorMsg,setErrorMsg] = useState<any>(null)
    const [status,setStatus] = useState<any>(null)

    const dispatch = useAppDispatch()
    const loginErrorType = useTypedSelector(selectLoginErrorType)
    const { fetchIsLoggedInStatus, adminDoLogout } = useAuthActions()

    const saveLoginSuccess = /*useSafeDispatch( */ (ProfileID : string) => {
        setAuthContext(ProfileID)
        setIsLoggedIn(true)
        goHome()
    }

    const goHome = () => {
        router.push('/')
    }

    const onError = /*useSafeDispatch(*/ (errors? : any) => {
        if (loginErrorType) {
            const theErrorMsg = loginErrorType//errors.message
            setErrorMsg(
                errorCodes[theErrorMsg] || theErrorMsg || loginErrorType
                // `${ stripHtml( decodeEntities( errors.message ) ).result }`
            )
        } else if (errors) {
            dispatch(setLoginErrorType({
                "data": errors.Result
            }))
        } else if (loginErrorType === "") {
            setErrorMsg(null)
        }
	} //);
    useEffect(() => {
        onError()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginErrorType])

    const processLoginResult = (loginResult : any) => {
        console.log("THE LOGIN RESULT", loginResult)
        setStatus('resolved')
        if (loginResult.Result === "Failed") {
            onError(loginResult)
        } else if (loginResult.Result === "Login success") {
            saveLoginSuccess(loginResult.ProfileID)
            return true
        }
        return false
    }

    const isLoggedInTest = () => {
        dispatch(fetchIsLoggedInStatus(setLoggedIn))
        /*getRequest("adminLoggedInTest").then(({ data }) => {
            if (data.success === true && data.data === true) {
                onLoginSuccess(ProfileID)
            }
        })*/
    }

    const login = async (usernameInput : string, passwordInput : string) : Promise<boolean> => {
        setStatus('resolving')
        const loginVariables = {
            "email": usernameInput, 
            "password": passwordInput,
            //"token_name": usernameInput, 
        }
        
        // If name/email or password is empty
        if (!usernameInput || !passwordInput) {
            const data = {
                "success": false,
                "message": "Empty request",
                "data": false,
                "Result": "Failed"
            }
            processLoginResult(data)
            return false
        }
        
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setLoginErrorType({ "data": "" }))
        
        console.log("loginVariables", loginVariables)
        // Request a new server-side Laravel Sanctum CSRF cookie
        //requestCSRF().then(async csrfResp => {
            // Send login variables to the API for authentication
            try {
                const data = await httpPostWithData("?Category=Profiles&Action=Login", loginVariables)
                return processLoginResult(data)
            } catch (e) {
                console.log("useAuth login error", e)
            }
        //})
        return false
	}

    const logout = () => {
        setStatus('resolving')
        dispatch(adminDoLogout(setLoggedOut))
        removeAuthContext()
        setStatus('resolved')
        //navigate("/login")
        return true
	}

    return {
		login,
		logout,
        saveLoginSuccess,
        isLoggedInTest,
		isLoggedIn,
		errorMsg,
		status,
        goHome,
		/*refetchViewer,
		loadingViewer,
		viewer,*/
	}
}