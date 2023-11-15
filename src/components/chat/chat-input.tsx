// External
import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"

// Internal
import { Block, Field, Form, EmojiPicker } from "@/components"
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { useAxios, useMessages } from "@/hooks"

interface ChatInputProps {
    name: string
    type: "conversation" | "channel"
    className: string
    value?: string
    setChanges?: Function
    saveChanges?: FormEventHandler
}

export const ChatInput = ({
    name,
    type,
    className,
    value,
    setChanges,
    saveChanges
}: ChatInputProps) => {
    // Hooks
    const { newMessage, setNewMessage, createNewMessage } = useMessages()

    return (
        <Form onSubmit={saveChanges ? saveChanges : createNewMessage}>
            <Block className={styles["channel-message"]+" "+styles[className]}>
                <Block className={styles["new-message-tools"]}>
                    <Block className={styles["message-add-media"]}>+</Block>
                    <Field
                        type="text"
                        lbl=""
                        value={value ? value : newMessage}
                        placeholder={"Message " + (type === "conversation" ? name : "#" + name)}
                        onChange={(e: string) => setChanges ? setChanges(e) : setNewMessage(e)}
                        disabled={false}
                        className={styles["new-message-field"]}
                        autoComplete="off"
                    />
                    <EmojiPicker onChange={
                        (emoji: string) =>
                            setChanges ? setChanges(value + emoji) : setNewMessage(newMessage + emoji)
                    } />
                </Block>
            </Block>
        </Form>
    )
}