import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TypeUser, useGlobalState } from '../../state'
import { ROUTER } from './../../constants/commonConstants'

type PropsType = {
  userDetailInfo: TypeUser | null
  postCount: number
}

const UserDetailInfo: React.FC<PropsType> = ({ userDetailInfo, postCount }) => {
  const [currentUser] = useGlobalState('currentUser')
  if (!userDetailInfo) return null
  return (
    <div className="ass1-head-user">
      <div className="ass1-head-user__content">
        <div className="ass1-head-user__image">
          <Image
            src={userDetailInfo.profilepicture || '/images/cat-1634369_1920.jpg'}
            alt={userDetailInfo.fullname}
            width={172}
            height={172}
          />
        </div>
        <div className="ass1-head-user__info">
          <div className="ass1-head-user__info-head">
            <div className="ass1-head-user__name">
              <span>{userDetailInfo.fullname}</span>
              <i>
                <Image src="/fonts/emotion/svg/Verified.svg" alt="" width={16} height={16} />
              </i>
            </div>
            <div className="w-100" />
            {userDetailInfo.USERID !== currentUser?.USERID ? (
              <Link href="#">
                <a className="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>
              </Link>
            ) : (
              <>
                <Link href={ROUTER.Password}>
                  <a className="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</a>
                </Link>
                <Link href={ROUTER.Profile}>
                  <a className="ass1-head-user__btn-follow ass1-btn">Profile</a>
                </Link>
              </>
            )}
          </div>
          <div className="ass1-head-user__info-statistic">
            <div className="ass1-btn-icon">
              <i className="icon-Post" />
              <span>Bài viết: {postCount}</span>
            </div>
            <div className="ass1-btn-icon">
              <i className="icon-Followers" />
              <span>Theo dõi: {userDetailInfo.yourviewed}</span>
            </div>
            <div className="ass1-btn-icon">
              <i className="icon-Following" />
              <span>Đang theo dõi: {userDetailInfo.youviewed}</span>
            </div>
            {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
          </div>
          <p>{userDetailInfo.description}</p>
        </div>
      </div>
    </div>
  )
}

export default UserDetailInfo
