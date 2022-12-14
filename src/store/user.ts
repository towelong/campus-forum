import { acceptHMRUpdate, defineStore } from 'pinia'
import type { UserInfo } from '~/models/user'

interface UserStore {
  user: UserInfo
  tokens: Tokens
}

interface Tokens {
  access_token: string
  refresh_token: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    tokens: {},
  } as UserStore),
  getters: {
    isExist: state => state.user.id !== undefined,
    accessToken: state => `Bearer ${state.tokens.access_token}`,
    refreshToken: state => `Bearer ${state.tokens.refresh_token}`,
  },
  actions: {
    save(userStore: UserStore) {
      this.$patch({
        user: userStore.user,
        tokens: userStore.tokens,
      })
    },
    saveAccessToken(token: string) {
      this.$state.tokens.access_token = token
    },
    logout() {
      this.$reset()
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
