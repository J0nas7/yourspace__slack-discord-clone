// External
import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"

// Internal
import {
    useAppDispatch,
    useTypedSelector,

    setAccessToken,
    setRefreshToken,

    selectAccessToken,
    selectRefreshToken,
} from '@/redux'
import { jwtTokensDTO } from '@/types/AuthDTO'
import { useCookie } from '@/hooks'
import { CONSTANTS } from '@/data/CONSTANTS'

export const useAuthContext = (__templateCheck?: Function) => {
    // Redux
    const dispatch = useAppDispatch()
    const accessToken = useTypedSelector(selectAccessToken)
    const refreshToken = useTypedSelector(selectRefreshToken)
    const tokensFromRedux: { [key: string]: string } = { "accessToken": accessToken, "refreshToken": refreshToken }

    // Hooks
    const { getTheCookie, setTheCookie, deleteTheCookie } = useCookie()

    /**
     * Methods
     */
    // Getters and setters
    const getAuthContext = (token: string) => {
        return getTheCookie(token)
    }
    const setAuthContext = (name: string, token: string) => {
        return setTheCookie(name, token)
    }
    const deleteAuthContext = (token: string) => {
        return deleteTheCookie(token)
    }
    const removeTokens = () => {
        deleteAuthContext("accessToken")
        deleteAuthContext("refreshToken")
    }

    // Logical
    const doLogout = async () => {
        deleteAuthContext("accessToken")
        deleteAuthContext("refreshToken")
        window.location.href = CONSTANTS.LOGOUT_URL
    }

    const getCurrentToken = (tokenName: string) => {
        if (tokenName) {
            if (tokensFromRedux[tokenName]) return tokensFromRedux[tokenName]
            if (getAuthContext(tokenName)) return getAuthContext(tokenName)
        }
        return tokenName
    }

    const saveTokens = (token: jwtTokensDTO) => {
        if (token.accessToken) setAuthContext("accessToken", token.accessToken)
        if (token.refreshToken) setAuthContext("refreshToken", token.refreshToken)
    }

    // Internal variables
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
        const tokens: jwtTokensDTO = { 'accessToken': accessToken, 'refreshToken': refreshToken }
        saveTokens(tokens)
    }, [accessToken, refreshToken])

    useEffect(() => {
        if (__templateCheck) __templateCheck()
    }, [isLoggedIn])

    useEffect(() => {
        // This will only be called once the component is mounted inside the browser
        /*if (localStorage.getItem("tempAccessToken")) {
            alert("Localstorage updated")
            setAuthContext("accessToken", localStorage.getItem("tempAccessToken")!)
            localStorage.removeItem("tempAccessToken")
        }*/

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
        getCurrentToken,
        doLogout,
        saveTokens,
    }
}