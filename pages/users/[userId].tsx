import React from 'react'
import { Container } from 'react-bootstrap'
import { UserDetailPosts } from '../../components/UserDetailPosts'
import { UserDetailInfo } from './../../components/UserDetailInfo'

const userDetail = () => {
  return (
    <Container>
      <UserDetailInfo />
      <UserDetailPosts />
    </Container>
  )
}

export default userDetail
