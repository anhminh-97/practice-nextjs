import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'

import { ROUTER } from '../constants/commonConstants'
import { handleError } from './../helpers/index'
import userService from '../services/userService'
import { useGlobalState } from '../state'
import { useNotAuthen } from '../helpers/useAuthen'
import Button from './../components/Button/Button'

const initRegistData = {
  fullname: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
  repassword: {
    value: '',
    error: '',
  },
}

const Register = () => {
  useNotAuthen()
  // state
  const [registerData, setRegisterData] = useState(initRegistData)
  const [, setToken] = useGlobalState('token')
  const [, setCurrentUser] = useGlobalState('currentUser')
  const [loading, setLoading] = useState(false)

  const isValidate = useMemo((): boolean => {
    for (let key in registerData) {
      const error = registerData[key].error
      if (error !== '') return false
    }
    return true
  }, [registerData])

  // Function
  const handleChangeData = (key: string) => (e: any) => {
    const value = e.target.value
    const error = handleError(key, value, registerData.password.value)
    setRegisterData({ ...registerData, [key]: { value, error } })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (loading) return
    if (!isValidate) {
      alert('Dữ liệu nhập vào không hợp lệ')
      return
    }

    const fullname = registerData.fullname.value
    const email = registerData.email.value
    const password = registerData.password.value
    const repassword = registerData.repassword.value

    const data = {
      fullname,
      email,
      password,
      repassword,
    }
    setLoading(true)
    userService
      .register(data)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.token)
          setCurrentUser(res.user)
          Cookies.set('token', res.token, { expires: 30 * 12 })
        } else alert(res.error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <Link href={ROUTER.Home}>
          <a className="ass1-logo">Meme App</a>
        </Link>
      </div>
      <div className="ass1-login__content">
        <p className="text-center">Đăng ký một tài khoản</p>
        <div className="ass1-login__form">
          <form action="#" onSubmit={handleRegister}>
            <div className="form-group">
              <input
                value={registerData.fullname.value}
                onChange={handleChangeData('fullname')}
                type="text"
                className="form-control"
                placeholder="Tên hiển thị *"
                required
              />
              {registerData.fullname.error && (
                <small className="form-text text-danger">{registerData.fullname.error}</small>
              )}
            </div>
            <div className="form-group">
              <input
                value={registerData.email.value}
                onChange={handleChangeData('email')}
                type="email"
                className="form-control"
                placeholder="Email *"
                required
              />
              {registerData.email.error && (
                <small className="form-text text-danger">{registerData.email.error}</small>
              )}
            </div>
            <div className="form-group">
              <input
                value={registerData.password.value}
                onChange={handleChangeData('password')}
                type="password"
                className="form-control"
                placeholder="Mật khẩu *"
                required
              />
              {registerData.password.error && (
                <small className="form-text text-danger">{registerData.password.error}</small>
              )}
            </div>
            <div className="form-group">
              <input
                value={registerData.repassword.value}
                onChange={handleChangeData('repassword')}
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu *"
                required
              />
              {registerData.repassword.error && (
                <small className="form-text text-danger">{registerData.repassword.error}</small>
              )}
            </div>

            <div className="ass1-login__send">
              <Link href={ROUTER.Login}>
                <a>Đăng nhập</a>
              </Link>
              <Button type="submit" className="ass1-btn" isLoading={loading}>
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
