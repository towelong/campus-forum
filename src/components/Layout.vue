<script setup lang="ts">
// const router = useRouter()
</script>
<template>
  <n-layout h-screen>
    <n-layout-header style="height: 64px; padding: 24px" bordered>
      <div flex items-center justify-between>
        <p i-carbon-forum text-xl />
        <div flex>
          <p>登录</p>
          <p>注册</p>
        </div>
      </div>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px" has-sider class="bg-[#F4F5F8]">
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :native-scrollbar="false"
        :collapsed-width="16"
        :width="220"
        mr-4 mb-2
      >
        <router-link to="/">
          <div
            flex="~" items-center mx-4 px-1 py-2 my-1 rounded
            class="hover:bg-[#F4F5F7]"
          >
            <p i-carbon-home text-xl />
            <p ml-2>
              首页
            </p>
          </div>
        </router-link>
        <router-link to="/forum">
          <div
            flex="~" items-center mx-4 px-1 py-2 my-1 rounded
            class="hover:bg-[#F4F5F7]"
          >
            <p i-carbon-home text-xl />
            <p ml-2>
              布局
            </p>
          </div>
        </router-link>
      </n-layout-sider>
      <n-layout content-style="padding:10px 20px 20px 0;" :native-scrollbar="false" class="bg-[#F4F5F8]">
        <slot />
      </n-layout>
    </n-layout>
  </n-layout>
  <!-- <n-layout h-screen>
    <n-layout-header style="height: 64px; padding: 24px" bordered>
      颐和园路
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
      >
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
      </n-layout>
    </n-layout>
  </n-layout> -->
</template>

<style scoped>
.router-link-active {
  color: #1A9F58;
}
</style>
