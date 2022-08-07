<script setup lang="ts">
import {
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
} from '@vicons/ionicons5'
import type { Component } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { useUserStore } from '~/store/user.js'

const user = useUserStore()
const message = useMessage()
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
    case 'edit':
      message.info('编辑用户')
      break
    case 'profile':
      router.push(`/user/${user.user.id}`)
      break
  }
}

</script>
<template>
  <n-dropdown
    :options="options" trigger="click" :show-arrow="true"
    @select="handleSelect"
  >
    <!-- <n-button>用户资料</n-button> -->
    <n-avatar
      round
      :size="38"
      :src="user.user.avatar"
      cursor-pointer
    />
  </n-dropdown>
</template>
<style scoped>
</style>
