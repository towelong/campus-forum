export interface ReplyFormModel {
  comment_id: number
  reply_content: string
  reply_pics?: string[]
  reply_to_user_id?: number
  reply_to_reply_id?: number
}
