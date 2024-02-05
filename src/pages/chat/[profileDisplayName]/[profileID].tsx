// External
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// Internal
import { Block, Heading, Profile as ProfileCard, SocketIndicator } from '@/components'
import { SocketProvider } from '@/components/providers/socket-provider'
import { ChannelName } from '@/core-ui'
import { ProfileDTO } from '@/types'
import { useAxios } from '@/hooks'
import styles from '@/core-ui/styles/modules/DirectMessage.module.scss'

export default function ProfileID() {
  // Hooks
  const router = useRouter()
  const { httpPostWithData, httpGetRequest } = useAxios()

  // Internal variables
  const partnerID: number = parseInt(router.query.profileID?.toString()!)
  const partnerDisplayName: string = router.query.profileDisplayName?.toString()!
  const [partnerData, setPartnerData] = useState<ProfileDTO>()
  const [myData, setMyData] = useState<ProfileDTO>()
  const [conversationList, setConversationList] = useState<ProfileDTO[]>()

  // Methods
  const getMembersOfInstantChat = async () => {
    const getMembersOfInstantChatVariables = {
      "Profile_ID": partnerID
    }
    // Send request to the API for user data
    const partnerData = await httpPostWithData("readUser", getMembersOfInstantChatVariables)
    const myData = await httpGetRequest("readUser")
    if (partnerData) setPartnerData(partnerData.data)
    if (myData) setMyData(myData.data)
  }

  useEffect(() => {
    getMembersOfInstantChat()
  }, [partnerID])

  useEffect(() => {
    console.log("data data", partnerData, myData)
    if (partnerData && myData) setConversationList([partnerData, myData])
  }, [partnerData, myData])

  return (
    <Block className={"full-pages-wrapper " + styles["chat-wrapper"]}>
      <Block className={"full-pages-inner"}>
        <SocketProvider>
          <Block className={styles["chat-header"]}>
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
          <Block className="dm-conversation">
            {conversationList && <ChannelName instantChat={partnerDisplayName} conversationList={conversationList} />}
          </Block>
        </SocketProvider>
      </Block>
    </Block>
  )
}
