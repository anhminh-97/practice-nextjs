import React from 'react'
import cookie from 'cookie'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Container, Row, Col } from 'react-bootstrap'
import { HomeSidebar } from '../../../components/HomeSidebar'
import { PostDetailContent } from '../../../components/PostDetailContent'
import { parseJwt } from '../../../helpers'
import postService from '../../../services/postService'
import { CommentType, PostType, TypeCategory } from '../../../types/post'
import userService from '../../../services/userService'

type PostDetailDataProps = {
  postDetailData: PostType
  userPosts: PostType[]
  postCategories: TypeCategory[]
  comments: CommentType[]
}

type PostDetailProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

const PostDetail: PostDetailProps = ({ userPosts, postDetailData, postCategories, comments }) => {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <PostDetailContent
            listComments={comments}
            postDetailData={postDetailData}
            postCategories={postCategories}
          />
        </Col>
        <Col lg={4}>
          <HomeSidebar userPosts={userPosts} />
        </Col>
      </Row>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<PostDetailDataProps> = async (context) => {
  const cookieStr = context.req.headers.cookie || ''
  const token = cookie.parse(cookieStr).token
  const userid = parseJwt(token)?.id
  const postid = context.query.postId as string

  const userPostPos = postService.getPostsByUserId({ token, userid })
  const postDetailPos = postService.getPostByPostId({ postid, token })
  const commentsPos = postService.getCommentByPostId(postid)

  const [userPostRes, postDetail, commentsRes] = await Promise.all([
    userPostPos,
    postDetailPos,
    commentsPos,
  ])

  const postUserId = postDetail?.data?.post?.USERID || ''
  const userInfoData = await userService.getUserById(postUserId)

  let postDetailData = null
  if (postDetail?.data?.post) {
    postDetailData = {
      ...postDetail?.data?.post,
      fullname: userInfoData?.user?.fullname || '',
      profilepicture: userInfoData?.user?.profilepicture || '/images/avatar-03.png',
    }
  }

  const props = {
    postDetailData,
    comments: commentsRes?.comments || [],
    postCategories: postDetail?.data?.categories || [],
    userPosts: userPostRes?.posts || [],
  }

  return {
    props,
  }
}

export default PostDetail
