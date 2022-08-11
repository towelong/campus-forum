import { useFetch } from '~/request'
import { get } from '~/request/axios'
import { useUserStore } from '~/store'

export async function getSectionList(page = 1, count = 10) {
  const user = useUserStore()
  const prefix = '/section'

  const temp = `${prefix}?page=${page - 1}&count=${count}`
  const initurl = user.isExist ? `${temp}&current=${user.user.id}` : temp

  const res = await get(initurl)

  return res
}

export async function getSectionDetail(id: string, page: number, count: number) {
  const res = await get(`/section/${id}?page=${page}&count${count}`)
  return res
}

export function getSectionByPostId(postId: string) {
  const {
    data,
    isFinished, isFetching,
    error, statusCode, execute,
  } = useFetch(`/section/post/${postId}`, { immediate: false }).get().json()
  return { data, isFinished, isFetching, error, statusCode, execute }
}
