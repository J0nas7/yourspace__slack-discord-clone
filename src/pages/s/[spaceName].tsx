// External
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

// Internal
import { Block, Field, Text } from '@/components'
import { Space } from '@/core-ui'
import { MessageDTO } from '@/types/MessageDTO'
import Message from '@/components/Cards/Message'
import styles from '@/core-ui/styles/modules/Message.module.scss'

export default function ChannelID(props: any) {
    const [spaceName, setSpaceName] = useState<string|string[]|undefined>(props.spaceName)

    return (
        <Space></Space>
    )
}

export async function getServerSideProps(ctx: any) {
    const spaceName = ctx.query.spaceName + "sss"

    return {
        props: {
            spaceName
        }
    }
}