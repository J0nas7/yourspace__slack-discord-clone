// External
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

// Internal
import { Block, Field, Text } from '@/components'
import { Space, Channel } from '@/core-ui'
import { MessageDTO } from '@/types/'
import Message from '@/components/view-model/Message'
import styles from '@/core-ui/styles/modules/Message.module.scss'

export default function channelName() {
    return (
        <Channel />
    )
}