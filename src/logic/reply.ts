import type { ReplyFormModel } from '~/models/reply'
import { useFetch } from '~/request'
import { post } from '~/request/axios'

export function getReplies(id: number) {
  const url = `/reply/${id}`

  const {
    data,
    isFetching,
    isFinished,
    error,
    execute,
  } = useFetch(url, { immediate: false }).get().json()

  return {
    data,
    isFetching,
    isFinished,
    error,
    execute,
  }
}

export const createReply = async(replyForm: ReplyFormModel) => {
  const res = await post('/reply', replyForm)
  return res
}
