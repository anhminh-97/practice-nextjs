import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { PostDetailSidebar } from '../../components/PostDetailSidebar'
import { PostDetailForm } from './../../components/PostDetailForm'

const create = () => {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <PostDetailForm />
        </Col>
        <Col lg={4}>
          <PostDetailSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default create
