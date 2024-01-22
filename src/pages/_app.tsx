// External
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"

// Internal
import '@/core-ui/styles/TW.scss'
import '@/core-ui/styles/Global.styles.scss'
import '@/core-ui/styles/Flexible-Box.scss'
import '@/core-ui/styles/Guest.scss'
import '@/core-ui/styles/Private.scss'
import appStore from '@/redux/store'
import { LayoutController } from '@/core-ui/'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={appStore(undefined)}>
      <LayoutController>
        <Component {...pageProps} />
      </LayoutController>
    </Provider>
  )
}
