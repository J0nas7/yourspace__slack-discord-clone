// External
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@mui/material'

// Internal
import { Block, Modal, Text, Form, Field, FileUpload } from '@/components'
import pp_logo from '@/Assets/Images/headerLogo.png'
import styles from '@/core-ui/styles/modules/Sidepanel.module.scss'

export default function Sidepanel({ hasSpace }: { hasSpace: boolean }) {
  const [createSpaceModal, setCreateSpaceModal] = useState<boolean>(!hasSpace)
  const [editSpaceName, setEditSpaceName] = useState<string>('')
  const [spaceImage,setSpaceImage] = useState<string>('')

  const onCreate = () => {
    console.log(editSpaceName, spaceImage)
  }

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
        <Modal
          openModal={createSpaceModal}
          closeModal={() => setCreateSpaceModal(false)}
          title="Create your space"
          className="create-space-dialog"
        >
          <Form onSubmit={onCreate} className={styles["create-space-form"]}>
            <Text variant="p" className={styles["create-space-teaser"]}>
              Give your space a nice touch, with a personal picture and a name.<br />You can always change it later.
            </Text>
            <Block className={styles["create-space-image"]}>
              <FileUpload
                endpoint="spaceImage"
                value={spaceImage}
                onChange={setSpaceImage}
              />
            </Block>
            <Field
              type="text"
              lbl="Space name"
              displayLabel={true}
              innerLabel={false}
              placeholder="Enter space name"
              value={editSpaceName}
              onChange={(e: string) => setEditSpaceName(e)}
              disabled={false}
              grow={false}
              className={styles["create-space-name"] + " no-fieldset"}
            />
            <Block className="button-wrapper">
              <Button className="button button-green" onClick={onCreate} disabled={false}>
                <Text variant="span" className="button button-text">Create space</Text>
              </Button>
            </Block>
          </Form>
        </Modal>
      )}
    </Block>
  )
}
