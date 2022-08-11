import { get } from '~/request/axios'

export async function getHotSpot() {
  const res = await get('/home/hot')
  return res
}

export async function getSectionPostBySectionId(sectionId: number) {
  const res = await get(`/home/section/${sectionId}`)
  return res
}
