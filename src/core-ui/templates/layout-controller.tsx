// External
import { useEffect, useState } from "react"

// Internal
import { useAuthContext } from "@/hooks"
import { GuestLayout, PrivateLayout } from ".."

export default function LayoutController({
    children,
}: {
    children: React.ReactNode
}) {
  const { isLoggedIn, isLoading } = useAuthContext()
  const auth = isLoggedIn // determine if authorized, from localStorage

  console.log("layout controller")
  if (isLoading) return <span>Loading...</span>
  // If authorized, show the PrivateLayout
  // If not authorized, show the GuestLayout
  return (
    <div className="page-wrapper">
        {
          auth ?
            (
              <PrivateLayout>
                {children}
              </PrivateLayout>
            ) : (
              <GuestLayout>
                {children}
              </GuestLayout>
            )
        }
    </div>
  )
}
  