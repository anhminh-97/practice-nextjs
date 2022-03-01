import React, { useState } from 'react'

type PropsType = {
  handleSubmitForm: (value: string, callback: (err?: Error) => void) => void
}

const PostCommentForm: React.FC<PropsType> = ({ handleSubmitForm }) => {
  const [commentValue, setCommentValue] = useState('')
  const [loading, setLoading] = useState(false)

  // Function
  const handleChangeComment = (e: any) => {
    if (e.target.value.length <= 180) {
      setCommentValue(e.target.value)
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (loading) return
    if (commentValue.trim().length) {
      setLoading(true)
      handleSubmitForm(commentValue, (err) => {
        setLoading(false)
        setCommentValue('')
      })
    }
  }

  return (
    <div className="ass1-add-comment">
      <form action="#" onSubmit={handleSubmit}>
        <input
          onChange={handleChangeComment}
          type="text"
          value={commentValue}
          className="form-control ttg-border-none"
          placeholder="Thêm một bình luận"
        />
      </form>
      <div className="ass1-add-comment__content">
        <a href="#" className="ass1-add-comment__btn-save ass1-btn-icon">
          <span>{180 - commentValue.length}</span>
          <i className="icon-Submit_Tick" onClick={handleSubmit} />
        </a>
      </div>
    </div>
  )
}

export default PostCommentForm
