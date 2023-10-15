// External
import Link from "next/link"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Internal
import { Block, Text } from "@/components"
import { Sidepanel, Space, Channel } from ".."

export const PrivateLayout = ({children} : { children: React.ReactNode }) => {
    // Hooks
    const router = useRouter()

    // Internal variables
    const [myMenuActive, setMyMenuActive] = useState(false)
    const tempSpaceName: string = router.query.spaceName?.toString()!
    const toggleMyMenu = () => {
        setMyMenuActive(!myMenuActive)
    }

    useEffect(() => {
        console.log("private-layout")
    }, [])

    return (
        <Block className="private-wrapper">
            <Sidepanel></Sidepanel>
            {tempSpaceName && (
                <Space></Space>
            )}
            {children}
        </Block>
    )
}