import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [counter,setCounter] = useState<number>(1)
  useEffect(() => {
    console.log(counter+" fester")
  }, [counter])
  
  return (
    <span onClick={() => setCounter(counter+1)} className="block">Festet {counter.toString()} gange</span>
  )
}