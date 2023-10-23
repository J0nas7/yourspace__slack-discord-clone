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
import { useAxios } from '@/hooks'

export const ChannelName = ({ channelName }: { channelName: string }) => {
  // Hooks
  const { socket } = useSocket()
  const router = useRouter()
  const { httpPostWithData } = useAxios()

  // Internal variables
  const spaceName = router.query.spaceName
  const [messages, setMessages] = useState<MessageDTO[]>([])

  // Methods
  const getMessages = async () => {
    if (channelName && spaceName) {
      // Request messages in the channel
      // Variables to send to backend API
      const getMessagesVariables = {
        "Space_Name": spaceName,
        "Channel_Name": channelName,
      }

      // Send request to the API for messages
      try {
        const data = await httpPostWithData("getMessages", getMessagesVariables)
        if (data.data && data.data.length) {
          console.log(data.data)
          setMessages([...messages, ...data.data])
        }
      } catch (e) {
        console.log("Channel getMessages error", e)
      }
    }
  }

  useEffect(() => {
    if (!messages.length) getMessages()
  }, [channelName, spaceName])

  useEffect(() => {
    if (!socket) return

    socket.on('sendChatToClient', (message: MessageDTO) => {
      setMessages([...messages, message])
    })
  }, [socket, messages])

  return (
    <Block className="channel-inner-content">
      <Block className={styles["channel-messages"]}>
        <Block className="reverse-messages">
          {messages && messages.map((message, i) =>
            <Message variant="in-channel" className="channel-message" message={message} key={i} />
          )}
        </Block>
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