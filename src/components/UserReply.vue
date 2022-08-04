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
    comments: Comment[]
  }
  isAuthor: boolean
}>()

const page = ref(1)
// const [open, toggle] = useToggle(false)
</script>

<template>
  <div class="flex border-b border-slate-200">
    <div flex flex-col items-center px-4 py-6 border-r border-slate-200>
      <img :src="props.data.user.avatar" w-30 h-30 rounded-3xl>
      <div flex flex-col text-sm justify-between max-h-12 mx-2>
        <p>
          <n-ellipsis :line-clamp="1">
            {{ props.data.user.nickname }}
          </n-ellipsis>
        </p>
        <p>发帖数：31</p>
      </div>
      <n-tag v-if="props.isAuthor" type="success" size="small">
        楼主
      </n-tag>
    </div>
    <div class="px-6 py-2 flex flex-col justify-between flex-1">
      <p pb-42>
        {{ props.data.content }}
      </p>
      <div flex justify-between w-full>
        <div flex>
          <div v-if="!props.isAuthor" flex justify-center items-center text-xs>
            <p i-carbon-chat />
            <p>回复</p>
          </div>
          <div flex justify-center items-center px-2 text-xs>
            <p i-carbon-warning-alt />
            <p>举报</p>
          </div>
          <div v-if="!props.isAuthor" flex justify-center items-center px-2 text-xs>
            <p>回复(2)</p>
          </div>
        </div>
        <p class="text-slate-400">
          发表于 {{ props.data.create_time }}
        </p>
      </div>
      <div v-if="!props.isAuthor" class="bg-[#F7F8FA] p-1">
        <div v-for="(_, i) in 2" :key="i">
          <reply />
        </div>
        <div flex justify-end>
          <n-pagination v-model:page="page" :page-count="1" />
        </div>
      </div>
    </div>
  </div>
</template>
