import api from './api'

const postService = {
  getPostPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
    const params = `pagesize=${pagesize}&currPage=${currPage}`
    const url = `/post/getListPagination.php?${params}`
    return api.callJson(url)
  },
  getPostsByUserId: async ({ userid, token }) => {
    const url = `/post/getListPostUserID.php?userid=${userid}`
    return api.callJson(url, { token })
  },
  getPostSearch: async ({ query }) => {
    const url = `/post/search.php?query=${encodeURI(query)}`
    return api.callJson(url)
  },
}

export default postService
