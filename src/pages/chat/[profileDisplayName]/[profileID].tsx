// External
import { useRouter } from 'next/router'

// Internal
import { Block, Heading, Profile as ProfileCard, SocketIndicator } from '@/components'
import { SocketProvider } from '@/components/providers/socket-provider'
import { ChannelName } from '@/core-ui'

export default function directChat() {
  // Hooks
  const router = useRouter()

  // Internal variables
  const profileID: number = parseInt(router.query.profileID?.toString()!)

  return (
    <Block className="other-pages-wrapper">
      <Block className="other-pages-inner chat-wrapper">
        <SocketProvider>
          <Block className="chat-header">
            <Block className="left-side">
              <Heading>
                {profileID && <ProfileCard variant="profile-display-name" profileID={profileID} />}
              </Heading>
            </Block>
            <Block className="right-side">
              <SocketIndicator />
            </Block>
          </Block>
          <ChannelName instantChat={profileID} />
        </SocketProvider>
      </Block>
    </Block>
  )
}
