// External
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faGear, faFont, faUsers, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Field, Space as SpaceCard } from '@/components'
import { ChannelsAndSettings } from "../"
import { useSpaces } from '@/hooks'
import { SpaceDTO } from '@/types'
import { CONSTANTS } from '@/data/CONSTANTS'

export default function Space() {
  // Hooks
  const router = useRouter()

  // Internal variables
  const tempSpaceName: string = router.query.spaceName?.toString()!
  const [spaceSearch, setSpaceSearch] = useState<string>('')
  const [spaceActionMenu, setSpaceActionMenu] = useState<boolean>(false)
  const tempSpace: SpaceDTO = {
    Space_ID: 0,
    Space_Name: tempSpaceName,
  }

  return (
    <Block className="space-wrapper">
      <Block className="space-header">
        <Block className="left-side">
          <Text className="space-title">
            <SpaceCard variant='name' withLabel={false} space={tempSpace} />
          </Text>
        </Block>
        <Block className="right-side">
          <FontAwesomeIcon className="space-action-menu-button" icon={faEllipsis} onClick={() => setSpaceActionMenu(!spaceActionMenu)} />
          <Block className={"space-action-menu "+(spaceActionMenu ? "visible" : "")}>
            <nav>
              <ul>
                <li className="space-action-menu-item"><a href={CONSTANTS.SPACE_URL+tempSpace.Space_Name+"/edit-name"}>
                  <FontAwesomeIcon icon={faFont} />
                  Edit space name
                </a></li>
                <li className="space-action-menu-item"><a href="#">
                  <FontAwesomeIcon icon={faGear} />
                  Space settings
                </a></li>
                <li className="space-action-menu-item"><a href="#">
                  <FontAwesomeIcon icon={faUsers} />
                  Manage members
                </a></li>
                <li className="space-action-menu-item"><a href="#">
                  <FontAwesomeIcon icon={faTrashCan} />
                  Delete space
                </a></li>
              </ul>
            </nav>
          </Block>
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
