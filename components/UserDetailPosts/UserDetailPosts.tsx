import React from 'react'
import Image from 'next/image'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import Masonry from 'react-masonry-component'
import { PostType } from '../../pages'
import PostItem from './../PostItem/PostItem'

type PropsType = {
  userDetailPosts: PostType[]
}

dayjs.extend(relativeTime)

const UserDetailPosts: React.FC<PropsType> = ({ userDetailPosts }) => {
  return (
    <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
      {userDetailPosts.map((post) => (
        <PostItem key={post.PID} post={post} className="col-lg-6" />
      ))}
    </Masonry>
  )
}

export default UserDetailPosts
