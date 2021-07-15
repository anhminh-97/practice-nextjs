import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { HomeSidebar } from '../components/HomeSidebar'
import { PostListItem } from '../components/PostListItem'

const Home = () => {
  return (
    <Container>
      <Row>
        <Col lg={8}>
          <PostListItem />
          <button className="load-more ass1-btn">
            <span>Xem thêm</span>
          </button>
        </Col>
        <Col lg={4}>
          <HomeSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
