import type { CommentModel } from '~/models/comments'
import { post } from '~/request/axios'

export async function createComment(comment: CommentModel) {
  const res = await post('/comment', comment)
  return res
}
