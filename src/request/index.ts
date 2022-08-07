import { createFetch } from '@vueuse/core'
import { apiBaseUrl } from '~/composables'
import { useUserStore } from '~/store'

// const user = useUserStore()

export const useAuthFetch = createFetch({
  baseUrl: apiBaseUrl,
  options: {
    beforeFetch({ options }) {
      const user = useUserStore()
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${user.tokens.access_token}`,
      }
      return { options }
    },
    onFetchError(ctx) {
      const user = useUserStore()
      if (ctx.response?.status === 401)
        user.logout()
      return ctx
    },
  },
})

export const useFetch = createFetch({
  baseUrl: apiBaseUrl,
})
