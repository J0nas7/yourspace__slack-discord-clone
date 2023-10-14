// External
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import { useRouter } from "next/router"

// Internal
import '@/core-ui/styles/Global.styles.scss'
import '@/core-ui/styles/Guest.scss'
import '@/core-ui/styles/Private.scss'
import appStore from '@/redux/store'
import { LayoutController } from '@/core-ui/'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <Provider store={appStore(undefined)}>
      <LayoutController>
        <Component {...pageProps} key={router.asPath} />
      </LayoutController>
    </Provider>
  )
}
