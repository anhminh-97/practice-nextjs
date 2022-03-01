import React from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import Masonry from 'react-masonry-component'
import PostItem from './../PostItem/PostItem'
import Link from 'next/link'
import { ROUTER } from '../../constants/commonConstants'
import { PostType } from '../../types/post'
import { useGlobalState } from '../../state'
import { TypeUser } from '../../types/user'

type PropsType = {
  userDetailPosts: PostType[]
  userDetailInfo: TypeUser
}

dayjs.extend(relativeTime)

const UserDetailPosts: React.FC<PropsType> = ({ userDetailPosts, userDetailInfo }) => {
  const [currentUser] = useGlobalState('currentUser')
  const [token] = useGlobalState('token')

  const checkIsOwner = currentUser?.USERID === userDetailInfo.USERID

  return (
    <>
      {!token ? (
        <p className="text-center my-5">
          <Link href={ROUTER.Login}>Đăng nhập</Link> để xem bài viết.
        </p>
      ) : (
        <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
          {userDetailPosts.length ? (
            userDetailPosts.map((post) => (
              <PostItem key={post.PID} post={post} className="col-lg-6" isOwner={checkIsOwner} />
            ))
          ) : (
            <span className="text-center my-5">
              Bạn chưa có bài viết nào. Hãy thêm bài viết <Link href={ROUTER.Create}>tại đây</Link>
            </span>
          )}
        </Masonry>
      )}
    </>
  )
}

export default UserDetailPosts
