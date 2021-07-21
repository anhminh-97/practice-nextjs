import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import Button from './../components/Button/Button'
import { useRouter } from 'next/router'
import { ROUTER } from './../constants/commonConstants'
import { useGlobalState } from '../state'
import { useNotAuthen } from '../helpers/useAuthen'

type FormLogin = {
  email: string
  password: string
}

const initFormData = {
  email: '',
  password: '',
}

const Login = () => {
  useNotAuthen()
  const router = useRouter()
  // State
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormLogin>(initFormData)
  const [userInfo] = useGlobalState('currentUser')
  const errorString = router.query.error

  useEffect(() => {
    if (errorString) {
      alert('Đăng nhập thất bại')
      window.history.pushState({}, document.title, '/login')
    }
  }, [errorString])

  // Function
  // const onHandleChange = (key: string) => (evt: any) => {
  //   setFormData({ ...formData, [key]: evt.target.value })
  // }

  const onHandleSubmit = (e: any) => {
    e.preventDefault()
    if (loading) return
    e.target.submit()
    setLoading(true)
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <Link href={ROUTER.Home}>
          <a className="ass1-logo">Meme App</a>
        </Link>
      </div>
      <div className="ass1-login__content">
        <p>Đăng nhập</p>
        <div className="ass1-login__form">
          <form action="/api/login" method="POST" onSubmit={onHandleSubmit}>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email *"
              required
            />
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Mật khẩu *"
              required
            />
            <div className="ass1-login__send">
              <Link href={ROUTER.Register}>
                <a>Đăng ký một tài khoản</a>
              </Link>
              <Button type="submit" className="ass1-btn" isLoading={loading}>
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
