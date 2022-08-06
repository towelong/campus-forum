import querystring from 'query-string'
import { useAuthFetch, useFetch } from '~/request'
import { useUserStore } from '~/store'

export function getSectionList() {
  const page = ref(0)
  const count = ref(10)
  const initurl = '/section'
  const url = ref(initurl)
  const user = useUserStore()
  let res
  if (user.isExist) {
    url.value = `${initurl}/auth`
    res = useAuthFetch(url, { refetch: true }).get().json()
  }
  else { res = useFetch(url, { refetch: true }).get().json() }
  const { data, error, statusCode, isFetching, isFinished } = res

  watch([page, count],
    (value) => {
      const res = querystring.stringify({ page: value[0], count: value[1] })
      url.value = `${initurl}?${res}`
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
  }
}

export function getSectionDetail(id: string) {
  const { data, isFinished, isFetching, error, statusCode } = useFetch(`/section/${id}`).get().json()
  return { detail: data, isFinished, isFetching, error, statusCode }
}
