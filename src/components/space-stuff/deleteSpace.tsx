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

export default function deleteSpaceName({
    visible, trigger
}: Props) {
    // Hooks
    const { handleDeleteSubmit, errorMsg, status, theSpace, getTheSpace } = useSpaces()
    const router = useRouter()

    // Internal variables
    const tempSpaceName: string = router.query.spaceName?.toString()!
    
    // Methods
    const onDelete = () => handleDeleteSubmit(tempSpaceName)
    const onSkip = () => trigger(false)

    useEffect(() => {
        getTheSpace()
    }, [tempSpaceName])

    return (
        <Modal
            openModal={visible}
            closeModal={() => trigger(false)}
            title="Delete the space"
            className="delete-space-dialog"
        >
            <Form onSubmit={onDelete} className={styles["edit-space-form"]}>
                Are you sure you want to delete the space?<br/>
                <strong>{theSpace.Space_Name}</strong><br/>
                Channels and messages will also be deleted.
                
                {errorMsg && status === 'resolved' && (
                    <Text className="error-notice" variant="p">{errorMsg}</Text>
                )}
                <Block className={styles["button-wrapper"]+ " button-wrapper"}>
                    <Button className="button button-red" onClick={onDelete} disabled={false}>
                        <Text variant="span" className="button button-text">Delete space</Text>
                    </Button>
                    <Button className="button button-blue" onClick={onSkip} disabled={false}>
                        <Text variant="span" className="button button-text">Go back</Text>
                    </Button>
                </Block>
            </Form>
        </Modal>
    )
}