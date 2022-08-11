export interface Post {
  post_id: number
  title: string
  create_time: string
}

export interface Hot {
  post_id: number
  total: number
  post: Post
}
