<script setup lang="ts">
import type { Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { getPostDetail } from '~/logic/post'
import PostContent from '~/components/PostContent.vue'
import { useUserStore } from '~/store/user'
import { createComment } from '~/logic'
const props = defineProps<{
  id: string
}>()
const router = useRouter()
const message = useMessage()
const route = useRoute()
const handleBack = () => {
  if (route.query.forum)
    router.push(`/forum/detail/${route.query.forum}`)
  else router.back()
}
const user = useUserStore()

const {
  data,
  isFinished,
  isFetching,
  error,
  count,
  page,
  execute,
} = getPostDetail(props.id)
watch(isFinished, (value) => {
  if (value)
    useTitle(`${data.value.title} - 校园论坛`)
})

const contentRef = inject<Ref>('contentRef')
const next = (currentPage: number) => {
  page.value = currentPage
  contentRef?.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

const input = ref<any>(null)
const handleSubmit = async(value: string) => {
  const comment = {
    post_id: props.id,
    comment_content: value,
  }
  const res = await createComment(comment)
  if (res.code === 1) {
    message.success('评论成功')
    await execute()
  }
}
const handleComment = () => {
  location.href = '#comment-card-input'
  input.value?.focusToInput()
}
function goTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div>
    <div v-if="error || isFetching" lg:px-6>
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
    <div v-if="isFinished" ref="el" lg:px-6>
      <n-card>
        <template #header>
          <n-page-header @back="handleBack">
            <template #title>
              <p text-xs lg:text-base>
                {{ data.title }}
              </p>
            </template>
            <template #header>
              <n-breadcrumb>
                <n-breadcrumb-item @click="goTo('/forum')">
                  <p text-xs lg:text-sm>
                    所有板块
                  </p>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  <p v-if="route.query.name" text-xs lg:text-sm @click="goTo('/forum/detail/'+route.query.forum)">
                    {{ route.query.name }}
                  </p>
                  <p v-if="!route.query.name" text-xs lg:text-sm>
                    帖子
                  </p>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  <p text-xs lg:text-sm>
                    {{ data.title }}
                  </p>
                </n-breadcrumb-item>
              </n-breadcrumb>
            </template>
          </n-page-header>
        </template>
        <template #header-extra>
          <n-button hidden lg:block type="primary" @click="handleComment">
            回复
          </n-button>
        </template>
        <p border-b border-slate-200 />
        <PostContent :data="data" />
        <!-- [帖子->评论] -->
        <div id="comment-card-input" mt-1>
          <n-card title="评论">
            <Input
              v-if="user.isExist"
              ref="input"
              :avatar="user.user.avatar"
              @submit="handleSubmit"
            />
            <p v-else>
              请先登录
            </p>
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
