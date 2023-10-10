// External
import { useEffect } from "react"
import { useRouter } from "next/router"

// Internal
import { useAuthContext } from "@/hooks"
import { GuestLayout, PrivateLayout } from ".."
import Login from "@/pages/guest/login"
import { OnlyPublicRoutes } from "../public-routes"

export default function LayoutController({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, isLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    console.log("layoutcontroller", isLoggedIn)
  }, [isLoggedIn])

  if (isLoading) return <span>Loading...</span>

  // If authorized, show the PrivateLayout
  // If not authorized, show the GuestLayout
  return (
    <div className="page-wrapper" key={router.asPath}>
      {
        isLoggedIn ?
          (
            <PrivateLayout>
              {children}
            </PrivateLayout>
          ) : (
            <OnlyPublicRoutes>
              <GuestLayout>
                {children}
              </GuestLayout>
            </OnlyPublicRoutes>
          )
      }
    </div>
  )
}
