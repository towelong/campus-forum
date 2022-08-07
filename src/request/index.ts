import { createFetch } from '@vueuse/core'
import { useMessage } from 'naive-ui'
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
      const router = useRouter()
      const message = useMessage()
      if (ctx.response?.status === 401) {
        message.error('用户登录状态失效')
        user.logout()
        router.push('/')
      }

      return ctx
    },
  },
})

export const useFetch = createFetch({
  baseUrl: apiBaseUrl,
})
