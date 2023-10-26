// External
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

// Internal
import { Block, Text } from '@/components'
import pp_logo from '@/Assets/Images/headerLogo.png'
import { useSpaces } from '@/hooks'
import { Space, Profile as ProfileCard } from '@/components/'

export default function Sidepanel() {
  // Hooks
  const { getSpacesList, spacesList } = useSpaces()

  useEffect(() => {
    getSpacesList()
  }, [])

  return (
    <Block className="sidepanel-wrapper">
      <Block className="sidepanel-header">
        <Link href="/">
          <Image
            id="logo"
            src={pp_logo}
            alt="Spaces logo"
            priority={true}
          />
          <Text theId="logo-text" variant="span">Spaces</Text>
        </Link>
        <Block className="clear-both"></Block>
      </Block>
      <Block className="sidepanel-spaces-list">
        {spacesList && spacesList.map((space:any, i) =>
          <Space variant='sidepanel' withLabel={true} space={space} key={i}></Space>
        )}
      </Block>
      <Block className="space-member-context">
        <ProfileCard variant="space-bottom" className="member-context-details" />
      </Block>
    </Block>
  )
}
