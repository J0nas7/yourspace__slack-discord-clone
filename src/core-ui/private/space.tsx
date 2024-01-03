// External
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faGear, faFont, faUsers, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Internal
import { Block, Text, Field, EditSpaceName, Space as SpaceCard } from '@/components'
import { ChannelsAndSettings } from "../"
import { useSpaces } from '@/hooks'
import { SpaceDTO } from '@/types'
import { CONSTANTS } from '@/data/CONSTANTS'

export default function Space() {
  // Hooks
  const router = useRouter()
  const { theSpace, readChannels, readMembers, readSpace, deleteSpace } = useSpaces()

  // Internal variables
  const urlSpaceName: string = router.query.spaceName?.toString()!
  const [spaceSearch, setSpaceSearch] = useState<string>('')
  const [spaceActionMenu, setSpaceActionMenu] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const tempSpace: SpaceDTO = {
    Space_ID: 0,
    Space_Name: urlSpaceName,
  }

  // Methods
  const triggerEditModal = () => {
    setSpaceActionMenu(false)
    setShowEditModal(true)
  }

  const confirmDeleteSpace = () => {
    if (confirm("Are you sure you want to delete this space, and its content?")) {
      setSpaceActionMenu(false)
      deleteSpace(urlSpaceName)
    }
  }

  useEffect(() => {
    console.log("wrapper", urlSpaceName)
    if (urlSpaceName) readSpace(urlSpaceName)
  }, [urlSpaceName])

  useEffect(() => {
    if (theSpace?.Space_ID) {
      const init = async () => {
        readChannels()
        readMembers()
      }
      init()
    }
  }, [theSpace])

  return (
    <Block className="second-wrapper">
      <Block className="second-header">
        <Block className="left-side">
          <Text className="second-title">
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
                    onClick={() => confirmDeleteSpace()}
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
