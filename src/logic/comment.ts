import type { CommentModel } from '~/models/comments'
import { useAuthFetch } from '~/request'

export function createComment() {
  const comment = ref<CommentModel>({
    post_id: '',
    comment_content: '',
    comment_pics: [],
  })

  const {
    execute,
    data,
    post,
    statusCode,
  } = useAuthFetch('/comment', { immediate: false }).json()

  const form = computed(() => comment.value)

  watchEffect(() => {
    post(form)
  })

  return {
    commentExecute: execute,
    commentData: data,
    comment,
    commentStatusCode: statusCode,
  }
}
