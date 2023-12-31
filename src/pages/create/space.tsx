// External
import { useState } from 'react'
import { Button } from '@mui/material'

// Internal
import { useSpaces } from "@/hooks"
import { Block, Modal, Text, Form, Field, FileUpload } from '@/components'
import styles from '@/core-ui/styles/modules/Sidepanel.module.scss'

export default function Space() {
    // Hooks
    const { createSpace, errorMsg, status } = useSpaces()

    // Internal variables
    const [createSpaceModal, setCreateSpaceModal] = useState<boolean>(true)
    const [editSpaceName, setEditSpaceName] = useState<string>('')
    const [spaceImage, setSpaceImage] = useState<string>('')

    // Methods
    const onCreate = () => createSpace(editSpaceName, spaceImage)
    const onSkip = () => setCreateSpaceModal(false)

    return (
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
                <Text variant="p" className={styles["optional-image"]}>Optional image</Text>
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
                {errorMsg && status === 'resolved' && (
                    <Text className="error-notice" variant="p">{errorMsg}</Text>
                )}
                <Block className={styles["button-wrapper"]+ " button-wrapper"}>
                    <Button className="button button-green" onClick={onCreate} disabled={false}>
                        <Text variant="span" className="button button-text">Create space</Text>
                    </Button>
                    <Button className="button button-blue" onClick={onSkip} disabled={false}>
                        <Text variant="span" className="button button-text">Skip step</Text>
                    </Button>
                </Block>
            </Form>
        </Modal>
    )
}