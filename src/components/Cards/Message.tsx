// External
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

// Internal
//import { useAxios } from '@/hooks'
import { Block, Text, Heading, Modal, Field } from '@/components'
import { MessageDTO } from '@/types/MessageDTO'
import styles from '@/core-ui/styles/modules/Message.module.scss'

type Variant = 'in-channel'
type Props = {
    variant: Variant
    message: MessageDTO
    className?: string
    theId?: string
}

const Message = ({
    variant = 'in-channel', message, className, theId
}: Props) => {
    const router = useRouter()
    const theMessage: MessageDTO = message
    const [editMsg, setEditMsg] = useState<string>(theMessage.messageContent)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const profilePicFolder = ""//apiUrl+"item_images/"
    //const { httpPostWithData } = useAxios()

    const editMessage = () => {
        setEditModal(true)
    }

    const deleteMessage = () => {
        setDeleteModal(true)
    }

    if (variant == "in-channel") {
        return (
            <Block className={styles["message-item"]}>
                <img className={styles["profile-picture"]} width="100px" src={profilePicFolder + theMessage.userName} />
                <Block className={styles["message-details"]}>
                    <Block className={styles["message-top"]}>
                        <Block className="left-side">
                            <Text variant="span" className={styles["message-username"]}>{theMessage.userName}</Text>
                            <Text variant="span" className={styles["message-datestamp"]}>{theMessage.messageDate.getFullYear()}</Text>
                        </Block>
                        <Block className={"right-side " + styles["message-actions"]}>
                            <FontAwesomeIcon icon={faPen} className={styles["message-action"]} onClick={() => editMessage()} />
                            <FontAwesomeIcon icon={faTrash} className={styles["message-action"]} onClick={() => deleteMessage()} />
                        </Block>
                    </Block>
                    <Block className={styles["message-content"]}>
                        {theMessage.messageContent}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec aliquet lacus, vel ultrices eros. vel ultres eros. vel ultrices eros.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec aliquet lacus, vel ultrices eros. vel ultrices eros. vel ultrices eros.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec aliquet lacus, vel ultrices eros. vel ultrices eros. vel ultrices eros.
                    </Block>
                </Block>
                <Modal
                    openModal={editModal}
                    closeModal={() => setEditModal(false)}
                    title="Edit the message"
                    className={styles["edit-message-dialog"] + " m" + theMessage.messageID}
                >
                    <Field
                        type="text"
                        lbl="Edit the message:"
                        value={editMsg}
                        onChange={(e: string) => setEditMsg(e)}
                        disabled={false}
                        grow={true}
                        growMin={3}
                        className="message-field"
                    />
                    <Button className="button button-green dialog-edit-message-submit" onClick={() => alert('hej')} disabled={false}>
                        <Text variant="span" className="button button-text">Save changes</Text>
                    </Button>
                </Modal>
                <Modal
                    openModal={deleteModal}
                    closeModal={() => setDeleteModal(false)}
                    title="Delete the message"
                    className={styles["delete-message-dialog"] + " m" + theMessage.messageID}
                >
                    Are you sure you want to delete this message?
                    <Button className="button button-red dialog-edit-message-submit" onClick={() => alert('hej')} disabled={false}>
                        <Text variant="span" className="button button-text">Yes, delete it</Text>
                    </Button>
                </Modal>
            </Block>
        )
    }

    return (
        <></>
    )
}

export default Message