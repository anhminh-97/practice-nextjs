import React, { useState } from 'react'
import userService from '../../services/userService'
import Button from './../../components/Button/Button'
import { useAuthen } from '../../helpers/useAuthen'
import { useGlobalState } from '../../state'

const initialState = {
  oldPassword: '',
  newPassword: '',
  reNewPassword: '',
}

const UserChangePassword = () => {
  useAuthen()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [token] = useGlobalState('token')

  const handleOnChange = (key: string) => (e: any) => {
    const value = e.target.value
    setFormData({ ...formData, [key]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    userService
      .changePassword(formData, token)
      .then((res) => {
        if (res.status === 200) {
          alert(res.message)
          setFormData(initialState)
        } else {
          alert(res.error)
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Đổi mật khẩu</p>
        <div className="ass1-login__form">
          <form action="#" onSubmit={handleSubmit}>
            <input
              value={formData.oldPassword}
              onChange={handleOnChange('oldPassword')}
              type="password"
              className="form-control"
              placeholder="Mật khẩu cũ"
              required
            />
            <input
              value={formData.newPassword}
              onChange={handleOnChange('newPassword')}
              type="password"
              className="form-control"
              placeholder="Mật khẩu mới"
              required
            />
            <input
              value={formData.reNewPassword}
              onChange={handleOnChange('reNewPassword')}
              type="password"
              className="form-control"
              placeholder="Xác nhận mật khẩu mới"
              required
            />
            <div className="ass1-login__send justify-content-center">
              <Button type="submit" className="ass1-btn" isLoading={loading}>
                Gửi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserChangePassword
