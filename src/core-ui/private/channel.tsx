// External
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, SocketIndicator, AccessSpace } from '@/components'
import { ChannelName } from '@/core-ui'
import { SocketProvider } from '@/components/providers/socket-provider'
import { useSpaces } from '@/hooks'

export const Channel = () => {
  // Hooks
  const router = useRouter()
  const { theSpace, readSpace, membersList } = useSpaces()

  // Internal variables
  const channelName: string = router.query.channelName?.toString()!

  // Methods
  useEffect(() => {
    if (!theSpace.Space_Name) readSpace()
  }, [theSpace]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Block className="channel-wrapper">
      <AccessSpace membersList={membersList} access={1}>
        <SocketProvider>
          <Block className="channel-header">
            <Block className="left-side">
              <Text className="hashtag" variant="span">#</Text>
              <Text className="channel-name" variant="span">{channelName}</Text>
            </Block>
            <Block className="right-side">
              <SocketIndicator />
            </Block>
          </Block>
          <Block className="channel-content">
            <ChannelName channelName={channelName} />
          </Block>
        </SocketProvider>
      </AccessSpace>
    </Block>
  )
}