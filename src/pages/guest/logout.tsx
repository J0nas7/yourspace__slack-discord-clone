// External
import { useEffect } from "react"

// Internal
import { useAuth } from "@/hooks"

export default function Login() {
    const { logout } = useAuth()

    useEffect(() => {
        logout()
    }, [])

    return (
        <></>
    )
}