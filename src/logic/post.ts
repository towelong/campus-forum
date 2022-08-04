import { useFetch } from '~/request'

export function getPostDetail(id: string) {
  const { data, isFetching, isFinished, error } = useFetch(`/post/${id}`).get().json()
  return {
    data,
    isFetching,
    isFinished,
    error,
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
