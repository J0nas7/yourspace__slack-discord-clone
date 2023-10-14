// External
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text } from '@/components'
import { CONSTANTS } from '@/data/CONSTANTS'


export const ChannelList = ({ format, channelsList }: {
    format: string
    channelsList: any
}) => {
    const channelsListToRender: Array<any> = channelsList

    const router = useRouter()
    const routerChannelName = router.query.channelName

    const listItemLinkHandler = (newName: string) => {
        let newLink =   CONSTANTS.SPACE_URL + router.query.spaceName + 
                        CONSTANTS.CHANNEL_URL + newName
        return newLink
    }

    return (
        <Block className="channel-format">
            <Block className="channel-format-top">
                <Text variant="span" className="channel-format-name left-side">{format} channels</Text>
                <FontAwesomeIcon icon={faPlus} className="channel-new-channel right-side" />
            </Block>
            <Block className="channel-format-list">
                {channelsListToRender.length ? (
                    <>
                        {channelsListToRender.map((channel, i) =>
                            <Block
                                variant="span"
                                className={"channel-format-list-item"+(routerChannelName === channel.Channel_Name ? " active" : "")}
                                key={i}
                            >
                                <Link href={listItemLinkHandler(channel.Channel_Name)}>{channel.Channel_Name}</Link>
                            </Block>
                        )}
                    </>
                ) : (
                    <Text variant="span" className="spinner-loader" />
                )}
            </Block>
        </Block>
    )
}
