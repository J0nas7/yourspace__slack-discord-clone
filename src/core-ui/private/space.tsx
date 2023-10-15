// External
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Field, Space as SpaceCard } from '@/components'
import { ChannelList } from "../"
import { useSpaces } from '@/hooks'
import { SpaceDTO } from '@/types'

export default function Space() {
  // Hooks
  const router = useRouter()
  const { theSpace, getTheSpace, channelsList, getChannelsList, channelsListToRender, setChannelsListToRender } = useSpaces()

  // Internal variables
  const tempSpaceName: string = router.query.spaceName?.toString()!
  const [spaceSearch, setSpaceSearch] = useState<string>('')
  const routerChannelName = router.query.channelName
  const tempSpace: SpaceDTO = {
    Space_ID: 0,
    Space_Name: tempSpaceName,
  }

  // Methods
  const initSpace = () => getTheSpace()

  const getAllChannels = () => {
    getChannelsList("text")
    getChannelsList("audio")
    getChannelsList("video")
  }

  useEffect(() => {
    console.log("TÆSK", theSpace)
    initSpace()
  }, [tempSpaceName, routerChannelName])

  useEffect(() => {
    getAllChannels()
  }, [theSpace])

  useEffect(() => {
    setChannelsListToRender(channelsList)
  }, [channelsList])

  return (
    <Block className="space-wrapper">
      <Block className="space-header">
        <Block className="left-side">
          <Text className="space-title">
            <SpaceCard variant='name' withLabel={false} space={theSpace}></SpaceCard>
          </Text>
        </Block>
        <Block className="right-side">
          <FontAwesomeIcon icon={faEllipsis} />
        </Block>
      </Block>
      <Block className="space-content">
        <Block className="space-search">
          <Field
            type="text"
            lbl=""
            placeholder="Search"
            hiddenMUILabel={true}
            value={spaceSearch}
            onChange={(e: string) => setSpaceSearch(e)}
            disabled={false}
            className="space-search-field"
          />
        </Block>
        <ChannelList format="Text" channelsList={channelsListToRender['text']} />
        <ChannelList format="Audio" channelsList={channelsListToRender['audio']} />
        <ChannelList format="Video" channelsList={channelsListToRender['video']} />

        <Block className="channel-info members">
          <Block className="channel-info-top members">
            <Text variant="span" className="channel-info-name left-side">MEMBERS</Text>
            <Text variant="span" className="channel-info-settings right-side" />
          </Block>
        </Block>
      </Block>
    </Block>
  )
}
