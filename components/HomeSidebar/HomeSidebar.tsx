import React from 'react'
import Link from 'next/link'
import { ROUTER } from './../../constants/commonConstants'
import { PostType } from '../../pages'
import { useGlobalState } from '../../state'
import PostItem from './../PostItem/PostItem'

type PropsType = {
  userPosts: PostType[]
}

const HomeSidebar: React.FC<PropsType> = ({ userPosts }) => {
  const [userInfo] = useGlobalState('currentUser')
  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      {userInfo ? (
        userPosts?.length ? (
          userPosts.map((post) => <PostItem key={post.PID} post={post} />)
        ) : (
          <span>
            Bạn chưa có bài viết nào. Hãy thêm bài viết <Link href={ROUTER.Create}>tại đây</Link>
          </span>
        )
      ) : (
        <div>
          Vui lòng đăng nhập để xem nội dung này
          <Link href={ROUTER.Login}>
            <a> Đăng nhập</a>
          </Link>
        </div>
      )}
    </aside>
  )
}

export default HomeSidebar
