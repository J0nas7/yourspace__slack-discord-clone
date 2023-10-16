// External
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Space as SpaceCard } from '@/components'
import { ChannelList } from "../"
import { SpaceDTO } from '@/types'
import { useSpaces } from '@/hooks'

export const ChannelsAndSettings = () => {
    // Hooks
    const { theSpace, getTheSpace, channelsList, getChannelsList } = useSpaces()
    const router = useRouter()

    // Internal variables
    const emptyChannels: {[key: string]: []} = {
        'text': [],
        'audio': [],
        'video': [],
    }
    const tempSpaceName: string = router.query.spaceName?.toString()!
    const [channelsListToRender, setChannelsListToRender] = useState<{ [key: string]: [] }>(emptyChannels)

    // Methods
    const initSpace = () => getTheSpace()
    const getAllChannels = () => {
        getChannelsList("text")
        getChannelsList("audio")
        getChannelsList("video")
    }

    useEffect(() => {
        if (channelsList['text'].length) setChannelsListToRender(channelsList)
    }, [channelsList])

    useEffect(() => {
        if (!theSpace.Space_Name) initSpace()
        if (!channelsListToRender['text'].length) getAllChannels()
    }, [theSpace])

    useEffect(() => {
        initSpace()
        setChannelsListToRender(emptyChannels)
    }, [tempSpaceName])

    return (
        <>
            <ChannelList format="Text" channelsList={channelsListToRender['text']} />
            <ChannelList format="Audio" channelsList={channelsListToRender['audio']} />
            <ChannelList format="Video" channelsList={channelsListToRender['video']} />

            <Block className="channel-info members">
                <Block className="channel-info-top members">
                    <Text variant="span" className="channel-info-name left-side">MEMBERS OF
                        <SpaceCard variant='name' withLabel={false} space={theSpace}></SpaceCard></Text>
                    <Text variant="span" className="channel-info-settings right-side" />
                </Block>
            </Block>
        </>
    )
}
