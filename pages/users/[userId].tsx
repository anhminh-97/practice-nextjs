import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { UserDetailPosts } from '../../components/UserDetailPosts'
import { UserDetailInfo } from './../../components/UserDetailInfo'
import { PostType } from '../../pages'
import { TypeUser } from '../../state'
import { NextPage, NextPageContext } from 'next'
import { useAuthen } from '../../helpers/useAuthen'
import { getTokenSSRAndCSR } from '../../helpers'
import { useRouter } from 'next/router'
import { ROUTER } from '../../constants/commonConstants'
import userService from '../../services/userService'
import postService from './../../services/postService'

type PropsType = {
  userDetailInfo: TypeUser | null
  userDetailPosts: PostType[]
}

const UserDetail: NextPage<PropsType> = ({ userDetailInfo, userDetailPosts }) => {
  useAuthen()
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
      <UserDetailPosts userDetailPosts={userDetailPosts} />
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
