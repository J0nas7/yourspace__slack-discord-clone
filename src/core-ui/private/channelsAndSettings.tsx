// External
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

// Internal
import { Block, Text, Space as SpaceCard, Profile as ProfileCard } from '@/components'
import { ChannelList } from "../"
import { useSpaces } from '@/hooks'

export const ChannelsAndSettings = () => {
    // Hooks
    const { urlSpaceName, getTheSpace, theSpace, membersList, channelsList, resetChannels, initChannels, alreadyMember, becomeAMember, getMembersOfTheSpace } = useSpaces()

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
            becomeAMember()
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
        const spaceChange = async () => {
            if (urlSpaceName) getTheSpace()
            setChannelsListRender(emptyChannels)
            //resetChannels()
        }
        spaceChange()
    }, [urlSpaceName])

    useEffect(() => {
        if (theSpace?.Space_ID) {
            const init = async () => {
                initChannels()
                getMembersOfTheSpace()
            }
            init()
        }
    }, [theSpace])

    return (
        <>
            {!alreadyMember &&
                <Block className="already-member">
                    <Block className="already-member-teaser">
                        Lige nu er du bare med på en kigger. Meld dig ind i spacet for at deltage i snakken!
                        <Button className="join-button" onClick={joinTheSpace}>
                            Deltag!
                        </Button>
                    </Block>
                </Block>
            }
            <ChannelList format="Text" channelsList={channelsList['text']} resetChannels={resetChannels} />
            <ChannelList format="Audio" channelsList={channelsList['audio']} resetChannels={resetChannels} />
            <ChannelList format="Video" channelsList={channelsList['video']} resetChannels={resetChannels} />

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
                                <ProfileCard variant="space-settings-member" className="space-members-list-item" profile={member} key={i} />
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
