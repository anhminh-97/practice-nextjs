import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { PostType } from '../../pages'
import { ROUTER } from '../../constants/commonConstants'

type PropsType = {
  post: PostType
}

dayjs.extend(relativeTime)

const PostItem: React.FC<PropsType> = ({ post }) => {
  return (
    <div className="ass1-section__item">
      <div className="ass1-section">
        <div className="ass1-section__head">
          <Link href={ROUTER.User} as={`/users/${post.USERID}`}>
            <a className="ass1-section__avatar ass1-avatar">
              <Image
                src={post.profilepicture || '/images/avatar-03.png'}
                alt={post.fullname}
                width={38}
                height={38}
              />
            </a>
          </Link>
          <div>
            <Link href={ROUTER.User} as={`/users/${post.USERID}`}>
              <a className="ass1-section__name">{post.fullname}</a>
            </Link>
            <span className="ass1-section__passed">
              {dayjs(post.time_added).locale('vi').fromNow()}
            </span>
          </div>
        </div>
        <div className="ass1-section__content">
          <p>{post.post_content}</p>
          <div className="ass1-section__image">
            <Link href={ROUTER.PostDetail} as={`posts/${post.PID}`}>
              <a>
                <Image src={post.url_image} alt={post.url_image} width={670} height={450} />
              </a>
            </Link>
          </div>
        </div>
        <div className="ass1-section__footer">
          <Link href={ROUTER.PostDetail} as={`posts/${post.PID}`}>
            <a className="ass1-section__btn-comment ass1-btn-icon">
              <i className="icon-Comment_Full" />
              <span>{post.count || 0}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostItem
