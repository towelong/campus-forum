<script setup lang="ts">
// const router = useRouter()
interface Menu {
  name: string
  path: string
  icon: string
}
const menus: Menu[] = [
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
</script>
<template>
  <n-layout h-screen>
    <n-layout-header style="height: 64px;" flex flex-col justify-center bordered>
      <div flex items-center justify-center px-6>
        <n-grid x-gap="4" :cols="3">
          <n-gi flex items-center>
            <p i-carbon-forum text-xl />
            <p font-serif ml-2>
              农商云影
            </p>
          </n-gi>
          <n-gi flex items-center>
            <n-input-group>
              <n-input :style="{ width: '50%' }" placeholder="搜索板块、帖子、用户" />
              <n-button type="primary" ghost>
                搜索
              </n-button>
            </n-input-group>
          </n-gi>
          <n-gi flex items-center justify-center>
            <div flex>
              <p mx-6>
                注册
              </p>
              <p mx-6>
                登录
              </p>
              <p mx-6>
                帮助中心
              </p>
            </div>
          </n-gi>
        </n-grid>
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
      <n-layout content-style="padding:10px 20px 20px 0;" :native-scrollbar="false" class="bg-[#F4F5F8]">
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
