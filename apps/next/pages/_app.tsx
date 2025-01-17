import { Provider } from 'application/provider/web'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'application/store/Index'
import Master from 'application/screens/web/layouts/Master'
import   'application/assets/css/mapplic.css';
import { useRouter } from 'next/router';
import Forbidden from './[event]/forbidden'
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const [isForbidden,setIsForbidden]=useState(false)
  const env = {
    enviroment: process.env.NODE_ENV,
    api_base_url: process.env.APP_API_BASE_URL,
    msw_enabled: process.env.APP_MSW_ENABLED,
    eventcenter_base_url: process.env.APP_EVENTCENTER_BASE_URL,
    api_gateway_url: process.env.APP_API_GATEWAY_URL,
    app_server_enviornment: process.env.APP_SERVER_ENVIRONMENT,
    socket_connection_server: process.env.APP_SOCKET_SERVER,
    app_api_url: process.env.APP_API_URL,
    app_registration_url: process.env.APP_REGISTRATION_URL,
  }

  const getLayout = Component.getLayout || ((page:any) => <Master>{page}</Master>)
  const router = useRouter();

  useEffect(() => {
    if (env.enviroment == 'production' && typeof window !== 'undefined' && window.location.protocol === 'http:') {
      window.location.href = window.location.href.replace('http:', 'https:');
    }

    if(env.enviroment == 'production'){
      // disable console log
      console.log = function() {};
      console.info = function () {};
      console.warn = function () {};
      console.error = function () {};
    }
  }, [router,env.enviroment]);
 

  useEffect(() => {
    if (router.asPath.includes('forbidden')) {
      setIsForbidden(true);
    }
  }, [router.asPath]);
  return (
    <>
      <Head>
        <title>Loading...</title>
        <meta
          name="description"
          content="Loading..."
        />
        
      </Head>
      {typeof window !== "undefined" && (
        <ReduxProvider store={store}>
          <Provider env={env}>
            {!isForbidden?
            <>
            {getLayout(<Component {...pageProps} />)}
            </>
            :
            <BackgroundLayout>
            <Forbidden />
            </BackgroundLayout>
            }
          </Provider>
        </ReduxProvider>
      )}
    </>
  )
}

export default MyApp
