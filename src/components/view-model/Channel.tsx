// External
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faHashtag, faMicrophoneLines, faVideo } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// Internal
//import { useAxios } from '@/hooks'
import { useChannels } from "@/hooks"
import { Block, Text, Heading, Modal, Field, Form, Channel as ChannelCard } from '@/components'
import { ChannelDTO } from '@/types/'
import styles from '@/core-ui/styles/modules/Sidepanel.module.scss'
import { CONSTANTS } from '@/data/CONSTANTS'

type Variant = 'space-channel-format-list-item' | 'EDIT' | 'DELETE'
type Props = {
    variant: Variant
    channel: ChannelDTO
    showModal?: boolean
    setShowModal?: Function
    resetChannels?: Function
    className?: string
    theId?: string
}

const Channel = ({
    variant = 'space-channel-format-list-item', channel, showModal = false, setShowModal, resetChannels, className, theId
}: Props) => {
    // Hooks
    const router = useRouter()
    const { handleEditSubmit, errorMsg, status } = useChannels("")

    // Internal variables
    const routerChannelName = router.query.channelName
    let theChannel: ChannelDTO = channel
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [editChannelName, setEditChannelName] = useState<string>(theChannel.Channel_Name)
    const channelTypeIcons: { [key: string]: React.ReactNode } = {
        'TEXT': <FontAwesomeIcon icon={faHashtag} className="channel-format-list-item-link-icon" />,
        'AUDIO': <FontAwesomeIcon icon={faMicrophoneLines} className="channel-format-list-item-link-icon" />,
        'VIDEO': <FontAwesomeIcon icon={faVideo} className="channel-format-list-item-link-icon" />,
    }

    // Methods
    const listItemLinkHandler = (newName: string) => {
        let newLink = CONSTANTS.SPACE_URL + router.query.spaceName +
            CONSTANTS.CHANNEL_URL + newName

        //router.push(newLink)
        router.push(
            { pathname: newLink },
            undefined,
            { shallow: true }
        )
        //return newLink
    }

    const onSuccess = () => {
        setShowModal!(false)
        setEditChannelName('')
        resetChannels!()
    }

    const onEdit = () => handleEditSubmit(editChannelName, theChannel.Channel_Name, onSuccess)

    const onDelete = () => {

    }

    if (variant === "space-channel-format-list-item") {
        return (
            <Block
                variant="span"
                className={"channel-format-list-item " + (routerChannelName === channel.Channel_Name ? " active" : "")}
            >
                <Text variant="span" className="channel-format-list-item-link" onClick={() => listItemLinkHandler(channel.Channel_Name)}>
                    {channelTypeIcons[channel.Channel_Type]}
                    {channel.Channel_Name}
                </Text>
                <Block variant="span" className="channel-format-list-item-actions">
                    <FontAwesomeIcon icon={faPen} className="channel-format-list-item-action" onClick={() => setShowEditModal(true)} />
                    <FontAwesomeIcon icon={faTrashCan} className="channel-format-list-item-action" onClick={() => setShowDeleteModal(true)} />
                </Block>
                <ChannelCard variant="EDIT" channel={channel} showModal={showEditModal} setShowModal={setShowEditModal} resetChannels={resetChannels} />
                <ChannelCard variant="DELETE" channel={channel} showModal={showDeleteModal} setShowModal={setShowDeleteModal} resetChannels={resetChannels} />
            </Block>
        )
    } else if (variant === "EDIT") {
        return (
            <Modal
                openModal={showModal!}
                closeModal={() => setShowModal!(false)}
                title={"Edit channel: " + channel.Channel_Name}
                className="edit-channel-dialog"
            >
                <Form onSubmit={onEdit} className={styles["edit-channel-form"]}>
                    <Text variant="p" className={styles["edit-channel-teaser"]}>
                        Change your channels name.
                    </Text>
                    <Field
                        type="text"
                        lbl="Channel name"
                        displayLabel={true}
                        innerLabel={false}
                        placeholder="Enter channel name"
                        value={editChannelName}
                        onChange={(e: string) => setEditChannelName(e)}
                        disabled={false}
                        grow={false}
                        className={styles["create-channel-name"] + " no-fieldset"}
                    />
                    Channel format: {channel.Channel_Type}
                    {errorMsg && status === 'resolved' && (
                        <Text className="error-notice" variant="p">{errorMsg}</Text>
                    )}
                    <Block className={styles["button-wrapper"] + " button-wrapper"}>
                        <Button className="button button-green" onClick={onEdit} disabled={false}>
                            <Text variant="span" className="button button-text">Save changes</Text>
                        </Button>
                        <Button className="button button-blue" onClick={() => setShowModal!(false)} disabled={false}>
                            <Text variant="span" className="button button-text">Cancel</Text>
                        </Button>
                    </Block>
                </Form>
            </Modal>
        )
    } else if (variant === "DELETE") {
        return (
            <Modal
                openModal={showModal!}
                closeModal={() => setShowModal!(false)}
                title={"Delete channel: " + channel.Channel_Name}
                className="delete-channel-dialog"
            >
                <Form onSubmit={onDelete} className={styles["delete-channel-form"]}>
                    <Text variant="p" className={styles["delete-channel-teaser"]}>
                        Are you sure you want to delete the channel?
                    </Text>
                    Channel format: {channel.Channel_Type}
                    {errorMsg && status === 'resolved' && (
                        <Text className="error-notice" variant="p">{errorMsg}</Text>
                    )}
                    <Block className={styles["button-wrapper"] + " button-wrapper"}>
                        <Button className="button button-red" onClick={onDelete} disabled={false}>
                            <Text variant="span" className="button button-text">Yes, delete</Text>
                        </Button>
                        <Button className="button button-blue" onClick={() => setShowModal!(false)} disabled={false}>
                            <Text variant="span" className="button button-text">Cancel</Text>
                        </Button>
                    </Block>
                </Form>
            </Modal>
        )
    }

    return (
        <></>
    )
}

export default Channel