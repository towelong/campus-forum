import { useAuthFetch, useFetch } from '~/request'
import { useUserStore } from '~/store'

export function getSectionList() {
  const user = useUserStore()
  const page = ref(1)
  const count = ref(10)
  let prefix = '/section'
  if (user.isExist)
    prefix = `${prefix}/auth`
  const initurl = `${prefix}?page=${page.value - 1}&count=${count.value}`
  const url = ref(initurl)

  let res
  if (user.isExist) {
    url.value = initurl
    res = useAuthFetch(url, { refetch: true }).get().json()
  }
  else { res = useFetch(url, { refetch: true }).get().json() }
  const { data, error, statusCode, isFetching, isFinished, execute } = res

  watch(page,
    (value) => {
      const query = `page=${value - 1}`
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
