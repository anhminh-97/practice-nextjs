import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { CommentType } from '../../types/post'
import { ROUTER } from './../../constants/commonConstants'

type PropsType = {
  listComments: CommentType[]
}

dayjs.extend(relativeTime)

const PostCommentList: React.FC<PropsType> = ({ listComments }) => {
  return (
    <div className="ass1-comments">
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">{listComments.length} Bình luận</div>
        <div className="ass1-comments__options">
          <span>Sắp xếp theo:</span>
          <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon">
            <i className="icon-Upvote" />
          </a>
          <a href="#" className="ass1-comments__btn-down ass1-btn-icon">
            <i className="icon-Downvote" />
          </a>
          <a href="#" className="ass1-comments__btn-expand ass1-btn-icon">
            <i className="icon-Expand_all" />
          </a>
        </div>
      </div>
      {/*comment*/}
      {listComments.map((comment) => (
        <div className="ass1-comments__section" key={comment.CID}>
          <Link href={ROUTER.User} as={`/users/${comment.USERID}`}>
            <a className="ass1-comments__avatar ass1-avatar">
              <Image
                src={comment.profilepicture || '/images/avatar-02.png'}
                alt="avatar"
                width={38}
                height={38}
              />
            </a>
          </Link>
          <div className="ass1-comments__content">
            <Link href={ROUTER.User} as={`/users/${comment.USERID}`}>
              <a className="ass1-comments__name">{comment.fullname}</a>
            </Link>
            <span className="ass1-comments__passed">
              {dayjs(comment.time_added).locale('vi').fromNow()}
            </span>
            <p>{comment.comment}</p>
            <div className="ass1-comments__info">
              <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon">
                <i className="icon-Upvote" />
                <span>901</span>
              </a>
              <a href="#" className="ass1-comments__btn-down ass1-btn-icon">
                <i className="icon-Downvote" />
                <span>36</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostCommentList
