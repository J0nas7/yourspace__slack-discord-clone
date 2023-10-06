// External
import React from 'react'

// Internal
import { Block, Text } from '@/components'
import styles from '../Private.module.scss'

export const Channel = ({children} : any) => {
  return (
    <Block className={styles.channelWrapper}>
        <Block className={styles.channelHeader}>
            <Block className={styles.leftside}>
                <Block className={styles.hashtag} variant="span">#</Block>
                <Block className={styles.channelName} variant="span">reactFTW</Block>
            </Block>
            <Block className={styles.rightside}>Live: Real-time updates</Block>
        </Block>
        <Block className={styles.channelContent}>
            {children}
        </Block>
    </Block>
  )
}
