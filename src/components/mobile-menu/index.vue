<script setup lang="ts">
import {
  AppsSharp,
  HomeOutline,
  LogOutOutline as LogoutIcon,
  PeopleOutline,
  StarOutline,
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
    label: '首页',
    key: 'home',
    icon: renderIcon(HomeOutline),
  },
  {
    label: '所有板块',
    key: 'section',
    icon: renderIcon(AppsSharp),
  },
  {
    label: '板块收藏',
    key: 'collect',
    icon: renderIcon(StarOutline),
  },
  {
    label: '我的关注',
    key: 'follow',
    icon: renderIcon(PeopleOutline),
  },
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
    case 'home':
      router.push('/')
      break
    case 'section':
      router.push('/forum')
      break
    case 'collect':
      router.push('/collection')
      break
    case 'follow':
      router.push('/follow')
      break
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
