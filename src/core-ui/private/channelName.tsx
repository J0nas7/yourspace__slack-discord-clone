// External
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Internal
import { Block, Field, Text, ChatInput, Message as MessageCard } from '@/components'
import { MessageDTO, ProfileDTO } from '@/types/'
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { useSocket } from "@/components/providers/socket-provider"
import { useAxios } from '@/hooks'

export const ChannelName = ({ channelName }: { channelName: string }) => {
  // Hooks
  const { socket } = useSocket()
  const router = useRouter()
  const { httpPostWithData, httpGetRequest } = useAxios()

  // Internal variables
  const spaceName = router.query.spaceName
  const [messages, setMessages] = useState<MessageDTO[]>([])
  const [messagesToRender, setMessagesToRender] = useState<MessageDTO[]>([])
  const [currentProfile,setCurrentProfile] = useState<ProfileDTO>()

  // Methods
  const loadFirstMessages = async () => {
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
          setMessages([...data.data])
        }
      } catch (e) {
        console.log("Channel getMessages error", e)
      }
    }
  }

  useEffect(() => {
    setMessagesToRender([])
    loadFirstMessages()
  }, [channelName, spaceName])

  useEffect(() => {
    setMessagesToRender(messages)
  }, [messages])

  const getCurrentProfile = async () => {
    const getUserDataVariables = {
      "Space_Name": spaceName
    }
    // Send request to the API for user data
    const profileData = await httpPostWithData("userData", getUserDataVariables)
    if (profileData.data) setCurrentProfile(profileData.data)
  }
  useEffect(() => {
    getCurrentProfile()
  }, [spaceName])

  socket?.on('sendChatToClient', (message: MessageDTO) => {
    if (message.Channel_Name == channelName) setMessagesToRender([...messagesToRender, message])
  })

  return (
    <Block className="channel-inner-content">
      <Block className={styles["channel-messages"]}>
        <Block className="reverse-messages">
          {currentProfile && messagesToRender && messagesToRender.map((message, i) =>
            <MessageCard variant="in-channel" className="channel-message" message={message} currentProfile={currentProfile} key={i} />
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