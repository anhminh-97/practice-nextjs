import React from 'react'
import Link from 'next/link'
import { ROUTER } from '../../constants/commonConstants'
import { useGlobalState } from '../../state'

const HeaderMenu = () => {
  const [categories] = useGlobalState('categories')
  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <Link href="#">
            <a>Danh mục</a>
          </Link>
          <div className="ass1-header__nav">
            <div className="container">
              <ul>
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Link href={ROUTER.Categories} as={`/categories/${category.id}`}>
                      <a>{category.text}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ass1-header__menu-transition" />
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderMenu
