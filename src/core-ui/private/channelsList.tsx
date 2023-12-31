// External
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Modal, Channel as ChannelCard } from '@/components'
import { ChannelCreate } from '@/core-ui'
import { CONSTANTS } from '@/data/CONSTANTS'
import { ChannelDTO } from '@/types/'

type Props = {
    format: string
    channelsList: ChannelDTO[]
}

export const ChannelList = ({ format, channelsList }: Props) => {
    // Hooks
    const router = useRouter()

    // Internal variables
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

    return (
        <Block className="channel-format">
            <Block className="channel-format-top">
                <Text variant="span" className="channel-format-name left-side">{format} channels</Text>
                <FontAwesomeIcon icon={faPlus} className="channel-new-channel right-side" onClick={() => setShowCreateModal(true)} />
            </Block>
            <Block className="channel-format-list">
                { channelsList && channelsList.length ? (
                    <>
                        {channelsList.map((channel, i) =>
                            <ChannelCard
                                variant="space-channel-format-list-item" 
                                channel={channel} 
                                key={i}
                            />
                        )}
                    </>
                ) : (
                    <Block className="channel-format-list-item placeholder-loading channel-name"></Block>
                )}
            </Block>
            <ChannelCreate defaultFormat={format} showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
        </Block>
    )
}
