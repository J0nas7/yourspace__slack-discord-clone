// External
import { useEffect } from "react"

// Internal
import { useAuth } from "@/hooks"
import { Block, Heading, Text } from "@/components"

export default function Login() {
    const { logout } = useAuth()

    useEffect(() => {
        logout()
    }, [])

    return (
        <Block className="logout">
            <Heading title="Logging you out..." />
            <Text className="teaser-text">We look forward to see you again in your space!</Text>
        </Block>
    )
}