// External
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

// Internal
import { Block, Field, Text } from '@/components'
import { MessageDTO } from '@/types/MessageDTO'
import Message from '@/components/Cards/Message'
import styles from '@/core-ui/styles/modules/Message.module.scss'

export const ChannelName = (props: any) => {
  const [channelName, setChannelName] = useState<string | string[] | undefined>(props.channelName)

  const [newMessage, setNewMessage] = useState<string>('')
  const messages: MessageDTO[] = [
    {
      messageID: 1,
      userID: 1,
      userName: "1 Bjarnil",
      messageContent: "Lorem ipsum",
      messageDate: new Date()
    },
    {
      messageID: 2,
      userID: 2,
      userName: "2 Eigol",
      messageContent: "Ipsum lorem",
      messageDate: new Date()
    },
    {
      messageID: 3,
      userID: 3,
      userName: "3 Hanners",
      messageContent: "Dolor sit amet",
      messageDate: new Date()
    },
    {
      messageID: 4,
      userID: 4,
      userName: "4 Hilfe",
      messageContent: "Prosectetur.",
      messageDate: new Date()
    }
  ]

  return (
    <Block className="channel-inner-content">
      <Block className={styles["channel-messages"]}>
        <Block className="reverse-messages">
          {messages && messages.map((message, i) =>
            <Message variant="in-channel" className="channel-message" message={message} key={i} />
          )}
          {messages && messages.map((message, i) =>
            <Message variant="in-channel" className="channel-message" message={message} key={i} />
          )}
        </Block>
      </Block>
      <Block className={styles["channel-new-message"]}>
        <Block className={styles["new-message-tools"]}>
          <Block className={styles["message-add-media"]}>+</Block>
          <Field
            type="text"
            lbl=""
            value={newMessage}
            placeholder={"Message #" + channelName}
            onChange={(e: string) => setNewMessage(e)}
            disabled={false}
            className={styles["new-message-field"]}
          />
          <FontAwesomeIcon icon={faSmile} className={styles["message-emoticons"]} />
        </Block>
      </Block>
    </Block>
  )
}

export async function getServerSideProps(ctx: any) {
  const channelName = ctx.query.channelName + "WWW"

  return {
    props: {
      channelName
    }
  }
}