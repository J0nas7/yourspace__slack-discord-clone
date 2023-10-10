// External
import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { getCookie, getCookies, setCookie, deleteCookie } from 'cookies-next'

export const useAuthContext = () => {
    let logonCreds: any = null

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            logonCreds = localStorage.getItem("isLoggedIn")
            if (logonCreds != null) {
                //logonCreds = JSON.parse(logonCreds)
                //if (logonCreds.userID && logonCreds.keyWithSalt) {
                if ((typeof (logonCreds) === 'number' ||
                    typeof (logonCreds) === "string" && logonCreds.trim() !== '')
                    && !isNaN(logonCreds as number)) {
                    return true
                }
            }
        }
        return false
    })

    type jwtTokens = {
        accessToken: string,
        refreshToken: string
    }

    const saveTokens = (token: any) => {
        if (token.accessToken) {
            console.log("saveTokens()", token)
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
        // This will only be called once the component is mounted inside the browser
        setIsLoading(false)
    }, [])

    return {
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        logonCreds,
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