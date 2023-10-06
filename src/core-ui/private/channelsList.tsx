// External
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text } from '@/components'

type Props = {
    format: string
    children: any
}

export const ChannelList = ({
    format, children
} : Props) => {
    const channelsList = children

    return (
        <Block className="channel-format">
            <Block className="channel-format-top">
                <Text variant="span" className="channel-format-name leftside">{format} channels</Text>
                <FontAwesomeIcon icon={faPlus} className="channel-new-channel rightside" />
            </Block>
            <Block className="channel-format-list">
                {channelsList && channelsList.map((channelName:string, i:string) =>
                    <Block variant="span" className="channel-format-list-item" key={i}>{channelName}</Block>
                )}
            </Block>
        </Block>
    )
}
