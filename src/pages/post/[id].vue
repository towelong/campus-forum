<script setup lang="ts">
import type { Ref } from 'vue'
import { getPostDetail } from '~/logic/post'
import PostContent from '~/components/PostContent.vue'
import { useUserStore } from '~/store/user'
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
const user = useUserStore()

const {
  data,
  isFinished,
  isFetching,
  error,
  count,
  page,
} = getPostDetail(props.id)
const contentRef = inject<Ref>('contentRef')
const next = (currentPage: number) => {
  page.value = currentPage
  contentRef?.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

const input = ref<any>(null)
const handleSubmit = (value: string) => {
  // console.log(value)
}
const handleComment = () => {
  input.value?.focusToInput()
}

</script>

<template>
  <div>
    <div v-if="error || isFetching" px-6>
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
    <div v-if="isFinished" ref="el" px-6>
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
          <n-button type="primary" @click="handleComment">
            回复
          </n-button>
        </template>
        <p border-b border-slate-200 />
        <PostContent :data="data" />
        <!-- 评论框 -->
        <div mt-1>
          <n-card title="评论">
            <Input
              ref="input"
              :avatar="user.user.avatar"
              @submit="handleSubmit"
            />
          </n-card>
        </div>
        <template #footer>
          <div flex justify-end mr-12>
            <n-pagination
              v-model:page="page"
              :page-size="count"
              :item-count="data.comments.total"
              :on-update:page="next"
            />
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>
