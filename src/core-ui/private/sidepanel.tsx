// External
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faPlus } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text } from '@/components'
import yourspace_logo from '@/Assets/Images/headerLogo.png'
import { useSpaces } from '@/hooks'
import { Space, Profile as ProfileCard } from '@/components/'
import { SpaceDTO } from '@/types'

export default function Sidepanel() {
  // Hooks
  const { getMemberOfSpacesList, spacesList } = useSpaces()

  useEffect(() => {
    getMemberOfSpacesList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Block className="sidepanel-wrapper">
      <Block className="sidepanel-header">
        <Link href="/">
          <Image
            id="logo"
            src={yourspace_logo}
            alt="Spaces logo"
            priority={true}
          />
          <Text theId="logo-text" variant="span">Spaces</Text>
        </Link>
        <Block className="clear-both"></Block>
      </Block>
      <Block className="sidepanel-spaces-list">
        {spacesList && spacesList.length ? (
          <>
            {spacesList.map((space: SpaceDTO, i) =>
              <Space variant='sidepanel' withLabel={true} space={space} key={i} />
            )}
          </>
        ) : (
          <>
            <Link href="#" className="placeholder-loading space-name"></Link>
            <Link href="#" className="placeholder-loading space-name"></Link>
            <Link href="#" className="placeholder-loading space-name"></Link>
          </>
        )}
        <Link href={"/create/space"} className="create-space with-label">
          <FontAwesomeIcon icon={faPlus} className="create" />
          <Text variant="span" className="space-label">
            <Text variant="span" className="inner-label">
              Opret&nbsp;et&nbsp;space
            </Text>
          </Text>
        </Link>
        <Link href={"/explore/all"} className="explore-spaces with-label">
          <FontAwesomeIcon icon={faCompass} className="compass" />
          <Text variant="span" className="space-label">
            <Text variant="span" className="inner-label">
              Udforsk&nbsp;spaces
            </Text>
          </Text>
        </Link>
      </Block>
      <Block className="space-member-context">
        <ProfileCard variant="space-bottom" className="member-context-details" />
      </Block>
    </Block>
  )
}
