// External
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Internal
import { Block, Text } from '@/components'
import { ChannelName } from '@/core-ui'

export const Channel = ({channelName} : { channelName: string }) => {
  return (
    <Block className="channel-wrapper">
        <Block className="channel-header">
            <Block className="left-side">
                <Text className="hashtag" variant="span">#</Text>
                <Text className="channel-name" variant="span">{channelName}</Text>
            </Block>
            <Block className="right-side">Live: Real-time updates</Block>
        </Block>
        <Block className="channel-content">
          <ChannelName channelName={channelName} />
        </Block>
    </Block>
  )
}