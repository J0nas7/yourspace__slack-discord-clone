// External
import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from 'cookies-next'

export const useAuthContext = (__templateCheck?: Function) => {
    let logonCreds: any = null

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            logonCreds = getCookie('accessToken')
            if (logonCreds != null
                && (
                    typeof (logonCreds) === "string" 
                    && logonCreds.trim() !== ''
                )
            ) {
                return true
            }
        }
        return false
    })

    type jwtTokens = {
        accessToken: string,
        refreshToken: string
    }

    const removeTokens = () => {
        deleteCookie("accessToken")
        deleteCookie("refreshToken")
    }

    const saveTokens = (token: any) => {
        if (token.accessToken) {
            setCookie("accessToken", token.accessToken, {
                httpOnly: false,//true
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 6 * 24,
                sameSite: false,//"strict",
                path: '/',
            })
        }
        if (token.refreshToken) {
            setCookie('refreshToken', token.refreshToken, {
                httpOnly: false,//true
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 6 * 24,
                sameSite: false,//"strict",
                path: '/',
            })
        }
    }
    const getAuthContext = (token: string) => {
        return getCookie(token)
    }
    const removeAuthContext = (token: string) => {
        return deleteCookie(token)
    }

    useEffect(() => {
        if (__templateCheck) __templateCheck()
    }, [isLoggedIn])

    useEffect(() => {
        // This will only be called once the component is mounted inside the browser
        setIsLoading(false)
    }, [])

    return {
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        logonCreds,
        removeTokens,
        saveTokens,
        getAuthContext,
        removeAuthContext
    }
}

export async function getServerSideProps(ctx: any) {
    const channelName = ctx.query.channelName + "WWW"

    return {
        props: {
            channelName
        }
    }
}