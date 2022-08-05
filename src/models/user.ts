export interface User {
  id: number
  nickname: string
  avatar: string
  create_time: string
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  create_time: string
  update_time: string
  delete_time?: string
}
