import type { Ref } from 'vue'
import { _delete, get, post } from '~/request/axios'

export async function getMyCollections() {
  const page = ref(1)
  const count = ref(5)

  const prefix = '/section/me'
  const initurl = `${prefix}?page=${page.value - 1}&count=${count.value}`

  const url = ref(initurl)
  const res = await get(url.value)

  return res
}

export async function cancelCollect(sectionId: Ref<number>) {
  const res = await _delete('/section/collection', {
    section_id: sectionId.value,
  })
  return res
}

export async function collect(sectionId: Ref<number>) {
  const res = await post('/section/collection', {
    section_id: sectionId.value,
  })

  return res
}
