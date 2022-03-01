import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  url_image: string
  post_content: string
  obj_image: {
    file: File | null
    base64: string
  }
  onChangeDetailForm: (key: string, value: any) => void
}

const PostDetailForm: React.FC<PropsType> = ({
  url_image,
  post_content,
  obj_image,
  onChangeDetailForm,
}) => {
  const inputFile = useRef(null)

  // Function
  const handleOnChange = (key: string) => (e: any) => {
    const value = e.target.value
    onChangeDetailForm(key, value)
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
          onChangeDetailForm('obj_image', { file, base64: reader.result as string })
        },
        false
      )
      reader.readAsDataURL(file)
    } else alert('File không hợp lệ')
  }

  const imageURL = url_image || obj_image.base64 || '/images/no_image_available.jpg'

  return (
    <div className="ass1-section ass1-section__edit-post">
      <div className="ass1-section__content">
        <form action="#">
          <div className="form-group mb-3">
            <input
              value={url_image}
              type="text"
              className="form-control ttg-border-none"
              placeholder="https://"
              onChange={handleOnChange('url_image')}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleOnChange('post_content')}
              className="form-control ttg-border-none"
              placeholder="Mô tả ..."
              value={post_content}
            />
          </div>
        </form>
        <div className="ass1-section__image">
          <Image src={imageURL || '/images/avatar-02.png'} alt="default" width={670} height={450} />
        </div>
        <input
          type="file"
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={handleChangeFile}
        />
        <Link href="https://giphy.com/">
          <a target="_blank" className="ass1-btn ass1-btn-meme">
            Chế ảnh từ meme
          </a>
        </Link>
        <button onClick={handleSelectFile} className="ass1-btn ass1-btn-meme">
          Đăng ảnh từ máy tính
        </button>
      </div>
    </div>
  )
}

export default PostDetailForm
