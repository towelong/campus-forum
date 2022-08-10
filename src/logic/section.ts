import { useFetch } from '~/request'
import { useUserStore } from '~/store'

export function getSectionList() {
  const user = useUserStore()
  const page = ref(1)
  const count = ref(10)
  const prefix = '/section'

  const temp = `${prefix}?page=${page.value - 1}&count=${count.value}`
  const initurl = user.isExist ? `${temp}&current=${user.user.id}` : temp
  const url = ref(initurl)

  const res = useFetch(url, { refetch: true }).get().json()
  const { data, error, statusCode, isFetching, isFinished, execute } = res

  watch(page,
    (value) => {
      const query = user.isExist
        ? `page=${value - 1}&current=${user.user.id}`
        : `page=${value - 1}`
      url.value = `${prefix}?${query}&count=${count.value}`
    },
  )

  return {
    data,
    error,
    statusCode,
    page,
    count,
    isFetching,
    isFinished,
    execute,
  }
}

export function getSectionDetail(id: string) {
  const { data, isFinished, isFetching, error, statusCode } = useFetch(`/section/${id}`).get().json()
  return { detail: data, isFinished, isFetching, error, statusCode }
}

export function getSectionByPostId(postId: string) {
  const {
    data,
    isFinished, isFetching,
    error, statusCode, execute,
  } = useFetch(`/section/post/${postId}`, { immediate: false }).get().json()
  return { data, isFinished, isFetching, error, statusCode, execute }
}
