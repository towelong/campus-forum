export interface CommentInfo {
  comment_id: number
  comment_content: string
  user_id: number
  post_id: number
  comment_pics: string[]
  digg_count: number
  reply_count: number
  is_author: boolean
  create_time: string
}

export interface UserInfo {
  id: number
  nickname: string
  avatar: string
  create_time: string
}

export interface ReplyInfo2 {
  reply_id: number
  reply_content: string
  comment_id: number
  user_id: number
  reply_to_user_id: number
  reply_to_reply_id: number
  reply_pics: string[]
  digg_count: number
  is_author: boolean
  create_time: string
  delete_time?: string
}

export interface ReplyUser {
  id: number
  nickname: string
  avatar: string
  create_time: string
}

export interface UserInfo2 {
  id: number
  nickname: string
  avatar: string
  create_time: Date
}

export interface ParentReply {
  reply_id: number
  reply_content: string
  comment_id: number
  user_id: number
  reply_to_user_id: number
  reply_to_reply_id: number
  reply_pics: string[]
  digg_count: number
  is_author: boolean
  create_time: string
  delete_time?: string
}

export interface ReplyInfo {
  reply_id: number
  reply_info: ReplyInfo2
  reply_user: ReplyUser
  user_info: UserInfo2
  is_author: boolean
  parent_reply: ParentReply
}

export interface Comment {
  comment_id: number
  comment_info: CommentInfo
  user_info: UserInfo
  reply_infos: ReplyInfo[]
  is_author: boolean
}
