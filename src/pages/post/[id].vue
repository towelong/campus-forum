<script setup lang="ts">
import { useMessage } from 'naive-ui'
const props = defineProps<{
  id: string
  forum: string
}>()
const router = useRouter()
const message = useMessage()
const route = useRoute()
const handleBack = () => {
  router.push(`/forum/detail/${route.query.forum}`)
}
</script>

<template>
  <div>
    {{ props.id }} -- {{ route.query.forum }}
    <n-card>
      <template #header>
        <n-page-header @back="handleBack">
          <template #title>
            <p>【招募】光华管理学院教授招聘翻译助理</p>
          </template>
          <template #header>
            <n-breadcrumb>
              <n-breadcrumb-item>播客</n-breadcrumb-item>
              <n-breadcrumb-item>精选</n-breadcrumb-item>
              <n-breadcrumb-item>超级精选</n-breadcrumb-item>
              <n-breadcrumb-item>Anyway.FM</n-breadcrumb-item>
            </n-breadcrumb>
          </template>
        </n-page-header>
      </template>
      <template #header-extra>
        <n-button type="primary">
          回复
        </n-button>
      </template>
      <p border-b border-slate-200 />
      <UserReply :is-author="true" />
      <UserReply />
      <UserReply />
      <UserReply />
      <UserReply />
      <!-- <template #footer>
        1231
      </template> -->
    </n-card>
  </div>
</template>
