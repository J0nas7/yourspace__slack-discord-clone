// External
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Internal
import { Block, Text } from '@/components'

export const Channel = ({children} : { children: React.ReactNode }) => {
  const [channelName, setChannelName] = useState<string|string[]|undefined>('')
  const router = useRouter()
  
  useEffect(() => {
    setChannelName(router.query.channelName+"FFF")
  }, [])

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
            {children}
        </Block>
    </Block>
  )
}