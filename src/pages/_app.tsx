// External
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"

// Internal
import '@/styles/globals.css'
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
