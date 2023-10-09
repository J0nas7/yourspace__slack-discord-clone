// External
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@mui/material'

// Internal
import { Block, Text, CreateSpace } from '@/components'
import pp_logo from '@/Assets/Images/headerLogo.png'

export default function Sidepanel({ hasSpace }: { hasSpace: boolean }) {
  return (
    <Block className="sidepanel-wrapper">
      <Block className="sidepanel-header">
        <Link href="/">
          <Image
            id="logo"
            src={pp_logo}
            alt="Spaces logo"
          />
          <Text theId="logo-text" variant="span">Spaces</Text>
        </Link>
      </Block>
      {hasSpace === false && (
        <CreateSpace hasSpace={hasSpace} />
      )}
    </Block>
  )
}
