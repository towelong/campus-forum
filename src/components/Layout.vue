<script setup lang="ts">
import type { LayoutInst } from 'naive-ui'

import { useUserStore } from '~/store'

const user = useUserStore()
interface Menu {
  name: string
  path: string
  icon: string
}
const initMenus: Menu[] = [
  {
    name: '首页',
    path: '/',
    icon: 'i-carbon-home',
  },
  {
    name: '所有板块',
    path: '/forum',
    icon: 'i-carbon-template',
  },
]

const authMenus = [
  {
    name: '板块收藏',
    path: '/collection',
    icon: 'i-carbon-star',
  },
  {
    name: '关注',
    path: '/follow',
    icon: 'i-carbon-user-favorite',
  },
]

const menus = ref<Menu[]>(initMenus)
watchEffect(() => {
  if (user.isExist)
    menus.value = menus.value.concat(authMenus)
  else
    menus.value = initMenus
})

const showModal = ref(false)
const toggleModal = useToggle(showModal)

const contentRef = ref<LayoutInst | null>(null)
provide('contentRef', contentRef)

</script>
<template>
  <n-layout h-screen>
    <n-layout-header style="height: 64px;" flex flex-col justify-center bordered>
      <div flex items-center justify-between>
        <!-- left  -->
        <div w-55 flex px-2>
          <div flex items-center>
            <p i-carbon-ibm-z-cloud-mod-stack text-2xl />
            <p font-serif ml-2 text-2xl>
              Cloud Shadow
            </p>
          </div>
        </div>
        <!-- right -->
        <div flex flex-1 justify-between px-4>
          <div flex items-center>
            <n-input-group>
              <n-input placeholder="搜索板块、帖子、用户" />
              <n-button type="primary" ghost>
                搜索
              </n-button>
            </n-input-group>
          </div>
          <div flex items-center justify-center>
            <div flex items-center justify-center>
              <p v-if="!user.isExist" mx-6 @click="toggleModal()">
                注册/登录
              </p>
              <p v-else mx-6 flex items-center justify-center>
                <!-- 退出 -->
                <user-info />
              </p>
              <p mx-6>
                帮助中心
              </p>
              <n-modal
                v-model:show="showModal"
                preset="card"
                :auto-focus="false"
                :mask-closable="false"
                style="width: 360px;"
              >
                <login-or-register :toggle="toggleModal" />
              </n-modal>
            </div>
          </div>
        </div>
      </div>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px" has-sider class="bg-[#F4F5F8]">
      <n-layout-sider
        bordered show-trigger collapse-mode="width"
        :native-scrollbar="false" :collapsed-width="16"
        :width="220" mr-4 mb-2
      >
        <router-link v-for="menu in menus" :key="menu.path" :to="menu.path">
          <div flex="~" items-center mx-4 px-1 py-2 my-1 rounded class="hover:bg-[#F4F5F7]">
            <p :class="menu.icon" text-xl />
            <p ml-2>
              {{ menu.name }}
            </p>
          </div>
        </router-link>
      </n-layout-sider>
      <n-layout ref="contentRef" content-style="padding:10px 20px 20px 0;" :native-scrollbar="false" class="bg-[#F4F5F8]">
        <slot />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.router-link-active {
  color: #1A9F58;
}
</style>
