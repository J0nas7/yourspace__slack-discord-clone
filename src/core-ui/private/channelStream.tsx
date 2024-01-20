// External
import { CSSProperties, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

// Internal
import { Block, Field, Text, ChatInput, Message as MessageCard, Profile as ProfileCard } from '@/components'
import { MessageDTO, ProfileDTO } from '@/types/'
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { useSocket } from "@/components/providers/socket-provider"
import { useAxios, useSpaces, useMessages } from '@/hooks'

export const ChannelName = ({ channelName }: { channelName: string }) => {
  // Hooks
  const { socket } = useSocket()
  const router = useRouter()
  const { httpPostWithData, httpGetRequest } = useAxios()
  const { membersList, readMembers } = useSpaces()
  const { readFirstMessages, updateMessageStream, reduxMessageStream } = useMessages()

  // Internal variables
  const spaceName: string = router.query.spaceName?.toString()!
  const [messages, setMessages] = useState<MessageDTO[]>([])
  const [currentProfile, setCurrentProfile] = useState<ProfileDTO>()
  const [openProfileInMessage, setOpenProfileInMessage] = useState<ProfileDTO>()
  const [openProfileModalCSS, setOpenProfileModalCSS] = useState<CSSProperties>({})

  // Methods
  useEffect(() => {
    updateMessageStream()
    readFirstMessages()
    if (spaceName) readMembers()
  }, [channelName, spaceName])

  const getCurrentProfile = async () => {
    const getUserDataVariables = {
      "Space_Name": spaceName
    }
    // Send request to the API for user data
    const profileData = await httpPostWithData("readUser", getUserDataVariables)
    if (profileData.data) setCurrentProfile(profileData.data)
  }

  useEffect(() => {
    getCurrentProfile()
  }, [spaceName])

  socket?.on('sendChatToClient', (message: MessageDTO) => {
    if (message.Channel_Name == channelName) updateMessageStream(false, message)
  })

  return (
    <Block className="channel-inner-content">
      <Block className={styles["channel-messages"]}>
        {openProfileInMessage && (
          <ProfileCard
            variant="in-channel-full-profile"
            className={clsx(
              styles["in-channel-full-profile"],
              { "!hidden": !openProfileInMessage }
            )}
            profile={openProfileInMessage}
            style={openProfileModalCSS}
          />
        )}
        <Block className="reverse-messages">
          {currentProfile && membersList && reduxMessageStream
            && reduxMessageStream.map((message, i) =>
              <MessageCard
                variant="in-channel"
                className="channel-message"
                message={message}
                openProfile={openProfileInMessage?.Profile_ID || 0}
                setOpenProfile={setOpenProfileInMessage}
                currentProfile={currentProfile}
                membersList={membersList}
                key={i}
              />
            )}
        </Block>
      </Block>
      <ChatInput
        name={channelName}
        type="channel"
        className="new-message"
      />
    </Block>
  )
}