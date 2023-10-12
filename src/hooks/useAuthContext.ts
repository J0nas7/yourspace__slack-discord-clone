// External
import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from 'cookies-next'

// Internal
import {
    useAppDispatch,
    useTypedSelector,

    useAuthActions,

    setAccessToken,
    setRefreshToken,

    selectAccessToken,
    selectRefreshToken,
} from '@/redux'
import { jwtTokensDTO } from '@/types/AuthDTO'

export const useAuthContext = (__templateCheck?: Function) => {
    // Redux
    const dispatch = useAppDispatch()
    const { fetchRefreshJWTtoken } = useAuthActions()

    /**
     * Methods
     */
    // Getters and setters
    const getAuthContext = (token: string) => {
        return getCookie(token)
    }
    const setAuthContext = (name: string, token: string) => {
        return setCookie(name, token, {
            httpOnly: false,//true
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24,
            sameSite: false,//"strict",
            path: '/',
        })
    }
    const removeAuthContext = (token: string) => {
        return deleteCookie(token)
    }
    const removeTokens = () => {
        removeAuthContext("accessToken")
        removeAuthContext("refreshToken")
    }

    // Logical
    const refreshAccessToken = () => {
        console.log("refreshAccessToken()")
        dispatch(fetchRefreshJWTtoken(setAccessToken))
    }

    const tokenInvalid = () => {
        if (getAuthContext("refreshToken")) {
            refreshAccessToken()
        } else {
            removeTokens()
            window.location.href = '/'
        }
    }

    const saveTokens = (token: jwtTokensDTO) => {
        if (token.accessToken) setAuthContext("accessToken", token.accessToken)
        if (token.refreshToken) setAuthContext("refreshToken", token.refreshToken)
    }

    // Internal variables
    const accessToken = useTypedSelector(selectAccessToken)
    const refreshToken = useTypedSelector(selectRefreshToken)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const tempAccessToken = getAuthContext("accessToken")
            if (tempAccessToken != null
                && (
                    typeof (tempAccessToken) === "string"
                    && tempAccessToken.trim() !== ''
                )
            ) {
                return true
            }
        }
        return false
    })

    // Listeners
    useEffect(() => {
        /*if (refreshToken && accessToken == "RESET") {
            tokenInvalid()
        } else {*/
        if (accessToken) {
            const decodedJWT: any = jwt_decode(accessToken)
            //(decodedJWT.exp * 1000)
        }

        const tokens: jwtTokensDTO = { 'accessToken': accessToken, 'refreshToken': refreshToken }
        saveTokens(tokens)
    }, [accessToken, refreshToken])

    useEffect(() => {
        if (__templateCheck) __templateCheck()
    }, [isLoggedIn])

    useEffect(() => {
        // This will only be called once the component is mounted inside the browser
        if (localStorage.getItem("tempAccessToken")) {
            alert("Localstorage updated")
            setAuthContext("accessToken", localStorage.getItem("tempAccessToken")!)
            localStorage.removeItem("tempAccessToken")
        }

        if (getAuthContext("accessToken")) dispatch(setAccessToken({ "data": getAuthContext("accessToken") }))
        if (getAuthContext("refreshToken")) dispatch(setRefreshToken({ "data": getAuthContext("refreshToken") }))
        setIsLoading(false)
    }, [])

    return {
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        removeTokens,
        getAuthContext,
        saveTokens,
        refreshAccessToken,
    }
}