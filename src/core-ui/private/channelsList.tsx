// External
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text } from '@/components'
import { ChannelCreate } from '@/core-ui'
import { CONSTANTS } from '@/data/CONSTANTS'

export const ChannelList = ({ format, channelsList }: {
    format: string
    channelsList: any
}) => {
    // Hooks
    const router = useRouter()

    // Internal variables
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const channelsListToRender: Array<any> = channelsList
    const routerChannelName = router.query.channelName

    // Methods
    const listItemLinkHandler = (newName: string) => {
        let newLink = CONSTANTS.SPACE_URL + router.query.spaceName +
            CONSTANTS.CHANNEL_URL + newName
        
        //router.push(newLink)
        router.push(
            { pathname: newLink },
            undefined,
            { shallow: true }
        )
        //return newLink
    }

    useEffect(() => {
        console.log("showCreateChannel", showCreateModal)
    }, [showCreateModal])

    return (
        <Block className="channel-format">
            <Block className="channel-format-top">
                <Text variant="span" className="channel-format-name left-side">{format} channels</Text>
                <FontAwesomeIcon icon={faPlus} className="channel-new-channel right-side" onClick={() => setShowCreateModal(true)} />
            </Block>
            <Block className="channel-format-list">
                {channelsListToRender.length ? (
                    <>
                        {channelsListToRender.map((channel, i) =>
                            <Block
                                variant="span"
                                className={"channel-format-list-item" + (routerChannelName === channel.Channel_Name ? " active" : "")}
                                onClick={() => listItemLinkHandler(channel.Channel_Name)}
                                key={i}
                            >
                                <Text variant="span">{channel.Channel_Name}</Text>
                            </Block>
                        )}
                    </>
                ) : (
                    <Text variant="span" className="spinner-loader" />
                )}
            </Block>
            <ChannelCreate defaultFormat={format} showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
        </Block>
    )
}
