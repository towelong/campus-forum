import { get } from '~/request/axios'

export async function getHotSpot() {
  const res = await get('/home/hot')
  return res
}
