<script setup lang="ts">
import hljs from 'highlight.js'
import type { Comment } from '~/models/comments'
import type { User } from '~/models/user'
import { useUserStore } from '~/store'
import { fromNow } from '~/utils/time'

const props = defineProps<{
  data: {
    id: number
    title: string
    content: string
    post_pics: string[]
    create_time: string
    user: User
    comments: {
      count: number
      items: Comment[]
      page: number
      total: number
    }
  }
}>()

const postContentRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (postContentRef) {
    // const e = document.getElementById('post-content')
    hljs.highlightAll()
  }
})
const user = useUserStore()
const router = useRouter()
function gotoUser(id: number) {
  router.push(`/user/${id}`)
}
</script>

<template>
  <div>
    <!-- 帖子内容 -->
    <div
      v-if="props.data.comments.page === 0"
      class="flex flex-col lg:flex-row border-b border-slate-200"
    >
      <div
        flex lg:flex-col lg:items-center lg:max-w-38 px-1 py-2
        lg:px-4 lg:py-6 border-b lg:border-b-none lg:border-r border-slate-200
      >
        <img
          :src="props.data.user.avatar"
          class="w-16 h-16 lg:w-30 lg:h-30 rounded-[50%]"
        >
        <div
          flex flex-col text-sm lg:justify-between justify-around items-center
          lg:max-h-12 mx-2 lg:mt-2
        >
          <p hover:text-emerald-700 cursor-pointer @click="gotoUser(props.data.user.id)">
            <n-ellipsis :line-clamp="1">
              {{ props.data.user.nickname }}
            </n-ellipsis>
          </p>
          <!-- <p>发帖数：31</p> -->
          <p>
            <n-tag type="success" size="small">
              作者
            </n-tag>
          </p>
        </div>
        <p class="text-slate-400 text-xs lg:hidden ml-auto">
          发表于{{ fromNow(props.data.create_time) }}
        </p>
      </div>
      <div class="px-6 py-2 flex flex-col justify-between flex-1">
        <!-- <p pb-42>
          {{ props.data.content }}
        </p> -->
        <!-- 渲染html -->
        <div
          id="post-content" ref="postContentRef"
          pb-42 v-html="props.data.content"
        />
        <div flex justify-between w-full>
          <div flex>
            <div v-if="user.isExist" flex justify-center items-center text-xs lg:text-sm cursor-pointer text-slate-400>
              <p i-carbon-warning-alt />
              <p>举报</p>
            </div>
          </div>
          <p class="text-slate-400 hidden lg:block">
            发表于{{ fromNow(props.data.create_time) }}
          </p>
        </div>
      </div>
    </div>
    <!-- 帖子评论 -->
    <div v-for="(comment, i) in props.data.comments.items" :key="`comment-${i}`">
      <UserReply :comment="comment" />
    </div>
  </div>
</template>

<style>
@import url("~/styles/content.css")
</style>
