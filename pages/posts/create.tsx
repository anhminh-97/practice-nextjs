import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { PostDetailSidebar } from '../../components/PostDetailSidebar'
import { useAuthen } from '../../helpers/useAuthen'
import { PostDetailForm } from './../../components/PostDetailForm'

const Create = () => {
  useAuthen()
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

export default Create
