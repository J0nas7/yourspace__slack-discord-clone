// External
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Space as SpaceCard } from '@/components'
import { ChannelList } from "../"
import { useSpaces } from '@/hooks'

export const ChannelsAndSettings = () => {
    // Hooks
    const router = useRouter()
    const { theSpace, membersList, channelsList, resetChannels } = useSpaces()

    // Internal variables
    const routerChannelName = router.query.channelName

    type channelListObject = { [key: string]: [] }
    const emptyChannels: { [key: string]: [] } = {
        'text': [],
        'audio': [],
        'video': [],
    }
    const [channelsListRender, setChannelsListRender] = useState<channelListObject>(emptyChannels)

    useEffect(() => {
        //console.log("channelsAndSettings", channelsList)
        if (channelsList['text'].length &&
            channelsList['audio'].length && 
            channelsList['video'].length) setChannelsListRender(channelsList)
    }, [channelsList])

    return (
        <>
            <ChannelList format="Text" channelsList={channelsListRender['text']} resetChannels={resetChannels} />
            <ChannelList format="Audio" channelsList={channelsListRender['audio']} resetChannels={resetChannels} />
            <ChannelList format="Video" channelsList={channelsListRender['video']} resetChannels={resetChannels} />

            <Block className="channel-info members">
                <Block className="channel-info-top members">
                    <Text variant="span" className="channel-info-name left-side" onClick={resetChannels}>
                        MEMBERS OF <SpaceCard variant='name' withLabel={false} space={theSpace}></SpaceCard>
                    </Text>
                    <Text variant="span" className="channel-info-settings right-side" />
                </Block>
                <Block className="space-members-list">
                    {membersList ? (
                        <>
                            {membersList && membersList.map((member, i) =>
                                <Block key={i}>{member.Profile_ID}/{member.Profile_DisplayName}</Block>
                            )}
                        </>
                    ) : (
                        <Block>Not any members</Block>
                    )}
                </Block>
            </Block>
        </>
    )
}
