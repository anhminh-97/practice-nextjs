import React, { useState } from 'react'
import postService from '../../services/postService'
import { PostType } from '../../types/post'
import { PostItem } from '../PostItem'
import Button from './../Button/Button'

type PropsType = {
  listPosts: PostType[]
}

const pagesize = 3

const PostListItem: React.FC<PropsType> = (props) => {
  // state
  const [loading, setLoading] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [listPosts, setListPosts] = useState(props.listPosts)

  // Function
  const handleLoadMore = () => {
    if (loading) return
    setLoading(true)
    postService
      .getPostPaging({ pagesize, currPage: currPage + 1 })
      .then((res) => {
        if (res.status === 200) {
          const newPosts = res.posts || []
          setListPosts([...listPosts, ...newPosts])
          setCurrPage((prev) => prev + 1)
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="ass1-section__list">
      {listPosts.map((post) => (
        <PostItem key={post.PID} post={post} />
      ))}
      <Button isLoading={loading} onClick={handleLoadMore} className="load-more ass1-btn">
        <span>Xem thêm</span>
      </Button>
    </div>
  )
}

export default PostListItem
