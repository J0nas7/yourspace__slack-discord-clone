// External
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// Internal
import { Block, Heading, Profile as ProfileCard, SocketIndicator } from '@/components'
import { SocketProvider } from '@/components/providers/socket-provider'
import { ChannelName } from '@/core-ui'
import { ProfileDTO } from '@/types'
import { useAxios } from '@/hooks'

export default function directChat() {
  // Hooks
  const router = useRouter()
  const { httpPostWithData } = useAxios()

  // Internal variables
  const partnerID: number = parseInt(router.query.profileID?.toString()!)
  const partnerDisplayName: string = router.query.profileDisplayName?.toString()!
  const [currentInstantChat, setCurrentInstantChat] = useState<string>('')

  // Methods
  const getCurrentInstantChat = async () => {
    const getCurrentInstantChatVariables = {
      "Partner_Profile_ID": partnerID
    }
    // Send request to the API for user data
    const chatData = await httpPostWithData("readUser", getCurrentInstantChatVariables)
    if (chatData.data) setCurrentInstantChat(chatData.data)
  }

  useEffect(() => {
    getCurrentInstantChat()
  }, [partnerID])

  return (
    <Block className="other-pages-wrapper">
      <Block className="other-pages-inner chat-wrapper">
        <SocketProvider>
          <Block className="chat-header">
            <Block className="left-side">
              <Heading>
                {"Chat with: "}
                {partnerID && <ProfileCard variant="profile-display-name" profileID={partnerID} />}
              </Heading>
            </Block>
            <Block className="right-side">
              <SocketIndicator />
            </Block>
          </Block>
          <ChannelName instantChat={partnerDisplayName} />
        </SocketProvider>
      </Block>
    </Block>
  )
}
