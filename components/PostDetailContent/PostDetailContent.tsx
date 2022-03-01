import React, { useState } from 'react'
import Link from 'next/link'
import { PostCommentForm } from '../PostCommentForm'
import { PostCommentList } from '../PostCommentList'
import { PostItem } from '../PostItem'
import { CommentType, PostType, TypeCategory } from '../../types/post'
import { ROUTER } from './../../constants/commonConstants'
import { useRouter } from 'next/router'
import { useGlobalState } from '../../state'

import classes from './PostDetailContent.module.css'
import postService from '../../services/postService'

type PropsType = {
  postDetailData: PostType
  postCategories: TypeCategory[]
  listComments: CommentType[]
}

const PostDetailContent: React.FC<PropsType> = ({
  postDetailData,
  postCategories,
  listComments: initComments,
}) => {
  const router = useRouter()
  const [listComments, setListComments] = useState(initComments)
  const [token] = useGlobalState('token')
  const postId = router.query.postId as string

  // Function
  const handleSubmitForm = async (commentValue: string, callback: (e?: Error) => void) => {
    try {
      const result = await postService.postComment(postId, commentValue, token)
      if (result.status !== 200) throw new Error('Đăng bình luận không thành công!')

      const listCmtRes = await postService.getCommentByPostId(postId)

      if (result.status === 200) {
        setListComments(listCmtRes.comments)
        callback()
      }
    } catch (e) {
      callback(e)
    }

    // postService
    //     .postComment(postId, commentValue, token)
    //     .then(async (res) => {
    //         if(res.status === 200) {
    //             const commentsPos = await postService.getCommentByPostId(postId);
    //         } else {
    //             // Bao Loi
    //         }
    //     })
  }

  return (
    <div className="ass1-section__list">
      <div className={classes['ass1-section__list']}>
        <PostItem commentPost={listComments.length} post={postDetailData} />
        <div className={classes['list-categories']}>
          <h5>
            <strong>Danh mục: </strong>
          </h5>
          <ul>
            {postCategories.map((obj) => {
              return (
                <li key={obj.TAG_ID}>
                  <Link href={ROUTER.Categories} as={`/categories/${obj.tag_index}`}>
                    {obj.tag_value}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <PostCommentForm handleSubmitForm={handleSubmitForm} />
      <PostCommentList listComments={listComments} />
    </div>
  )
}

export default PostDetailContent
