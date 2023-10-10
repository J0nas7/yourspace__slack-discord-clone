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
    setCreateErrorType,
    selectLoginErrorType,
    selectCreateErrorType
} from '../redux'

const errorCodes: any = {
    wrong_credentials: 'Incorrect credentials. Please try again.',
    invalid_username: 'Invalid username or email address. Please check it and try again.',
    invalid_email: 'Invalid email address. Please check it and try again.',
    incorrect_password: 'Incorrect password. Please try again, or reset your password.',
    empty_username: 'Please provide your username.',
    empty_password: 'Please provide your password.',
    "Login Attempt Failed": 'Incorrect credentials. Please try again.',
    //"Empty request": 'Name or password not provided.',
}

export const useAuth = () => {
    const router = useRouter()
    const { isLoggedIn, setIsLoggedIn, saveTokens, removeAuthContext } = useAuthContext()
    const { httpPostWithData, requestCSRF } = useAxios()
    const [errorMsg, setErrorMsg] = useState<any>(null)
    const [status, setStatus] = useState<any>(null)

    const dispatch = useAppDispatch()
    const loginErrorType = useTypedSelector(selectLoginErrorType)
    const createErrorType = useTypedSelector(selectCreateErrorType)
    const { fetchIsLoggedInStatus, adminDoLogout } = useAuthActions()

    const saveLoginSuccess = /*useSafeDispatch( */ (jwtData: any) => {
        saveTokens(jwtData.authorisation)
        setIsLoggedIn(true)
        goHome()
    }

    const goHome = () => {
        //router.push('/') !!! not hard refreshing
        window.location.href = "/"
    }

    const onError = /*useSafeDispatch(*/ (errors?: any) => {
        if (loginErrorType) {
            const theErrorMsg = errors?.message || loginErrorType
            setErrorMsg(
                errorCodes[theErrorMsg] || theErrorMsg
            )
        } else if (errors) {
            dispatch(setLoginErrorType({
                "data": errors.message
            }))
        } else if (loginErrorType === "") {
            setErrorMsg(null)
        }
    } //);
    useEffect(() => {
        onError()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginErrorType])

    const processCreateResult = (createResult: any) => {
        setStatus('resolved')
        console.log("processCreateResult()", createResult)
        
        if (createResult.success === false) {
            onError(createResult)
        } else if (createResult.success === true) {
            saveLoginSuccess(createResult)
            return true
        }
        return false
    }

    const processLoginResult = (loginResult: any) => {
        setStatus('resolved')
        if (loginResult.success === false) {
            onError(loginResult)
        } else if (loginResult.success === true) {
            saveLoginSuccess(loginResult)
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

    const handleCreateSubmit = async (  realNameInput: string, displayNameInput: string, emailInput: string, 
                                        passwordInput: string, password2Input: string, 
                                        inputDD: string, inputMM: string, inputYYYY: string): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!realNameInput || !displayNameInput || !emailInput || !passwordInput || !password2Input || !inputDD || !inputMM || !inputYYYY) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            processCreateResult(errorData)
            return false
        }

        // If birthday credentials has wrong length
        if (inputDD.length !== 2 || inputMM.length !== 2 || inputYYYY.length !== 4) {
            errorData = {
                "success": false,
                "message": "Wrong length in birthday.",
                "data": false
            }
            processCreateResult(errorData)
            return false
        }
        
        // Convert birthday strings to numbers
        const inputDDint = parseInt(inputDD)
        const inputMMint = parseInt(inputMM)
        const inputYYYYint = parseInt(inputYYYY)

        // If birthday formats was not numbers
        if (!inputDDint || !inputMMint || !inputYYYYint) {
            errorData = {
                "success": false,
                "message": "Wrong format in birthday.",
                "data": false
            }
            processCreateResult(errorData)
            return false
        }
        
        // If passwords does not match
        if (passwordInput !== password2Input) {
            errorData = {
                "success": false,
                "message": "Passwords does not match.",
                "data": false
            }
            processCreateResult(errorData)
            return false
        }
        
        // If email is not valid format
        if (!emailInput.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errorData = {
                "success": false,
                "message": "E-mail is not valid.",
                "data": false
            }
            processCreateResult(errorData)
            return false
        }

        // Variables to send to backend API
        const createVariables = {
            "Profile_RealName": realNameInput,
            "Profile_DisplayName": displayNameInput,
            "Profile_Email": emailInput,
            "Profile_Password": passwordInput,
            "Profile_Password2": password2Input,
            "Profile_BirthdayDD": inputDDint,
            "Profile_BirthdayMM": inputMMint,
            "Profile_BirthdayYYYY": inputYYYYint
        }
        
        // Send create variables to the API for creation
        try {
            const data = await httpPostWithData("userCreate", createVariables)
            return processCreateResult(data)
        } catch (e) {
            console.log("useAuth create error", e)
        }
        
        return false
    }

    const handleLoginSubmit = async (emailInput: string, passwordInput: string): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setLoginErrorType({ "data": "" }))

        // If name/email or password is empty
        if (!emailInput || !passwordInput) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            processLoginResult(errorData)
            return false
        }
        
        const loginVariables = {
            "Profile_Email": emailInput,
            "Profile_Password": passwordInput
        }
        // Send login variables to the API for authentication
        try {
            const data = await httpPostWithData("userLogin", loginVariables)
            return processLoginResult(data)
        } catch (e) {
            console.log("useAuth login error", e)
        }
        
        return false
    }

    const logout = () => {
        setStatus('resolving')
        dispatch(adminDoLogout(setLoggedOut))
        removeAuthContext("accessToken")
        removeAuthContext("refreshToken")
        setStatus('resolved')
        //navigate("/login")
        return true
    }

    return {
        handleLoginSubmit,
        handleCreateSubmit,
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