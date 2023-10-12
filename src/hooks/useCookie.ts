// External
import { getCookie, setCookie, deleteCookie } from 'cookies-next'

export const useCookie = () => {
    const setTheCookie = (name: string, value: string) => {
        setCookie(name, value, {
            httpOnly: false,//true
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24,
            sameSite: false,//"strict",
            path: '/',
        })
    }

    const getTheCookie = (name: string) => {
        return getCookie(name)
    }

    return {
        setTheCookie,
        getTheCookie,
    }
}
