import 'bootstrap/dist/css/bootstrap.css'
import '../styles/css/style.css'

import App from 'next/app'
import Head from 'next/head'

import { AppContext, AppProps } from 'next/app'
import { useMemo } from 'react'

import { Header } from './../components/Header'
import { Footer } from '../components/Footer'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const hiddenFooter = useMemo(() => {
    const excluded = ['/', '/posts/[postId]']
    const currentRouter = router.pathname

    return excluded.indexOf(currentRouter) !== -1
  }, [router])

  const hiddenHeader = useMemo(() => {
    const excluded = ['/login', '/register']
    const currentRouter = router.pathname

    return excluded.indexOf(currentRouter) !== -1
  }, [router])

  return (
    <div id="root">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Cộng đồng chế ảnh ZendVN" />
        <meta name="author" content="etheme.com" />
        <title>Cộng đồng chế ảnh ZendVN</title>
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
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
