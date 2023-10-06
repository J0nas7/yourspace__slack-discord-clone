import { Block } from "@/components"

export const GuestLayout = ({ children }: any) => {
  return (
    <Block className="guest-wrapper">
      <Block className="guest-contents">
        {children}
      </Block>
    </Block>
  )
}