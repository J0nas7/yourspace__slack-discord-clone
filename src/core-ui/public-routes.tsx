// External
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// Internal
import { useAuthContext } from "@/hooks/useAuthContext"

// Check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined"

export const OnlyPublicRoutes = ({ children }: { children: React.ReactNode }) => {
    // Identify auth user
    const { isLoggedIn } = useAuthContext()
    const router = useRouter()
    const [render,setRender] = useState<boolean>(false)

    // Routes that are allowed for guests
    const publicRoutes = [
        "/guest/login",
        "/guest/create",
        "/guest/forgot"
    ]

    /**
     * @var pathIsProtected checks if path exists in the the publicRoutes routes array
     */
    const pathIsProtected = publicRoutes.indexOf(router.pathname) === -1

    if (isBrowser() && !isLoggedIn && pathIsProtected) {
        router.push("/guest/login")
    }

    useEffect(() => {
        setRender(true)
    }, [])

    if (!render) return <></>

    return <>{children}</>
}