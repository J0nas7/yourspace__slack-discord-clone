// External
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

// Internal
import { Block, Field, Text } from '@/components'
import { Space, Channel } from '@/core-ui'
import { MessageDTO } from '@/types/MessageDTO'
import Message from '@/components/Cards/Message'
import styles from '@/core-ui/styles/modules/Message.module.scss'

export default function channelName(props: any) {
    const [spaceName, setSpaceName] = useState<string>(props.spaceName)
    const [channelName, setChannelName] = useState<string>(props.channelName)

    return (
        <>
            <Space spaceName={spaceName}></Space>
            <Channel channelName={channelName}></Channel>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const spaceName = ctx.query.spaceName + "sss"
    const channelName = ctx.query.channelName + "ccc"

    return {
        props: {
            spaceName,
            channelName
        }
    }
}