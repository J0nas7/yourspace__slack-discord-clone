// External
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faHashtag, faMicrophoneLines, faVideo } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// Internal
//import { useAxios } from '@/hooks'
import { useChannels, useSpaces } from "@/hooks"
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
    className?: string
    theId?: string
}

const Channel = ({
    variant = 'space-channel-format-list-item', channel, showModal = false, setShowModal, className, theId
}: Props) => {
    // Hooks
    const router = useRouter()
    const { updateChannel, deleteChannel, errorMsg, status } = useChannels()
    const { readChannelsAgain } = useSpaces()

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
    let newLink = CONSTANTS.SPACE_URL + router.query.spaceName +
            (channel.Channel_Type == "TEXT" ? CONSTANTS.CHANNEL_URL : '') + 
            (channel.Channel_Type == "AUDIO" ? CONSTANTS.AUDIO_URL : '') + 
            (channel.Channel_Type == "VIDEO" ? CONSTANTS.VIDEO_URL : '') + 
            channel.Channel_Name

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
        if (setShowModal) setShowModal(false)
        setEditChannelName('')
        readChannelsAgain()
    }

    const onEdit = (e?: FormEvent) => {
        e?.preventDefault()
        updateChannel(editChannelName, theChannel.Channel_Name, onSuccess)
    }

    const onDelete = () => deleteChannel(channel.Channel_Name, onSuccess)

    const handleDeleteChannel = () => confirm("Are you sure you want to delete the channel?") ? onDelete() : false

    if (variant === "space-channel-format-list-item") {
        return (
            <Block
                variant="span"
                className={"channel-format-list-item " + (routerChannelName === channel.Channel_Name ? " active" : "")}
            >
                <Link href={newLink} className="channel-format-list-item-link">
                    {channelTypeIcons[channel.Channel_Type]}
                    {channel.Channel_Name}
                </Link>
                <Block variant="span" className="channel-format-list-item-actions">
                    <FontAwesomeIcon icon={faPen} className="channel-format-list-item-action" onClick={() => setShowEditModal(true)} />
                    <FontAwesomeIcon icon={faTrashCan} className="channel-format-list-item-action" onClick={() => handleDeleteChannel()} />
                </Block>
                <ChannelCard variant="EDIT" channel={channel} showModal={showEditModal} setShowModal={setShowEditModal} />
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
                <Form onSubmit={(e) => onEdit(e)} className={styles["edit-channel-form"]}>
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
                        <Button className="button button-green" onClick={() => onEdit()} disabled={false}>
                            <Text variant="span" className="button button-text">Save changes</Text>
                        </Button>
                        <Button className="button button-blue" onClick={() => setShowModal!(false)} disabled={false}>
                            <Text variant="span" className="button button-text">Cancel</Text>
                        </Button>
                    </Block>
                </Form>
            </Modal>
        )
    /*} else if (variant === "DELETE") {
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
    */}

    return (<></>)
}

export default Channel