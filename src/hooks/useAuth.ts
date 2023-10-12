// External
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Internal
import { useAxios, useAuthContext } from './'
import { CONSTANTS } from "@/data/CONSTANTS"
import { jwtTokensDTO } from '@/types/AuthDTO'
import {
    useAppDispatch,
    useTypedSelector,

    useAuthActions,

    setLoggedIn,
    setLoggedOut,
    setAccessToken,
    setRefreshToken,
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
    // Instant variables
    const [errorMsg, setErrorMsg] = useState<any>(null)
    const [status, setStatus] = useState<any>(null)

    // Hooks and Redux
    const dispatch = useAppDispatch()
    const loginErrorType = useTypedSelector(selectLoginErrorType)
    const createErrorType = useTypedSelector(selectCreateErrorType)
    const { fetchIsLoggedInStatus, adminDoLogout } = useAuthActions()
    const { isLoggedIn, setIsLoggedIn, removeTokens } = useAuthContext()
    const { httpPostWithData, httpGetRequest } = useAxios()

    // Methods
    const saveLoginSuccess = (jwtData: jwtTokensDTO, memberOfSpaces: any) => {
        dispatch(setAccessToken({ "data": jwtData.accessToken }))
        dispatch(setRefreshToken({ "data": jwtData.refreshToken }))
        setIsLoggedIn(true)
        goHome(memberOfSpaces)
    }

    const goHome = (anyMember?: any) => {
        //router.push('/') !!! not hard refreshing
        if (anyMember === 0) { // Not a member of any spaces, redirect to create space
            window.location.href = "/create/space"
        } else { // Member of a space, redirect to frontpage of app
            window.location.href = "/"
        }
    }

    const onError = (fromAction: string, errors?: any) => {
        if (loginErrorType || createErrorType) {
            const theErrorMsg = errors?.message || loginErrorType || createErrorType
            setErrorMsg(
                errorCodes[theErrorMsg] || theErrorMsg
            )
        } else if (errors) {
            if (fromAction === "login") {
                dispatch(setLoginErrorType({
                    "data": errors.message
                }))
            } else if (fromAction === "create") {
                dispatch(setCreateErrorType({
                    "data": errors.message
                }))
            }
        } else if (loginErrorType === "" && createErrorType === "") {
            setErrorMsg(null)
        }
    }
    useEffect(() => {
        onError("")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginErrorType, createErrorType])

    const processResult = (fromAction: string, theResult: any) => {
        setStatus('resolved')

        if (theResult.success === true) {
            saveLoginSuccess(theResult.authorisation, theResult.memberOfSpaces)
            return true
        }

        onError(fromAction, theResult)
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

    const logout = async () => {
        setStatus('resolving')
        // Send login variables to the API for authentication
        try {
            const data = await httpGetRequest("userLogout")
            dispatch(adminDoLogout(setLoggedOut))
            removeTokens()
            window.location.href = CONSTANTS.LOGIN_URL
        } catch (e) {
            console.log("useAuth logout error", e)
        }
        setStatus('resolved')
        return
    }

    const handleCreateSubmit = async (realNameInput: string, displayNameInput: string, emailInput: string,
        passwordInput: string, password2Input: string,
        inputDD: string, inputMM: string, inputYYYY: string): Promise<boolean> => {

        setStatus('resolving')
        let errorData
        let error = false
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!error && (!realNameInput || !displayNameInput || !emailInput || !passwordInput || !password2Input || !inputDD || !inputMM || !inputYYYY)) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            error = true
        }

        // If birthday credentials has wrong length
        if (inputDD.length !== 2 || inputMM.length !== 2 || inputYYYY.length !== 4) {
            errorData = {
                "success": false,
                "message": "Wrong length in birthday.",
                "data": false
            }
            error = true
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
            error = true
        }

        // If passwords does not match
        if (passwordInput !== password2Input) {
            errorData = {
                "success": false,
                "message": "Passwords does not match.",
                "data": false
            }
        }

        // If email is not valid format
        if (!emailInput.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errorData = {
                "success": false,
                "message": "E-mail is not valid.",
                "data": false
            }
            error = true
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
            if (!error) {
                const data = await httpPostWithData("userCreate", createVariables)
                return processResult("create", data)
            }
        } catch (e) {
            console.log("useAuth create user error", e)
            errorData = {
                "success": false,
                "message": "A server error occured. Try again.",
                "data": false
            }
            error = true
        }

        processResult("create", errorData)
        return false
    }

    const handleLoginSubmit = async (emailInput: string, passwordInput: string): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        let error = false
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setLoginErrorType({ "data": "" }))

        // If name/email or password is empty
        if (!emailInput || !passwordInput) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            error = true
        }

        const loginVariables = {
            "Profile_Email": emailInput,
            "Profile_Password": passwordInput
        }
        // Send login variables to the API for authentication
        try {
            if (!error) {
                const data = await httpPostWithData("userLogin", loginVariables)
                return processResult("login", data)
            }
        } catch (e) {
            console.log("useAuth login error", e)
            errorData = {
                "success": false,
                "message": "A server error occured. Try again.",
                "data": false
            }
            error = true
        }

        processResult("login", errorData)
        return false
    }

    return {
        logout,
        saveLoginSuccess,
        isLoggedInTest,
        isLoggedIn,
        errorMsg,
        status,
        goHome,
        handleLoginSubmit,
        handleCreateSubmit,
    }
}