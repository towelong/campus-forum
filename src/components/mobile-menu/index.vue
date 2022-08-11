<script setup lang="ts">
import {
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from '@vicons/ionicons5'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import { useUserStore } from '~/store/user.js'

const user = useUserStore()
const router = useRouter()

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}
const options = [
  {
    label: '个人主页',
    key: 'profile',
    icon: renderIcon(UserIcon),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
]

function handleSelect(key: string) {
  switch (key) {
    case 'logout':
      user.logout()
      break
    case 'profile':
      router.push(`/user/${user.user.id}`)
      break
  }
}
</script>
<template>
  <n-dropdown
    v-if="user.isExist"
    :options="options" trigger="click" :show-arrow="true"
    @select="handleSelect"
  >
    <n-button lg:hidden>
      <p i-carbon-menu />
    </n-button>
  </n-dropdown>
</template>
<style scoped>
</style>
