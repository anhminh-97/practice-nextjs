import React from 'react'
import { PostType } from '../../pages'
import { PostItem } from '../PostItem'

type PropsType = {
  listPosts: PostType[]
}

const PostListItem: React.FC<PropsType> = ({ listPosts }) => {
  return (
    <div className="ass1-section__list">
      {listPosts.map((post) => (
        <PostItem key={post.PID} post={post} />
      ))}
    </div>
  )
}

export default PostListItem
