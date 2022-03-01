import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useGlobalState } from '../../state'
import Button from './../../components/Button/Button'
import userService from '../../services/userService'

const UserProfile = () => {
  const inputFile = useRef(null)
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useGlobalState('currentUser')
  const [token] = useGlobalState('token')
  const [user, setUser] = useState(currentUser)
  const [objFile, setObjFile] = useState({ file: null, base64Url: '' })

  // Function
  const handleChangeData = (key: string) => (e: any) => {
    const value = e.target.value
    setUser({ ...user, [key]: value })
  }

  const handleSelectFile = () => {
    inputFile.current.click()
  }

  const handleChangeFile = (e: any) => {
    const fileList = e.target.files
    if (fileList.length === 0) return
    const file = fileList[0] as File
    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function () {
          setObjFile({ file, base64Url: reader.result as string })
        },
        false
      )
      reader.readAsDataURL(file)
    } else alert('File không hợp lệ')
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    const data = {
      fullname: user.fullname,
      gender: user.gender,
      description: user.description,
      avatar: objFile.file,
    }
    userService
      .updateProfile(data, token)
      .then((res) => {
        if (res.status === 200) {
          setCurrentUser(res.user)
          alert('Cập nhật thông tin thành công')
        } else alert(res.error)
      })
      .finally(() => setLoading(false))
  }

  const avatarURL = objFile.base64Url || user.profilepicture || '/images/avatar-03.png'

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p className="text-center">Profile</p>
        <div className="ass1-login__form">
          <div className="mb-4 text-center cursor-pointer" onClick={handleSelectFile}>
            <Image src={avatarURL} alt="" width={100} height={100} />
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <input
              onChange={handleChangeData('fullname')}
              type="text"
              value={user.fullname}
              className="form-control"
              placeholder="Tên ..."
              required
            />
            <select
              value={user.gender}
              className="form-control"
              onChange={handleChangeData('gender')}
            >
              <option value="">Giới tính</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
            <input
              type="file"
              ref={inputFile}
              name="avatar"
              placeholder="Ảnh đại diện"
              className="form-control"
              style={{ display: 'none' }}
              onChange={handleChangeFile}
            />
            <textarea
              onChange={handleChangeData('description')}
              className="form-control"
              value={user.description}
              cols={30}
              rows={5}
              placeholder="Mô tả ngắn ..."
            />
            <div className="ass1-login__send justify-content-center">
              <Button type="submit" className="ass1-btn" isLoading={loading}>
                Cập nhật
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
