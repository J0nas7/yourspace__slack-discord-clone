// External
import { useEffect, useState } from 'react'

export const useAuthContext = () => {
    let logonCreds : any = null
    
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            logonCreds = localStorage.getItem("isLoggedIn")
            if (logonCreds != null) {
                //logonCreds = JSON.parse(logonCreds)
                //if (logonCreds.userID && logonCreds.keyWithSalt) {
                if ((typeof(logonCreds) === 'number' || 
                    typeof(logonCreds) === "string" && logonCreds.trim() !== '')
                    && !isNaN(logonCreds as number)) {
                    return true
                }
            }
        }
        return true
    })

    const setAuthContext = (context:string) => {
        localStorage.setItem("isLoggedIn", context)
    }
    const getAuthContext = () => {
        return localStorage.getItem("isLoggedIn")
    }
    const removeAuthContext = () => {
        return localStorage.removeItem("isLoggedIn")
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
        setAuthContext,
        removeAuthContext
    }
}