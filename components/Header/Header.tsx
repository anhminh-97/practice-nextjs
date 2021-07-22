import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Cookies from 'js-cookie'

import { useRouter } from 'next/router'

import classes from './header.module.css'
import { useGlobalState } from '../../state'
import { ROUTER } from '../../constants/commonConstants'
import HeaderSearch from './HeaderSearch'

const Header = () => {
  const router = useRouter()
  // state
  const [userInfo, setUserInfo] = useGlobalState('currentUser')
  const [, setToken] = useGlobalState('token')

  // Function
  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có muốn đăng xuất không ?')
    if (confirmLogout) {
      Cookies.remove('token')
      setUserInfo(null)
      setToken('')
      router.push(ROUTER.Login)
    }
  }

  return (
    <header>
      <div className="ass1-header">
        <div className="container">
          <a href={ROUTER.Home} className="ass1-logo">
            Meme App
          </a>
          <nav>
            <ul className="ass1-header__menu">
              <li>
                <a href="#">Danh mục</a>
                <div className="ass1-header__nav" style={{ display: 'none' }}>
                  <div className="container">
                    <ul>
                      <li>
                        <a href="index.html">Funny</a>
                      </li>
                      <li>
                        <a href="index.html">Animals</a>
                      </li>
                      <li>
                        <a href="index.html">Anime &amp; Mâng</a>
                      </li>
                      <li>
                        <a href="index.html">Awesome</a>
                      </li>
                      <li>
                        <a href="index.html">Basketball</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="index.html">Car</a>
                      </li>
                      <li>
                        <a href="index.html">Comic</a>
                      </li>
                      <li>
                        <a href="index.html">Cosplay</a>
                      </li>
                      <li>
                        <a href="index.html">Countryballs</a>
                      </li>
                      <li>
                        <a href="index.html">Classical Art Memes</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="index.html">Girl</a>
                      </li>
                      <li>
                        <a href="index.html">History</a>
                      </li>
                      <li>
                        <a href="index.html">K-POP</a>
                      </li>
                      <li>
                        <a href="index.html">V-POP</a>
                      </li>
                      <li>
                        <a href="index.html">Pokémon</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="index.html">School</a>
                      </li>
                      <li>
                        <a href="index.html">Star war</a>
                      </li>
                      <li>
                        <a href="index.html">Coder</a>
                      </li>
                      <li>
                        <a href="index.html">Travel</a>
                      </li>
                      <li>
                        <a href="index.html">Sport</a>
                      </li>
                    </ul>
                  </div>
                  <div className="ass1-header__menu-transition" />
                </div>
              </li>
              <li className="active">
                <a href="index.html">Hot</a>
                <div className="ass1-header__nav" style={{ display: 'none' }}>
                  <div className="container">
                    <ul>
                      <li>
                        <a href="index.html">Funny</a>
                      </li>
                      <li>
                        <a href="index.html">Animals</a>
                      </li>
                      <li>
                        <a href="index.html">Anime &amp; Mâng</a>
                      </li>
                      <li>
                        <a href="index.html">Awesome</a>
                      </li>
                      <li>
                        <a href="index.html">Basketball</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="index.html">Car</a>
                      </li>
                      <li>
                        <a href="index.html">Comic</a>
                      </li>
                      <li>
                        <a href="index.html">Cosplay</a>
                      </li>
                      <li>
                        <a href="index.html">Countryballs</a>
                      </li>
                      <li>
                        <a href="index.html">Classical Art Memes</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="index.html">Girl</a>
                      </li>
                      <li>
                        <a href="index.html">History</a>
                      </li>
                      <li>
                        <a href="index.html">K-POP</a>
                      </li>
                      <li>
                        <a href="index.html">V-POP</a>
                      </li>
                      <li>
                        <a href="index.html">Pokémon</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="index.html">School</a>
                      </li>
                      <li>
                        <a href="index.html">Star war</a>
                      </li>
                      <li>
                        <a href="index.html">Coder</a>
                      </li>
                      <li>
                        <a href="index.html">Travel</a>
                      </li>
                      <li>
                        <a href="index.html">Sport</a>
                      </li>
                    </ul>
                  </div>
                  <div className="ass1-header__menu-transition" />
                </div>
              </li>
            </ul>
          </nav>
          <HeaderSearch />
          <Link href={ROUTER.Create}>
            <a className="ass1-header__btn-upload ass1-btn">
              <i className="icon-Upvote" /> Upload
            </a>
          </Link>

          {userInfo ? (
            <div className={classes['wrapper-user']}>
              <Link href={ROUTER.User} as={`/users/${userInfo.USERID}`}>
                <a className={classes['user-header']}>
                  <span className={classes.avatar}>
                    <Image
                      src={userInfo.profilepicture || '/images/avatar-03.png'}
                      alt="avatar"
                      width={35}
                      height={35}
                    />
                  </span>
                  <span className={classes.email}>{userInfo.email}</span>
                </a>
              </Link>
              <div onClick={handleLogout} className={classes.logout}>
                Logout
              </div>
            </div>
          ) : (
            <Link href={ROUTER.Login}>
              <a className="ass1-header__btn-upload ass1-btn">Login</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
