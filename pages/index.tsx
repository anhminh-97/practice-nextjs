import React, { useEffect } from 'react'
import cookie from 'cookie'
import { Container, Row, Col } from 'react-bootstrap'

import { HomeSidebar } from '../components/HomeSidebar'
import { PostListItem } from '../components/PostListItem'
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from 'next'
import postService from '../services/postService'
import { getTokenSSRAndCSR, parseJwt } from '../helpers'

export type PostType = {
  PID: string
  USERID: string
  fullname: string
  profilepicture: string
  url_image: string
  post_content: string
  time_added: string
  status: string
  count: string | null
}

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
          <button className="load-more ass1-btn">
            <span>Xem thêm</span>
          </button>
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
  const userid = parseJwt(token).id

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
