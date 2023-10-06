// External
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text } from '@/components'
import styles from '../Private.module.scss'

export default function Space() {
  return (
    <Block className={styles.spaceWrapper}>
        <Block className={styles.spaceHeader}>
            <Block className={styles.leftside}>
                Developers
            </Block>
            <Block className={styles.rightside}>
                <FontAwesomeIcon icon={faEllipsis} />
            </Block>
        </Block>
    </Block>
  )
}
