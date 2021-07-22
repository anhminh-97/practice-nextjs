import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTER } from '../constants/commonConstants'
import { NextPage, NextPageContext } from 'next'
import { PostType } from '.'
import postService from '../services/postService'
import Masonry from 'react-masonry-component'
import PostItem from './../components/PostItem/PostItem'
import { Container } from 'react-bootstrap'

type PropsType = {
  listPosts: PostType[]
}

const SearchPage: NextPage<PropsType> = ({ listPosts }) => {
  const router = useRouter()
  const SearchStr = (router.query.q || '') as string
  useEffect(() => {
    if (!SearchStr) {
      router.push(ROUTER.Home)
    }
  }, [SearchStr, router])

  return (
    <Container>
      <div className="header-search my-5">
        <h3>
          Từ khóa tìm kiếm: <strong>{SearchStr}</strong>
        </h3>
        <p>Tìm kiếm được ({listPosts.length}) kết quả</p>
      </div>
      <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
        {listPosts.map((post) => (
          <PostItem
            key={post.PID}
            isHightlight={true}
            query={SearchStr}
            post={post}
            className="col-lg-6"
          />
        ))}
      </Masonry>
    </Container>
  )
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const query = ctx.query.q || ''
  const listPostsRes = await postService.getPostSearch({ query })
  return {
    listPosts: listPostsRes?.posts || [],
  }
}

export default SearchPage
