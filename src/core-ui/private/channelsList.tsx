// External
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text } from '@/components'

export const ChannelList = ({ format, channelsList }: {
    format: string
    channelsList: any
}) => {

    return (
        <Block className="channel-format">
            <Block className="channel-format-top">
                <Text variant="span" className="channel-format-name left-side">{format} channels</Text>
                <FontAwesomeIcon icon={faPlus} className="channel-new-channel right-side" />
            </Block>
            <Block className="channel-format-list">
                {channelsList && channelsList.map((channel: any, i: string) =>
                    <Block variant="span" className="channel-format-list-item" key={i}>{channel.Channel_Name}</Block>
                )}
            </Block>
        </Block>
    )
}
