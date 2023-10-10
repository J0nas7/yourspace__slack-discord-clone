// External
import Link from "next/link"
import Image from 'next/image'
import { useState } from "react"

// Internal
import { Block, Text } from "@/components"
import { Sidepanel, Space, Channel } from ".."

export const PrivateLayout = ({children} : { children: React.ReactNode }) => {
    const [myMenuActive, setMyMenuActive] = useState(false)
    const toggleMyMenu = () => {
        setMyMenuActive(!myMenuActive)
    }

    return (
        <Block className="private-wrapper">
            <Sidepanel></Sidepanel>
            {children}
        </Block>
    )
}