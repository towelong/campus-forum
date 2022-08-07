import type { Ref } from 'vue'
import { useAuthFetch, useFetch } from '~/request'
import type { PostModel } from '~/models/post'

export function getPostDetail(id: string) {
  const page = ref(1)
  const count = ref(5)

  const prefix = `/post/${id}`
  const initurl = `${prefix}?page=${page.value - 1}&count=${count.value}`

  const url = ref(initurl)

  const {
    data,
    isFetching,
    isFinished,
    error,
    execute,
  } = useFetch(url, { refetch: true }).get().json()

  watch(page,
    (value) => {
      const query = `page=${value - 1}`
      url.value = `${prefix}?${query}&count=${count.value}`
    },
  )

  return {
    data,
    execute,
    isFetching,
    isFinished,
    error,
    page,
    count,
  }
}

export function getPostComment(id: string) {
  const { data, isFetching, isFinished, error } = useFetch(`/comment/${id}`).get().json()
  return {
    data,
    isFetching,
    isFinished,
    error,
  }
}

export function createPost(model: Ref<PostModel>) {
  const { data, statusCode, post, execute } = useAuthFetch('/post',
    { immediate: false })
    .post(model.value).json()

  const form = computed(() => model.value)
  watchEffect(() => {
    post(form)
  })

  return {
    data,
    statusCode,
    execute,
  }
}
