export interface Follow {
  user_id: number
  nickname: string
  avatar: string
  create_time: string
  followed: boolean
}

export interface UserDynamic {
  user: User
  posts: Post[]
}

export interface Post {
  post_id: number
  title: string
  create_time: string
}

export interface User {
  id: number
  nickname: string
  avatar: string
  create_time: string
}
