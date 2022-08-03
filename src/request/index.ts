import { createFetch } from '@vueuse/core'
import { apiBaseUrl } from '~/composables'
import { useUserStore } from '~/store'

const user = useUserStore()

export const useAuthFetch = createFetch({
  baseUrl: apiBaseUrl,
  options: {
    beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${user.token}`,
      }
      return { options }
    },
    onFetchError(ctx) {
      if (ctx.data.code === 401)
        user.logout()
      return ctx
    },
  },
})

export const useFetch = createFetch({
  baseUrl: apiBaseUrl,
})
