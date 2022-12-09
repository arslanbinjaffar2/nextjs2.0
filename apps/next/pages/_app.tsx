import { Provider } from 'application/provider/web'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import { Provider as ReduxProvider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import { history, store } from 'application/store/Index'

function MyApp({ Component, pageProps }: SolitoAppProps) {
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
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </ReduxProvider>
      )}
    </>
  )
}

export default MyApp
