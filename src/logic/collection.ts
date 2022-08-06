import type { Ref } from 'vue'
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

export function cancelCollect(sectionId: Ref<number>) {
  const res = useAuthFetch('/section/collection', { immediate: false }).json()
  const {
    data,
    isFetching,
    isFinished,
    error,
    execute,
    statusCode,
  } = res

  watchEffect(() => {
    res.delete({
      section_id: sectionId.value,
    })
  })

  return {
    data,
    execute,
    statusCode,
    isFetching,
    isFinished,
    error,
  }
}

export function collect(sectionId: Ref<number>) {
  const {
    data,
    isFetching,
    isFinished,
    error,
    post,
    execute,
    statusCode,
  } = useAuthFetch('/section/collection', { immediate: false }).json()

  watchEffect(() => {
    post({
      section_id: sectionId.value,
    })
  })

  return {
    data,
    isFetching,
    isFinished,
    error,
    execute,
    statusCode,
  }
}
