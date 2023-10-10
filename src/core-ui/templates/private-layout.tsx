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

    const [hasSpace,setHasSpace] = useState<boolean>(false)
    
    return (
        <Block className="private-wrapper">
            <Sidepanel hasSpace={hasSpace}></Sidepanel>
            { hasSpace === true && (
                <Block>
                    <Space></Space>
                    <Channel>{children}</Channel>
                </Block>
            )}
        </Block>
    )
}