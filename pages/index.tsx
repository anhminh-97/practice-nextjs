import React from 'react'
import cookie from 'cookie'
import { Container, Row, Col } from 'react-bootstrap'

import { HomeSidebar } from '../components/HomeSidebar'
import { PostListItem } from '../components/PostListItem'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import postService from '../services/postService'
import { parseJwt } from '../helpers'
import { PostType } from '../types/post'

type HomeDataProps = {
  listPosts: PostType[]
  userPosts: PostType[]
}

type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

const Home: HomeProps = ({ listPosts, userPosts }) => {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <PostListItem listPosts={listPosts} />
        </Col>
        <Col lg={4}>
          <HomeSidebar userPosts={userPosts} />
        </Col>

      </Row>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (context) => {
  const cookieStr = context.req.headers.cookie || ''
  const token = cookie.parse(cookieStr).token
  const userid = parseJwt(token)?.id

  const listPostPos = postService.getPostPaging()
  const userPostPos = postService.getPostsByUserId({ token, userid })

  const [listPostRes, userPostRes] = await Promise.all([listPostPos, userPostPos])

  const props = {
    listPosts: listPostRes?.posts || [],
    userPosts: userPostRes?.posts || [],
  }

  return {
    props,
  }
}

export default Home
