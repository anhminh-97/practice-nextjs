import React, { useState } from 'react'
import cookie from 'cookie'
import postService from '../../../services/postService'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Container, Row, Col } from 'react-bootstrap'
import { PostDetailSidebar } from '../../../components/PostDetailSidebar'
import { useAuthen } from '../../../helpers/useAuthen'
import { useGlobalState } from '../../../state'
import { PostDetailForm } from './../../../components/PostDetailForm'
import { PostType } from '../../../types/post'
import { parseJwt } from '../../../helpers'

const initState = {
  url_image: '',
  post_content: '',
  category: [],
  obj_image: {
    file: null,
    base64: '',
  },
}

type PostEditDataProps = {
    postDetailData: PostType
}

const PostEdit = () => {
  useAuthen()

  // State
  const [postData, setPostData] = useState(initState)
  const [token] = useGlobalState('token')
  const [loading, setLoading] = useState(false)

  // Function
  const onChangeDetailForm = (key: string, value: any) => {
    setPostData({ ...postData, [key]: value })
  }

  const handleSubmitPost = () => {
    if (loading) return
    setLoading(true)
    postService
      .createNewPost(postData, token)
      .then((res) => {
        if (res.status === 200) {
          alert(res!.message || 'Tạo bài viết thành công')
          setPostData(initState)
        } else alert(res!.error || 'Tạo bài viết không thành công')
      })
      .finally(() => setLoading(false))
  }

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <PostDetailForm
            onChangeDetailForm={onChangeDetailForm}
            url_image={postData.url_image}
            post_content={postData.post_content}
            obj_image={postData.obj_image}
          />
        </Col>
        <Col lg={4}>
          <PostDetailSidebar
            loading={loading}
            handleSubmitPost={handleSubmitPost}
            category={postData.category}
            onChangeDetailForm={onChangeDetailForm}
          />
        </Col>
      </Row>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<PostEditDataProps> = async (context) => {
  const cookieStr = context.req.headers.cookie || ''
  const token = cookie.parse(cookieStr).token
  const userid = parseJwt(token)?.id
  const postid = context.query.postId as string

  const userPostPos = postService.getPostsByUserId({ token, userid })
  const postDetailPos = postService.getPostByPostId({ postid, token })
  const commentsPos = postService.getCommentByPostId(postid)

  const [postDetail] = await Promise.all([postDetailPos])

  const postUserId = postDetail?.data?.post?.USERID || ''

  let postDetailData = null
  if (postDetail?.data?.post) {
    postDetailData = {
      ...postDetail?.data?.post,
      // fullname: userInfoData?.user?.fullname || '',
      // profilepicture: userInfoData?.user?.profilepicture || '/images/avatar-03.png',
    }
  }

  const props = {
    postDetailData,
    // comments: commentsRes?.comments || [],
    postCategories: postDetail?.data?.categories || [],
    // userPosts: userPostRes?.posts || [],
  }

  return {
    props,
  }
}

export default PostEdit
