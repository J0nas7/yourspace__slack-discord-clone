// External
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text } from '@/components'
import styles from '../Private.module.scss'

type Props = {
    format: string
    children: any
}

export const ChannelList = ({
    format, children
} : Props) => {
    const channelsList = children

    return (
        <Block className={styles.channelFormat}>
            <Block className={styles.channelFormatTop}>
                <Text variant="span" className={styles.channelFormatName + " " + styles.leftside}>{format} channels</Text>
                <FontAwesomeIcon icon={faPlus} className={styles.channelNewChannel + " " + styles.rightside} />
            </Block>
            <Block className={styles.channelFormatList}>
                {channelsList && channelsList.map((channelName:string, i:string) =>
                    <Block variant="span" className={styles.channelFormatListItem} key={i}>{channelName}</Block>
                )}
            </Block>
        </Block>
    )
}
