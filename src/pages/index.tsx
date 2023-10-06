// External
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Internal
import { Block, Text } from '@/components'

export default function Home() {
  const messages = [
    {
      userID: 1,
      userName: "Bjarnil",
      messageContent: "Lorem ipsum",
      messageDate: new Date()
    },
    {
      userID: 2,
      userName: "Eigol",
      messageContent: "Ipsum lorem",
      messageDate: new Date()
    },
    {
      userID: 3,
      userName: "Hanners",
      messageContent: "Dolor sit amet",
      messageDate: new Date()
    }
  ]

  return (
    <Block>
      {messages && messages.map((message, i) =>
        <Block className="channel-message">hej</Block>
      )}
    </Block>
  )
}