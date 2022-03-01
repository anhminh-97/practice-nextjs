export type TypeCategory = {
  TAG_ID: string
  PID: string
  tag_index: string
  tag_value: string
}

export type PostType = {
  PID: string
  USERID: string
  fullname: string
  profilepicture: string
  url_image: string
  post_content: string
  time_added: string
  status: string
  count: string | null
}

export type CommentType = {
  CID: string
  PID: string
  USERID: string
  fullname: string
  profilepicture: string
  comment: string
  time_added: string
}
