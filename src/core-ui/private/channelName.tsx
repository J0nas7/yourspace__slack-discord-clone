// External
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

// Internal
import { Block, Field, Text, ChatInput } from '@/components'
import { MessageDTO } from '@/types/'
import Message from '@/components/view-model/Message'
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { useSocket } from "@/components/providers/socket-provider"

export const ChannelName = ({ channelName }: { channelName: string }) => {
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

  const { socket } = useSocket()
  const [renderMessages,setRenderMessages] = useState<any>('Loading...')

  useEffect(() => {
    if (!socket) return

    socket.emit('sendChatToServer', " dolor sit amet")
    
    socket.on('sendChatToClient', (message: string) => {
      setRenderMessages(renderMessages + message)
    })
  }, [socket])

  return (
    <Block className="channel-inner-content">
      <Block className={styles["channel-stream"]}>
        {renderMessages}
      </Block>
      <ChatInput
        name={channelName}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelID: 1,
          serverID: 4
        }}
      />
    </Block>
  )
}