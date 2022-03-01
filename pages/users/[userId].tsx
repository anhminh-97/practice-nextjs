import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { UserDetailPosts } from '../../components/UserDetailPosts'
import { UserDetailInfo } from './../../components/UserDetailInfo'
import { NextPage, NextPageContext } from 'next'
import { getTokenSSRAndCSR } from '../../helpers'
import { useRouter } from 'next/router'
import { ROUTER } from '../../constants/commonConstants'
import { TypeUser } from '../../types/User'
import { PostType } from '../../types/post'
import userService from '../../services/userService'
import postService from './../../services/postService'

type PropsType = {
  userDetailInfo: TypeUser | null
  userDetailPosts: PostType[]
}

const UserDetail: NextPage<PropsType> = ({ userDetailInfo, userDetailPosts }) => {
  const router = useRouter()

  useEffect(() => {
    if (!userDetailInfo) {
      alert('Tài khoản không tồn tại')
      router.push(ROUTER.Home)
    }
  }, [router, userDetailInfo])

  return (
    <Container>
      <UserDetailInfo postCount={userDetailPosts.length} userDetailInfo={userDetailInfo} />
      <UserDetailPosts userDetailInfo={userDetailInfo} userDetailPosts={userDetailPosts} />
    </Container>
  )
}

UserDetail.getInitialProps = async (ctx: NextPageContext) => {
  const userid = ctx.query.userId as string
  const [token] = getTokenSSRAndCSR(ctx)

  const userPos = userService.getUserById(userid)
  const postPos = postService.getPostsByUserId({ token, userid })

  const [userRes, postRes] = await Promise.all([userPos, postPos])

  return {
    userDetailInfo: userRes?.user || null,
    userDetailPosts: postRes?.posts || [],
  }
}

export default UserDetail
