// External
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text, Field } from '@/components'
import styles from '../Private.module.scss'
import { ChannelList } from "../"

export default function Space() {
  const [spaceSearch,setSpaceSearch] = useState<string>('')
  const tempChannelsList:any = ["reactFTW", "Laravel for Leif", "CSS = Can't See Sharp"]

  return (
    <Block className={styles.spaceWrapper}>
        <Block className={styles.spaceHeader}>
          <Block className={styles.leftside}>
            <Text className={styles.spaceTitle}>Developers</Text>
          </Block>
          <Block className={styles.rightside}>
            <FontAwesomeIcon icon={faEllipsis} />
          </Block>
        </Block>
        <Block className={styles.spaceContent}>
          <Block className={styles.spaceSearch}>
            <Field
                type="text"
                lbl="" 
                placeholder="Search"
                value={spaceSearch}
                onChange={(e: string) => setSpaceSearch(e)}
                disabled={false}
                className={styles.spaceSearchField}
            />
          </Block>
          <ChannelList format="Text">{tempChannelsList}</ChannelList>
          <ChannelList format="Audio">{tempChannelsList}</ChannelList>
          <ChannelList format="Video">{tempChannelsList}</ChannelList>
          
          <Block className={styles.channelInfo+" "+styles.members}>
            <Block className={styles.channelInfoTop+" "+styles.members}>
              <Text variant="span" className={styles.channelInfoName+" "+styles.leftside}>MEMBERS</Text>
              <Text variant="span" className={styles.channelInfoSettings+" "+styles.rightside}/>
            </Block>
          </Block>
        </Block>
    </Block>
  )
}
