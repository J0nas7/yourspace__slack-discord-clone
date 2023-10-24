// External
import { useRouter } from "next/router"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSmile } from "@fortawesome/free-solid-svg-icons"

// Internal
import { Block, Field, Form } from "@/components"
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { useAxios } from "@/hooks"

interface ChatInputProps {
    apiUrl: string
    query: Record<string, any>
    name: string
    type: "conversation" | "channel"
}

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}: ChatInputProps) => {
    // Hooks
    const router = useRouter()
    const { socketEmit } = useAxios()

    // Internal variables
    const spaceName = router.query.spaceName
    const channelName = router.query.channelName
    const [newMessage, setNewMessage] = useState<string>('')

    // Methods
    const onSubmit = (e: any = '') => {
        e.preventDefault()
        const messageData = {
            Message_Content: newMessage,
            Channel_Name: channelName,
            Space_Name: spaceName
        }

        // Send to API
        socketEmit('sendChatToServer', messageData)
        setNewMessage('')
    }

    return (
        <Form onSubmit={onSubmit}>
            <Block className={styles["channel-new-message"]}>
                <Block className={styles["new-message-tools"]}>
                    <Block className={styles["message-add-media"]}>+</Block>
                    <Field
                        type="text"
                        lbl=""
                        value={newMessage}
                        placeholder={"Message " + (type === "conversation" ? name : "#"+name)}
                        onChange={(e: string) => setNewMessage(e)}
                        disabled={false}
                        className={styles["new-message-field"]}
                        autoComplete="off"
                    />
                    <FontAwesomeIcon icon={faSmile} className={styles["message-emoticons"]} />
                </Block>
            </Block>
        </Form>
    )
}