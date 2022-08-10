export interface Follow {
  user_id: number
  nickname: string
  avatar: string
  create_time: string
  followed: boolean
}

export interface UserDynamic {
  user_id: number
  nickname: string
  avatar: string
  post_id: number
  title: string
  create_time: string
}
