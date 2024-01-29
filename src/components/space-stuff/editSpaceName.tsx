// External
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

// Internal
import { useSpaces } from "@/hooks"
import { Block, Modal, Text, Form, Field, FileUpload } from '@/components'
import styles from '@/core-ui/styles/modules/Sidepanel.module.scss'

type Props = {
    visible: boolean,
    trigger: Function
}

export default function EditSpaceName({
    visible, trigger
}: Props) {
    // Hooks
    const { updateSpace, errorMsg, status, theSpace } = useSpaces()
    const router = useRouter()

    // Internal variables
    const tempSpaceName: string = router.query.spaceName?.toString()!
    const [editSpaceName, setEditSpaceName] = useState<string>(theSpace.Space_Name)
    const [spaceImage, setSpaceImage] = useState<string>(theSpace.Space_ImageUrl || '')

    // Methods
    const onEdit = () => updateSpace(editSpaceName, tempSpaceName)
    const onSkip = () => trigger(false)

    return (
        <Modal
            openModal={visible}
            closeModal={() => trigger(false)}
            title="Change your space name"
            className="edit-space-dialog"
        >
            <Form onSubmit={onEdit} className={styles["edit-space-form"]}>
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
                    className={styles["edit-space-name"] + " no-fieldset"}
                />
                {errorMsg && status === 'resolved' && (
                    <Text className="error-notice" variant="p">{errorMsg}</Text>
                )}
                <Block className={styles["button-wrapper"]+ " button-wrapper"}>
                    <Button className="button button-green" onClick={onEdit} disabled={false}>
                        <Text variant="span" className="button button-text">Save changes</Text>
                    </Button>
                    <Button className="button button-blue" onClick={onSkip} disabled={false}>
                        <Text variant="span" className="button button-text">Go back</Text>
                    </Button>
                </Block>
            </Form>
        </Modal>
    )
}