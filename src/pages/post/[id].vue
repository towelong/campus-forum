<script setup lang="ts">
// import { useMessage } from 'naive-ui'
const props = defineProps<{
  id: string
  forum: string
}>()
const router = useRouter()
// const message = useMessage()
const route = useRoute()
const handleBack = () => {
  router.push(`/forum/detail/${route.query.forum}`)
}

const page = ref(1)
const pageSize = ref(10)
const value = ref('')
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
      <div class="flex justify-center items-center my-2">
        <div class="w-2/3 ">
          <n-input v-model:value="value" type="textarea" placeholder="评论" />
        </div>
        <div ml-2>
          <n-button type="primary">
            回复
          </n-button>
        </div>
      </div>
      <template #footer>
        <div flex justify-end mr-12>
          <n-pagination v-model:page="page" v-model:page-size="pageSize" :page-count="10" />
        </div>
      </template>
    </n-card>
  </div>
</template>
