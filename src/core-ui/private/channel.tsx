// External
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, SocketIndicator } from '@/components'
import { ChannelName } from '@/core-ui'
import { SocketProvider } from '@/components/providers/socket-provider'

export const Channel = () => {
  // Hooks
  const router = useRouter()

  // Internal variables
  const channelName: string = router.query.channelName?.toString()!

  return (
    <Block className="channel-wrapper">
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
    </Block>
  )
}