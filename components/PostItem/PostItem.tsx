import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { ROUTER } from '../../constants/commonConstants'
import { hightlightText } from '../../helpers'
import { PostType } from '../../types/post'

type PropsType = {
  post?: PostType
  className?: string
  isHightlight?: boolean
  query?: string
  commentPost?: number
  isOwner?: boolean
}

dayjs.extend(relativeTime)

const PostItem: React.FC<PropsType> = ({
  post,
  className,
  isHightlight,
  query,
  commentPost,
  isOwner,
}) => {
  let href = ROUTER.PostDetail
  let asPath = `/posts/${post?.PID}`

  if (isOwner) {
    href += '/edit'
    asPath += '/edit'
  }

  // Function
  const renderFullname = () => {
    if (isHightlight && query) {
      return hightlightText(post?.fullname, query)
    }
    return post?.fullname
  }

  const renderContent = () => {
    if (isHightlight && query) {
      return hightlightText(post?.post_content, query)
    }
    return post?.post_content
  }

  if (!post) return null
  return (
    <>
      {post.PID && (
        <div className={`ass1-section__item ${className && className}`}>
          <div className="ass1-section">
            <div className="ass1-section__head">
              <Link href={ROUTER.User} as={`/users/${post.USERID}`}>
                <a className="ass1-section__avatar ass1-avatar">
                  <Image
                    src={
                      post.profilepicture?.includes('/')
                        ? post.profilepicture
                        : '/images/avatar-03.png'
                    }
                    alt={post.fullname}
                    width={38}
                    height={38}
                  />
                </a>
              </Link>
              <div>
                <Link href={ROUTER.User} as={`/users/${post.USERID}`}>
                  <a
                    className="ass1-section__name"
                    dangerouslySetInnerHTML={{ __html: renderFullname() }}
                  />
                </Link>
                <span className="ass1-section__passed">
                  {dayjs(post.time_added).locale('vi').fromNow()}
                </span>
              </div>
            </div>
            <div className="ass1-section__content">
              <p dangerouslySetInnerHTML={{ __html: renderContent() }} />
              <div className="ass1-section__image">
                <Link href={href} as={asPath}>
                  <a>
                    <Image
                      src={post.url_image?.includes('/') ? post.url_image : '/images/avatar-02.png'}
                      alt={post.url_image}
                      width={670}
                      height={450}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="ass1-section__footer">
              <Link href={href} as={asPath}>
                <a className="ass1-section__btn-comment ass1-btn-icon">
                  <i className="icon-Comment_Full" />
                  <span>{commentPost || 0}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostItem
