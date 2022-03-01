import React from 'react'
import Link from 'next/link'
import { useGlobalState } from '../../state'
import { Button } from '../Button'

type PropsType = {
  category: string[]
  loading: boolean
  handleSubmitPost: () => void
  onChangeDetailForm: (key: string, value: string[]) => void
}

const PostDetailSidebar: React.FC<PropsType> = ({
  category,
  loading,
  onChangeDetailForm,
  handleSubmitPost,
}) => {
  const [categories] = useGlobalState('categories')

  // Function
  const handleChange = (e: any) => {
    const isCheck = e.target.checked
    const value = e.target.value
    const findIdx = category.findIndex((cateId) => cateId === value)
    const isExisting = findIdx !== -1
    if (!isExisting && isCheck) {
      onChangeDetailForm('category', [...category, value])
    } else if (!isCheck) {
      onChangeDetailForm(
        'category',
        category.filter((id) => id !== value)
      )
    }
  }

  return (
    <aside className="ass1-aside ass1-aside__edit-post">
      <div>
        <Button isLoading={loading} className="ass1-btn" onClick={handleSubmitPost}>
          Đăng bài
        </Button>
      </div>
      <div className="ass1-aside__edit-post-head">
        <p style={{ width: '100%', marginBottom: '10px' }}>Chọn danh mục</p>
        {categories.map((category) => (
          <label className="ass1-checkbox" key={category.id}>
            <input type="checkbox" name="category" value={category.id} onChange={handleChange} />
            <span />
            <p>{category.text}</p>
          </label>
        ))}
      </div>
      <div className="ass1-aside__get-code">
        <p>Share Link</p>
      </div>
      <div className="ass1-aside__social">
        <Link href="/">
          <a className="ass1-btn-social__facebook ass1-btn-social">
            <i className="fa fa-facebook" aria-hidden="true" />
          </a>
        </Link>

        <a href="" className="ass1-btn-social__twitter ass1-btn-social">
          <i className="fa fa-twitter" aria-hidden="true" />
        </a>
        <a href="" className="ass1-btn-social__google ass1-btn-social">
          <i className="fa fa-google-plus" aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
}

export default PostDetailSidebar
