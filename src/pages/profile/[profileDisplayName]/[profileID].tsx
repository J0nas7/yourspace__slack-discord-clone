// External
import { useRouter } from 'next/router'

// Internal
import { Profile as ProfileCard } from '@/components/'
import { useEffect } from 'react'

export default function profileID() {
  // Hooks
  const router = useRouter()

  // Internal variables
  const profileID: number = parseInt(router.query.profileID?.toString()!)

  return (
    <>
      {profileID && <ProfileCard variant="full-profile" profileID={profileID} />}
    </>
  )
}
