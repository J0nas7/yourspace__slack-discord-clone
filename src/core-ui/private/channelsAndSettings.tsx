// External
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

// Internal
import { Block, Text, Space as SpaceCard, Profile as ProfileCard } from '@/components'
import { ChannelList } from "../"
import { useSpaces } from '@/hooks'

export const ChannelsAndSettings = () => {
    // Hooks
    const { urlSpaceName, theSpace, membersList, channelsList, readChannelsAgain, readChannels, alreadyMember, createMember, readMembers } = useSpaces()

    // Internal variables
    type channelListObject = { [key: string]: [] }
    const emptyChannels: { [key: string]: [] } = {
        'text': [],
        'audio': [],
        'video': [],
    }
    const [channelsListRender, setChannelsListRender] = useState<channelListObject>(emptyChannels)

    // Methods
    const joinTheSpace = () => {
        if (!alreadyMember) {
            createMember()
        } else {
            alert("You are already a member of this space.")
        }
    }
    useEffect(() => {
        // console.log("channelsAndSettings", channelsList)
        if (channelsList['text'].length ||
            channelsList['audio'].length ||
            channelsList['video'].length) setChannelsListRender(channelsList)
    }, [channelsList])

    useEffect(() => {
        setChannelsListRender(emptyChannels)
    }, [urlSpaceName]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {alreadyMember === false &&
                <Block className="already-member">
                    <Block className="already-member-teaser">
                        Lige nu er du bare med på en kigger. Meld dig ind i spacet for at deltage i snakken!
                        <Button className="join-button" onClick={joinTheSpace}>
                            Deltag!
                        </Button>
                    </Block>
                </Block>
            }
            <ChannelList format="Text" channelsList={channelsListRender['text']} />
            <ChannelList format="Audio" channelsList={channelsListRender['audio']} />
            <ChannelList format="Video" channelsList={channelsListRender['video']} />

            <Block className="channel-info members">
                <Block className="channel-info-top members">
                    <Text variant="span" className="channel-info-name left-side" onClick={readChannelsAgain}>
                        MEMBERS OF <SpaceCard variant='name' withLabel={false} space={theSpace}></SpaceCard>
                    </Text>
                    <Text variant="span" className="channel-info-settings right-side" />
                </Block>
                <Block className="space-members-list">
                    {membersList ? (
                        <>
                            {membersList && membersList.map((member, i) =>
                                <ProfileCard variant="space-settings-member" className="space-members-list-item" profile={member} key={i} />
                            )}
                        </>
                    ) : (
                        <Block>There are no members</Block>
                    )}
                </Block>
            </Block>
        </>
    )
}
