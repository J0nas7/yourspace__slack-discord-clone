// External
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Field, Space as SpaceCard } from '@/components'
import { ChannelsAndSettings } from "../"
import { useSpaces } from '@/hooks'
import { SpaceDTO } from '@/types'

export default function Space() {
  // Hooks
  const router = useRouter()

  // Internal variables
  const tempSpaceName: string = router.query.spaceName?.toString()!
  const [spaceSearch, setSpaceSearch] = useState<string>('')
  const tempSpace: SpaceDTO = {
    Space_ID: 0,
    Space_Name: tempSpaceName,
  }

  return (
    <Block className="space-wrapper">
      <Block className="space-header">
        <Block className="left-side">
          <Text className="space-title">
            <SpaceCard variant='name' withLabel={false} space={tempSpace}></SpaceCard>
          </Text>
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
        <ChannelsAndSettings />
      </Block>
    </Block>
  )
}
