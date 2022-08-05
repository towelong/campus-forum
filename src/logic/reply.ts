import { useFetch } from '~/request'

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
