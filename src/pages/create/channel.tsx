// External
import { useState } from 'react'
import { Button } from '@mui/material'

// Internal
import { useChannels } from "@/hooks"
import { Block, Modal, Text, Form, Field, FileUpload } from '@/components'
import styles from '@/core-ui/styles/modules/Sidepanel.module.scss'

export default function Channel() {
    // Internal variables
    const [channelModal, setChannelModal] = useState<boolean>(true)
    const [channelName, setChannelName] = useState<string>('')
    const [channelFormat, setChannelFormat] = useState<string>('')

    // Hooks
    const { handleCreateSubmit, errorMsg, status } = useChannels("")

    const onCreate = () => {
        handleCreateSubmit(channelName, channelFormat)
    }

    const onCancel = () => {
        setChannelModal(false)
    }

    return (
        <Modal
            openModal={channelModal}
            closeModal={() => setChannelModal(false)}
            title="Create a channel"
            className="create-channel-dialog"
        >
            <Form onSubmit={onCreate} className={styles["create-channel-form"]}>
                <Text variant="p" className={styles["create-channel-teaser"]}>
                    Give your channel a name.<br />Assign it to a format.
                </Text>
                <Field
                    type="text"
                    lbl="Channel name"
                    displayLabel={true}
                    innerLabel={false}
                    placeholder="Enter channel name"
                    value={channelFormat}
                    onChange={(e: string) => setChannelFormat(e)}
                    disabled={false}
                    grow={false}
                    className={styles["create-channel-name"] + " no-fieldset"}
                />
                {errorMsg && status === 'resolved' && (
                    <Text className="error-notice" variant="p">{errorMsg}</Text>
                )}
                <Block className={styles["button-wrapper"]+ " button-wrapper"}>
                    <Button className="button button-green" onClick={onCreate} disabled={false}>
                        <Text variant="span" className="button button-text">Create channel</Text>
                    </Button>
                    <Button className="button button-blue" onClick={onCancel} disabled={false}>
                        <Text variant="span" className="button button-text">Channel</Text>
                    </Button>
                </Block>
            </Form>
        </Modal>
    )
}