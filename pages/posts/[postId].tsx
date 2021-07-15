import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { HomeSidebar } from './../../components/HomeSidebar'
import { PostDetailContent } from './../../components/PostDetailContent'

const postDetail = () => {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <PostDetailContent />
        </Col>
        <Col lg={4}>
          <HomeSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default postDetail
