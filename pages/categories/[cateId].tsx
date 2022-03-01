import React, { useEffect, useMemo } from 'react'
import Masonry from 'react-masonry-component'
import { useRouter } from 'next/router'
import { NextPage, NextPageContext } from 'next'
import { Container } from 'react-bootstrap'
import { ROUTER } from '../../constants/commonConstants'
import { PostItem } from '../../components/PostItem'
import { useGlobalState } from '../../state'
import { PostType } from '../../types/post'
import postService from '../../services/postService'

type PropsType = {
  listPosts: PostType[]
}

const CategoriesDetail: NextPage<PropsType> = ({ listPosts }) => {
  const router = useRouter()
  const [categories] = useGlobalState('categories')

  const categoryId = router.query.cateId || null

  useEffect(() => {
    if (!categoryId) {
      router.push(ROUTER.Home)
    }
  }, [categoryId, router])

  const findText = useMemo(() => {
    const findObj = categories.find((cate) => cate.id === Number(categoryId))
    return findObj?.text || ''
  }, [categories, categoryId])

  return (
    <Container>
      <div className="header-search my-5">
        <h3>
          Danh mục tìm kiếm: <strong>{findText}</strong>
        </h3>
        <p>Tìm kiếm được ({listPosts.length}) kết quả</p>
      </div>
      <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
        {listPosts.map((post) => (
          <PostItem key={post.PID} post={post} className="col-lg-6" />
        ))}
      </Masonry>
    </Container>
  )
}

CategoriesDetail.getInitialProps = async (ctx: NextPageContext) => {
  const tagIndex = ctx.query.cateId as string
  const listPostsRes = await postService.getPostPagingByCategory({ tagIndex })
  return {
    listPosts: listPostsRes?.posts || [],
  }
}

export default CategoriesDetail
