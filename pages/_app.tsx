import 'bootstrap/dist/css/bootstrap.css'
import 'nprogress/nprogress.css'
import '../styles/css/style.css'

import App from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'

import { useMemo, useEffect } from 'react'
import { AppContext, AppProps } from 'next/app'

import { Header } from './../components/Header'
import { Footer } from '../components/Footer'
import { getTokenSSRAndCSR } from './../helpers/index'
import { useGlobalState } from '../state'
import userService from './../services/userService'
import postService from '../services/postService'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const pathname = router.pathname
  const [, setCurrentUser] = useGlobalState('currentUser')
  const [, setToken] = useGlobalState('token')
  const [, setCategories] = useGlobalState('categories')

  useMemo(() => {
    setCurrentUser(pageProps.userInfo)
    setToken(pageProps.token)
    setCategories(pageProps.categories)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      NProgress.set(0.3)
      NProgress.start()
    })
    router.events.on('routeChangeComplete', (url) => {
      NProgress.done()
    })
    router.events.on('routeChangeError', (err, url) => {
      NProgress.done()
    })
  }, [router.events])

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
  let userPos = null
  let categoriesPos = null
  const appProps = await App.getInitialProps(appContext)

  const [token, userToken] = getTokenSSRAndCSR(appContext.ctx)

  if (typeof window === 'undefined') {
    if (userToken?.id && userToken?.email) {
      userPos = userService.getUserById(userToken.id)
    }
    categoriesPos = postService.getCategories()
  }
  const [userRes, categoriesRes] = await Promise.all([userPos, categoriesPos])

  return {
    pageProps: {
      ...appProps.pageProps,
      token,
      userInfo: userRes?.user || null,
      categories: categoriesRes?.categories || [],
    },
  }
}

export default MyApp
