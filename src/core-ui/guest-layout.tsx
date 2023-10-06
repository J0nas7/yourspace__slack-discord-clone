import { Block, Heading } from "@/components"
import styles from '@/core-ui/Guest.module.scss'

export const GuestLayout = ({children} : any) => {
  return (
    <Block className={styles.guest_wrapper}>
        <Block className={styles.contents}>
            {children}
        </Block>
    </Block>
  )
}