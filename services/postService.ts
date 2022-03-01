import api from './api'

type ObjImage = {
  file: File | null
  base64: string
}

type TypePostCreate = {
  post_content: string
  url_image: string
  category: string[]
  obj_image: ObjImage
}

const postService = {
  createNewPost: async (
    { post_content, url_image, category, obj_image }: TypePostCreate,
    token: string
  ) => {
    const url = `/post/addNew.php`

    const data = new FormData()
    data.append('post_content', post_content)
    data.append('url_image', url_image)
    data.append('category', category.toString())
    if (obj_image.file) {
      data.append('obj_image', obj_image.file)
    }

    return api.callFormData(url, { data, token })
  },
  getPostPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
    const params = `pagesize=${pagesize}&currPage=${currPage}`
    const url = `/post/getListPagination.php?${params}`
    return api.callJson(url)
  },
  getPostPagingByCategory: async ({ pagesize = 10, currPage = 1, tagIndex = '' } = {}) => {
    if (!tagIndex) return null
    const params = `pagesize=${pagesize}&currPage=${currPage}&tagIndex=${tagIndex}`
    const url = `/post/getListByCategory.php?${params}`
    return api.callJson(url)
  },
  getPostsByUserId: async ({ userid, token }) => {
    if (!userid || !token) {
      return {
        status: 200,
        posts: [],
      }
    }
    const url = `/post/getListPostUserID.php?userid=${userid}`
    return api.callJson(url, { token })
  },
  getPostByPostId: async ({ postid, token }) => {
    if (!postid || !token) {
      return {
        status: 500,
        error: '',
      }
    }
    const url = `/post/post.php?postid=${postid}`
    return api.callJson(url, { token })
  },
  getPostSearch: async ({ query }) => {
    const url = `/post/search.php?query=${encodeURI(query)}`
    return api.callJson(url)
  },
  getCategories: async () => {
    return api.callJson('/categories/index.php')
  },
  getCommentByPostId: async (postid) => {
    return api.callJson(`/comment/comments.php?postid=${postid}`)
  },
  postComment: async (postid: string, comment: string, token: string) => {
    const data = {
      postid,
      comment,
    }
    const method = 'POST'
    return api.callJson('/comment/add_new.php', { data, token, method })
  },
}

export default postService
