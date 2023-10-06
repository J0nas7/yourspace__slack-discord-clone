// External
import React from 'react'

// Internal
import { Block, Text } from '@/components'

export const Channel = ({children} : any) => {
  return (
    <Block className="channel-wrapper">
        <Block className="channel-header">
            <Block className="left-side">
                <Text className="hashtag" variant="span">#</Text>
                <Text className="channel-name" variant="span">reactFTW</Text>
            </Block>
            <Block className="right-side">Live: Real-time updates</Block>
        </Block>
        <Block className="channel-content">
            {children}
        </Block>
    </Block>
  )
}
