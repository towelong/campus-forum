import type { ReplyFormModel } from '~/models/reply'
import { useAuthFetch, useFetch } from '~/request'

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

export const createReply = () => {
  const replyForm = ref<ReplyFormModel>({
    comment_id: 0,
    reply_content: '',
    reply_pics: [],
    reply_to_user_id: 0,
    reply_to_reply_id: 0,
  })

  const {
    execute,
    data,
    post,
    statusCode,
  } = useAuthFetch('/reply', { immediate: false }).json()

  const form = computed(() => replyForm.value)

  watchEffect(() => {
    post(form)
  })

  return {
    replyExecute: execute,
    replyData: data,
    replyForm,
    replyStatusCode: statusCode,
  }
}
