// External
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Internal
import { Block, Text } from '@/components'
import styles from '../Private.module.scss'
import pp_logo from '@/Assets/Images/headerLogo.png'

export default function Sidepanel() {
  return (
    <Block className={styles.sidepanelWrapper}>
        <Block className={styles.sidepanelHeader}>
            <Link href="/">
                <Image
                    id={styles.Logo}
                    src={pp_logo}
                    alt="Spaces logo"
                />
                <Text theId={styles.Logotxt} variant="span">Spaces</Text>
            </Link>
        </Block>
    </Block>
  )
}
