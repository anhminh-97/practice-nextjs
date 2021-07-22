import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTER } from '../../constants/commonConstants'

const HeaderSearch = () => {
  const router = useRouter()
  const [searchData, setSearchData] = useState('')

  const handleSearch = (e: any) => {
    setSearchData(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (searchData) router.push(`/search?q=${searchData}`)
  }

  return (
    <div className="ass1-header__search">
      <form action="#" onSubmit={handleSubmit}>
        <label>
          <input
            type="search"
            value={searchData}
            className="form-control"
            placeholder="Nhập từ khóa ..."
            onChange={handleSearch}
          />
          <i className="icon-Search" />
        </label>
      </form>
    </div>
  )
}

export default HeaderSearch
