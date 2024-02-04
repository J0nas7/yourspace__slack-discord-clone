// External
import { CSSProperties, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

// Internal
import { Block, Field, Text, ChatInput, Message as MessageCard, Profile as ProfileCard } from '@/components'
import { DirectMessageDTO, MessageDTO, ProfileDTO } from '@/types/'
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { useSocket } from "@/components/providers/socket-provider"
import { useAxios, useSpaces, useMessages } from '@/hooks'

type MessageStreamProps = {
  channelName?: string,
  instantChat?: string
}

export const ChannelName = ({
  channelName,
  instantChat
}: MessageStreamProps) => {
  // Hooks
  const { socket } = useSocket()
  const router = useRouter()
  const { httpPostWithData } = useAxios()
  const { membersList, readMembers } = useSpaces()
  const { readFirstMessages, updateMessageStream, reduxMessageStream, reduxConversationStream } = useMessages()

  // Internal variables
  const spaceName: string = router.query.spaceName?.toString()!
  const [renderStream, setRenderStream] = useState<MessageDTO[] | DirectMessageDTO[]>([])
  const [currentProfile, setCurrentProfile] = useState<ProfileDTO>()
  const [openProfileInMessage, setOpenProfileInMessage] = useState<ProfileDTO>()
  const [openProfileModalCSS, setOpenProfileModalCSS] = useState<CSSProperties>({})

  // Methods
  useEffect(() => {
    updateMessageStream()
    readFirstMessages()
    if (spaceName) readMembers()
  }, [channelName, instantChat, spaceName]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("message", reduxMessageStream, "conv",  reduxConversationStream)
    if (channelName && reduxMessageStream?.length) setRenderStream(reduxMessageStream)
    if (instantChat && reduxConversationStream?.length) setRenderStream(reduxConversationStream)
  }, [reduxMessageStream, reduxConversationStream])

  const getCurrentProfile = async () => {
    const getUserDataVariables = {
      "Space_Name": spaceName
    }
    // Send request to the API for user data
    const profileData = await httpPostWithData("readUser", getUserDataVariables)
    if (profileData.data) setCurrentProfile(profileData.data)
  }

  useEffect(() => {
    if (spaceName || instantChat) getCurrentProfile()
  }, [spaceName, instantChat]) // eslint-disable-line react-hooks/exhaustive-deps

  socket?.on('sendChatToClient', (message: MessageDTO) => {
    if (message.Channel_Name == channelName
      || message.Channel_Name == instantChat
    ) {
      updateMessageStream(false, message)
    }
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
          {currentProfile && renderStream &&
            ((channelName && membersList) || instantChat) && renderStream.map((message:any, i) =>
              <MessageCard
                variant={(channelName ? "in-channel" : "in-conversation")}
                className={(channelName ? "channel-message" : "conversation-message")}
                message={(channelName ? message : undefined)}
                dm={(instantChat ? message : undefined)}
                openProfile={openProfileInMessage?.Profile_ID || 0}
                setOpenProfile={setOpenProfileInMessage}
                currentProfile={currentProfile}
                membersList={membersList}
                key={i}
              />
            )}
        </Block>
      </Block>
      {(channelName || instantChat) &&
        <ChatInput
          name={channelName ? channelName : instantChat?.toString()!}
          type={channelName ? "channel" : "conversation"}
          className="new-message"
        />
      }
    </Block>
  )
}