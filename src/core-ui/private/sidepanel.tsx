// External
import Link from 'next/link'
import Image from 'next/image'

// Internal
import { Block, Text } from '@/components'
import pp_logo from '@/Assets/Images/headerLogo.png'

export default function Sidepanel() {
  return (
    <Block className="sidepanel-wrapper">
      <Block className="sidepanel-header">
        <Link href="/">
          <Image
            id="logo"
            src={pp_logo}
            alt="Spaces logo"
          />
          <Text theId="logo-text" variant="span">Spaces</Text>
        </Link>
      </Block>
    </Block>
  )
}
