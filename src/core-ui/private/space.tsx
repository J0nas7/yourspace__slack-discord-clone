// External
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faGear, faFont, faUsers, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Field, EditSpaceName, DeleteSpaceName, Space as SpaceCard } from '@/components'
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
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const tempSpace: SpaceDTO = {
    Space_ID: 0,
    Space_Name: tempSpaceName,
  }

  const triggerEditModal = () => {
    setSpaceActionMenu(false)
    setShowEditModal(true)
  }

  const triggerDeleteModal = () => {
    setSpaceActionMenu(false)
    setShowDeleteModal(true)
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
          <Block className={"space-action-menu " + (spaceActionMenu ? "visible" : "")}>
            <nav>
              <ul>
                <li className="space-action-menu-item">
                  <Text
                    variant="span"
                    onClick={() => triggerEditModal()}
                    className="space-action-menu-item-clickable"
                  >
                    <FontAwesomeIcon icon={faFont} />
                    Edit space name
                  </Text>
                </li>
                <li className="space-action-menu-item">
                  <Link
                    onClick={() => setSpaceActionMenu(false)}
                    href={"/space/" + tempSpace.Space_Name + "/settings"}
                    className="space-action-menu-item-clickable"
                  >
                    <FontAwesomeIcon icon={faGear} />
                    Space settings
                  </Link>
                </li>
                <li className="space-action-menu-item">
                  <Link
                    onClick={() => setSpaceActionMenu(false)}
                    href={"/space/" + tempSpace.Space_Name + "/members"}
                    className="space-action-menu-item-clickable"
                  >
                    <FontAwesomeIcon icon={faUsers} />
                    Manage members
                  </Link>
                </li>
                <li className="space-action-menu-item">
                  <Text
                    variant="span"
                    onClick={() => triggerDeleteModal()}
                    className="space-action-menu-item-clickable"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                    Delete space
                  </Text>
                </li>
              </ul>
            </nav>
          </Block>
          {showEditModal && (<EditSpaceName visible={showEditModal} trigger={setShowEditModal} />)}
          {showDeleteModal && (<DeleteSpaceName visible={showDeleteModal} trigger={setShowDeleteModal} />)}
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
        <Block className="clear-both"></Block>
      </Block>
    </Block>
  )
}
