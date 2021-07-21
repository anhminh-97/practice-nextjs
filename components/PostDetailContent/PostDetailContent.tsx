import React from 'react'
import Image from 'next/image'
import { PostCommentForm } from '../PostCommentForm'
import { PostCommentList } from '../PostCommentList'
import { PostItem } from '../PostItem'

const PostDetailContent = () => {
  return (
    <div className="ass1-section__list">
      {/* <div className="ass1-section">
        <div className="ass1-section__head">
          <a href="#" className="ass1-section__avatar ass1-avatar">
            <Image src="/images/avatar-02.png" alt="" width={38} height={38} />
          </a>
          <div>
            <a href="#" className="ass1-section__name">
              Nguyễn Chính 9
            </a>
            <span className="ass1-section__passed">2 giờ trước</span>
          </div>
          <a href="#" className="ass1-section__link ass1-btn-icon">
            <i className="icon-Link" />
          </a>
        </div>
        <div className="ass1-section__content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas voluptates magnam,
            odit quae aut vel accusantium. Alias pariatur quidem, minus eaque officiis, sed ea
            repellendus tenetur ipsa inventore est earum.
          </p>
          <div className="ass1-section__image">
            <a href="#">
              <Image src="/images/microphone-1209816_1920.jpg" alt="" width={670} height={450} />
            </a>
          </div>
        </div>
        <div className="ass1-section__footer">
          <a href="#" className="ass1-section__btn-upvote ass1-btn-icon">
            <i className="icon-Upvote" />
          </a>
          <a href="#" className="ass1-section__btn-downvote ass1-btn-icon">
            <i className="icon-Downvote" />
          </a>
          <a href="#" className="ass1-section__btn-like ass1-btn-icon">
            <i className="icon-Favorite_Full" />
            <span>1,274</span>
          </a>
          <a href="#" className="ass1-section__btn-comment ass1-btn-icon">
            <i className="icon-Comment_Full" />
            <span>982</span>
          </a>
        </div>
        <div className="ass1-section__feeling">
          <div className="ass1-feeling">
            <a href="#" rel="tooltip" data-original-title="Happy">
              <Image src="/fonts/emotion/svg/Happy.svg" alt="" width={44} height={44} />
              <span>126</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Lol">
              <Image src="/fonts/emotion/svg/LOL.svg" alt="" width={44} height={44} />
              <span>256</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Surprised">
              <Image src="/fonts/emotion/svg/Surprised.svg" alt="" width={44} height={44} />
              <span>741</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Sad">
              <Image src="/fonts/emotion/svg/Sad.svg" alt="" width={44} height={44} />
              <span>2K</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Tongue Out">
              <Image src="/fonts/emotion/svg/Tongue_Out.svg" alt="" width={44} height={44} />
              <span>245</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="No words">
              <Image src="/fonts/emotion/svg/No_words.svg" alt="" width={44} height={44} />
              <span>237</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Love">
              <Image src="/fonts/emotion/svg/Love.svg" alt="" width={44} height={44} />
              <span>1,236</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Blushing">
              <Image src="/fonts/emotion/svg/Blushing.svg" alt="" width={44} height={44} />
              <span>365</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Cool">
              <Image src="/fonts/emotion/svg/Cool.svg" alt="" width={44} height={44} />
              <span>412</span>
            </a>
            <a href="#" rel="tooltip" data-original-title="Angry">
              <Image src="/fonts/emotion/svg/Angry.svg" alt="" width={44} height={44} />
              <span>478</span>
            </a>
          </div>
        </div>
      </div> */}
      {/* {listPosts.map((post) => (
        <PostItem key={post.PID} post={post} />
      ))} */}
      <PostCommentForm />
      <PostCommentList />
    </div>
  )
}

export default PostDetailContent
