import { useAuthFetch } from '~/request'

export function getMyCollections() {
  const page = ref(1)
  const count = ref(5)

  const prefix = '/section/me'
  const initurl = `${prefix}?page=${page.value - 1}&count=${count.value}`

  const url = ref(initurl)

  const {
    data,
    isFetching,
    isFinished,
    error,
    execute,
  } = useAuthFetch(url, { refetch: true }).get().json()

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
