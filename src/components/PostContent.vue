<script setup lang="ts">
import type { Comment } from '~/models/comments'
import type { User } from '~/models/user'
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

// const page = ref(1)
// const [open, toggle] = useToggle(false)
</script>

<template>
  <div>
    <!-- 帖子内容 -->
    <div v-if="props.data.comments.page === 0" class="flex border-b border-slate-200">
      <div flex flex-col items-center px-4 py-6 border-r border-slate-200>
        <img :src="props.data.user.avatar" w-30 h-30 rounded-3xl>
        <div flex flex-col text-sm justify-between max-h-12 mx-2>
          <p>
            <n-ellipsis :line-clamp="1">
              {{ props.data.user.nickname }}
            </n-ellipsis>
          </p>
          <!-- <p>发帖数：31</p> -->
        </div>
        <n-tag type="success" size="small">
          楼主
        </n-tag>
      </div>
      <div class="px-6 py-2 flex flex-col justify-between flex-1">
        <p pb-42>
          {{ props.data.content }}
        </p>
        <div flex justify-between w-full>
          <div flex>
            <div flex justify-center items-center text-xs cursor-pointer>
              <p i-carbon-warning-alt />
              <p>举报</p>
            </div>
          </div>
          <p class="text-slate-400">
            发表于 {{ props.data.create_time }}
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
