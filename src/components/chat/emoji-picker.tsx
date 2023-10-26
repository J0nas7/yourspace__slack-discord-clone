// External
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSmile } from "@fortawesome/free-solid-svg-icons"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useEffect, useRef, useState } from "react"

// Internal
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { Block } from "@/components"

interface EmojiPickerProps {
    onChange: (value: string) => void
}

export const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {
    // Internal variables
    const [showEmojiPickerContent,setShowEmojiPickerContent] = useState<boolean>(false)

    // Methods
    useEffect(() => {
        if (typeof document !== "undefined") {
            const shadowRoot = document.querySelector('em-emoji-picker')?.shadowRoot
            const styleTag: any = document.createElement('style')
            styleTag.innerHTML = 
                "section#root { height: 400px; }" + 
                "#preview { display: none; }"
            shadowRoot?.appendChild(styleTag)
        }
    }, [])

    return (
    <Block className={styles["new-message-emoji-picker"]}>
        <FontAwesomeIcon icon={faSmile} className={styles["message-emoticons"]} onClick={() => setShowEmojiPickerContent(!showEmojiPickerContent)} />
        <Block className={styles["new-message-emoji-picker-content"] + " " + (showEmojiPickerContent ? styles["show-picker"] : "")}>
            <Picker
                data={data}
                onEmojiSelect={(emoji:any) => onChange(emoji.native)}
                className="tester"
            />
        </Block>
    </Block>
  )
}
