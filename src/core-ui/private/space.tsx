// External
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text, Field } from '@/components'
import { ChannelList } from "../"

export default function Space() {
  const [spaceSearch,setSpaceSearch] = useState<string>('')
  const tempChannelsList:any = ["reactFTW", "Laravel for Leif", "CSS = Can't See Sharp"]

  return (
    <Block className="space-wrapper">
        <Block className="space-header">
          <Block className="left-side">
            <Text className="space-title">Developers</Text>
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
          <ChannelList format="Text">{tempChannelsList}</ChannelList>
          <ChannelList format="Audio">{tempChannelsList}</ChannelList>
          <ChannelList format="Video">{tempChannelsList}</ChannelList>
          
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
