// External
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

// Internal
//import { useAxios } from '@/hooks'
import { Block, Text, Modal, Field } from '@/components'
import { MessageDTO } from '@/types/MessageDTO'
import styles from './Message.module.scss'

type Variant = 'in-channel'
type Props = {
    variant: string
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
    const profilePicFolder = ""//apiUrl+"item_images/"
    //const { httpPostWithData } = useAxios()

    const editMessage = () => {
        setEditModal(true)
        /*if (theMessage.messageID) {
            router.push("/channel/1/editMessage/"+theMessage.messageID)
            /*navigate('/order', {
                orderID: Order.Order_ID,
            })*
        }*/
    }

    const deleteMessage = () => {
        if (theMessage.messageID) {
            router.push("/channel/1/deleteMessage/" + theMessage.messageID)
            /*navigate('/order', {
                orderID: Order.Order_ID,
            })*/
        }
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
                    className={styles["edit-message-dialog"] + " m" + theMessage.messageID}
                >
                    <Field
                        type="text"
                        lbl="Edit the message:"
                        value={editMsg}
                        onChange={(e: string) => setEditMsg(e)}
                        disabled={false}
                        grow={true}
                        className="message-field"
                    />
                </Modal>
            </Block>
        )
    }

    return (
        <></>
    )
}

export default Message