import { Provider } from 'application/provider/web'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'application/store/Index'

function MyApp({ Component, pageProps }: SolitoAppProps) {

  const env = {
    enviroment: process.env.NODE_ENV,
    api_base_url: process.env.APP_API_BASE_URL,
    msw_enabled: process.env.APP_MSW_ENABLED,
    eventcenter_base_url: process.env.APP_EVENTCENTER_BASE_URL
  }

  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {typeof window !== "undefined" && (
        <ReduxProvider store={store}>
          <Provider env={env}>
            <Component {...pageProps} />
          </Provider>
        </ReduxProvider>
      )}
    </>
  )
}

export default MyApp
