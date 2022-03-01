import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { PostDetailSidebar } from '../../components/PostDetailSidebar'
import { useAuthen } from '../../helpers/useAuthen'
import postService from '../../services/postService'
import { useGlobalState } from '../../state'
import { PostDetailForm } from './../../components/PostDetailForm'

const initState = {
  url_image: '',
  post_content: '',
  category: [],
  obj_image: {
    file: null,
    base64: '',
  },
}

const Create = () => {
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
          alert(res!.message || "Tạo bài viết thành công")
          setPostData(initState)
        } else alert(res!.error || "Tạo bài viết không thành công")
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

export default Create
