<script setup lang="ts">
import { getPostDetail } from '~/logic/post.js'
import PostContent from '~/components/PostContent.vue'

// import { useMessage } from 'naive-ui'
const props = defineProps<{
  id: string
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

const { data, isFinished, isFetching, error } = getPostDetail(props.id)

</script>

<template>
  <div>
    <div v-if="error || isFetching">
      <n-card>
        <template #header>
          <n-page-header @back="handleBack">
            <template #title>
              <p><n-skeleton w-10 /></p>
            </template>
            <template #header>
              <n-breadcrumb>
                <n-breadcrumb-item><n-skeleton w-10 /></n-breadcrumb-item>
                <n-breadcrumb-item><n-skeleton w-10 /></n-breadcrumb-item>
                <n-breadcrumb-item><n-skeleton w-10 /></n-breadcrumb-item>
              </n-breadcrumb>
            </template>
          </n-page-header>
        </template>
        <template #header-extra>
          <n-skeleton />
        </template>
        <div v-for="(_, i) in 3" :key="i" mt-1>
          <n-skeleton h-50 class="mx-2" />
        </div>
      </n-card>
    </div>
    <div v-if="isFinished">
      <n-card>
        <template #header>
          <n-page-header @back="handleBack">
            <template #title>
              <p>{{ data.title }}</p>
            </template>
            <template #header>
              <n-breadcrumb>
                <n-breadcrumb-item>所有板块</n-breadcrumb-item>
                <n-breadcrumb-item>{{ route.query.name }}</n-breadcrumb-item>
                <n-breadcrumb-item>{{ data.title }}</n-breadcrumb-item>
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
        <PostContent :data="data" />
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
  </div>
</template>
