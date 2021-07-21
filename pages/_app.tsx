import 'bootstrap/dist/css/bootstrap.css'
import '../styles/css/style.css'

import App from 'next/app'
import Head from 'next/head'

import { useMemo } from 'react'
import { AppContext, AppProps } from 'next/app'

import { Header } from './../components/Header'
import { Footer } from '../components/Footer'
import { getTokenSSRAndCSR } from './../helpers/index'
import { useGlobalState } from '../state'
import userService from './../services/userService'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const pathname = router.pathname
  const [, setCurrentUser] = useGlobalState('currentUser')
  const [, setToken] = useGlobalState('token')

  useMemo(() => {
    setCurrentUser(pageProps.userInfo)
    setToken(pageProps.token)
  }, [])

  const hiddenFooter = useMemo(() => {
    const excluded = ['/', '/posts/[postId]']
    const currentRouter = pathname

    return excluded.indexOf(currentRouter) !== -1
  }, [pathname])

  const hiddenHeader = useMemo(() => {
    const excluded = ['/login', '/register']
    const currentRouter = pathname

    return excluded.indexOf(currentRouter) !== -1
  }, [pathname])

  return (
    <div id="root">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Cộng đồng chế ảnh ZendVN" />
        <meta name="author" content="etheme.com" />
        <title>Cộng đồng chế ảnh</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" href="/fonts/emotion/style.css" />
        {/* JAVA SCRIPT */}
        {/* require */}
        {/*  */}
        {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
        {/*[if lt IE 9]>
	<![endif]*/}
      </Head>
      {!hiddenHeader && <Header />}
      <main>
        <Component {...pageProps} />
      </main>
      {!hiddenFooter && <Footer />}
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let userRes = null
  const appProps = await App.getInitialProps(appContext)

  const [token, userToken] = getTokenSSRAndCSR(appContext.ctx)

  if (typeof window === 'undefined' && userToken?.id && userToken?.email) {
    userRes = await userService.getUserById(userToken.id)
  }
  return { pageProps: { ...appProps.pageProps, token, userInfo: userRes && userRes.user } }
}

export default MyApp
