// External
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

// Internal
//import { useAxios } from '@/hooks'
import { Block, Text } from '@/components'
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
} : Props) => {
    const router = useRouter()
    const Message : MessageDTO = message
    const profilePicFolder = ""//apiUrl+"item_images/"
    //const { httpPostWithData } = useAxios()
    
    const editMessage = () => {
        if (Message.messageID) {
            router.push("/channel/1/editMessage/"+Message.messageID)
            /*navigate('/order', {
                orderID: Order.Order_ID,
            })*/
        }
    }

    const deleteMessage = () => {
        if (Message.messageID) {
            router.push("/channel/1/deleteMessage/"+Message.messageID)
            /*navigate('/order', {
                orderID: Order.Order_ID,
            })*/
        }
    }

    if (variant == "in-channel") {
        return (
            <Block className={styles["message-item"]}>
                <img className={styles["profile-picture"]} width="100px" src={profilePicFolder + Message.userName} />
                <Block className={styles["message-details"]}>
                    <Block className={styles["message-top"]}>
                        <Block className="left-side">
                            <Text variant="span" className={styles["message-username"]}>{Message.userName}</Text>
                            <Text variant="span" className={styles["message-datestamp"]}>{Message.messageDate.getFullYear()}</Text>
                        </Block>
                        <Block className={"right-side "+styles["message-actions"]}>
                            <FontAwesomeIcon icon={faPen} className={styles["message-action"]} onClick={() => editMessage()} />
                            <FontAwesomeIcon icon={faTrash} className={styles["message-action"]} onClick={() => deleteMessage()} />
                        </Block>
                    </Block>
                    <Block className={styles["message-content"]}>
                        {Message.messageContent}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec aliquet lacus, vel ultrices eros. vel ultres eros. vel ultrices eros.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec aliquet lacus, vel ultrices eros. vel ultrices eros. vel ultrices eros.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec aliquet lacus, vel ultrices eros. vel ultrices eros. vel ultrices eros.
                    </Block>
                </Block>
            </Block>
        )
    }

    return (
        <></>
    )
}

export default Message