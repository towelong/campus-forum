import { acceptHMRUpdate, defineStore } from 'pinia'

interface UserStore {
  userInfo: UserInfo
  token: string
}

interface UserInfo {
  id: number
  nickname: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    token: '',
  } as UserStore),
  actions: {
    save(user: UserStore) {
      this.$patch({
        userInfo: user.userInfo,
        token: user.token,
      })
    },
    logout() {
      this.$reset()
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
