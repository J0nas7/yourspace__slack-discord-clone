"use client";
// External
import React, { useEffect, useState } from 'react'
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import "@livekit/components-styles"

// Internal
import { Block, Text, AccessSpace } from '@/components'
import { useAxios, useSpaces } from '@/hooks'

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({
  chatId,
  video,
  audio
}: MediaRoomProps) => {
  // Hooks
  const { theSpace, readSpace, membersList } = useSpaces()
  const { httpGetRequest } = useAxios()

  // Internal variables
  const [token,setToken] = useState<string>('')

  // Methods
  useEffect(() => {
    const loadMedia = async () => {
      const profileData = await httpGetRequest("readUser")
      if (profileData.data) {
        try {
          const resp = await fetch(`/api/livekit/route?room=${chatId}&username=${profileData.data.Profile_DisplayName}`)
          const data = await resp.json()
          setToken(data.token)
        } catch (e) {
          console.log("Video channel error", e)
        }
      }
    }
    if (chatId) loadMedia()
  }, [chatId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!theSpace.Space_Name) readSpace()
  }, [theSpace]) // eslint-disable-line react-hooks/exhaustive-deps

  if (token === "") {
    return <>Loading...</>
  }

  return (
    <Block className="channel-wrapper">
      <AccessSpace membersList={membersList} access={1}>
        <LiveKitRoom
          data-lk-theme="default"
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          token={token}
          connect={true}
          video={video}
          audio={audio}
        >
          <VideoConference />
        </LiveKitRoom>
      </AccessSpace>
    </Block>
  )
}