// Internal
import { useAuthContext } from "@/hooks"
import { GuestLayout, PrivateLayout } from ".."
import { OnlyPublicRoutes } from "../public-routes"

export default function LayoutController({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, isLoading } = useAuthContext()
  
  if (isLoading) return <span>Loading...</span>

  // If authorized, show the PrivateLayout
  // If not authorized, show the GuestLayout
  
  return (
    <div className="page-wrapper">
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
