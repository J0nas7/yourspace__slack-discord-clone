// External
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSmile } from "@fortawesome/free-solid-svg-icons"

// Internal
import { Block, Field, Form } from "@/components"
import styles from '@/core-ui/styles/modules/Message.module.scss'

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

    // Internal variables
    const [newMessage, setNewMessage] = useState<string>('')

    // Methods
    const onSubmit = (e: any = '') => {
        e.preventDefault()
        // Send to API
        console.log(newMessage)
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
                    />
                    <FontAwesomeIcon icon={faSmile} className={styles["message-emoticons"]} />
                </Block>
            </Block>
        </Form>
    )
}