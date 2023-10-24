// External
import { useEffect, useState } from 'react'

// Internal
import { Block } from '@/components'

export default function Home() {
  const [counter, setCounter] = useState<number>(1)

  return (
    <Block className="inner-content">
      {counter} fester
    </Block>
  )
}