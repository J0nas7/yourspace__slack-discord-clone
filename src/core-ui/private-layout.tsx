// External
import Link from "next/link"
import Image from 'next/image'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text } from "@/components"
import { Sidepanel, Space, Channel } from "./"

export const PrivateLayout = ({children} : any) => {
    const [myMenuActive, setMyMenuActive] = useState(false)
    const toggleMyMenu = () => {
        setMyMenuActive(!myMenuActive)
    }
    
    return (
        <Block className="private-wrapper">
            <Sidepanel></Sidepanel>
            <Space></Space>
            <Channel>{children}</Channel>
        </Block>
    )
}