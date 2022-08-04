<script setup lang="ts">
import type { Comment } from '~/models/comments'
const props = defineProps<{
  comment: Comment
}>()

const page = ref(1)
const [open, setOpen] = useToggle(false)
const value = ref('')
</script>

<template>
  <div class="flex border-b border-slate-200">
    <div flex flex-col items-center px-4 py-6 border-r border-slate-200>
      <img :src="props.comment.user_info.avatar" w-30 h-30 rounded-3xl>
      <div flex flex-col text-sm justify-between max-h-12 mx-2>
        <p>
          <n-ellipsis :line-clamp="1">
            {{ props.comment.user_info.nickname }}
          </n-ellipsis>
        </p>
        <!-- <p>发帖数：31</p> -->
      </div>
      <n-tag v-if="props.comment.is_author" type="success" size="small">
        楼主
      </n-tag>
    </div>
    <div class="px-6 py-2 flex flex-col justify-between flex-1">
      <p pb-42>
        {{ props.comment.comment_info.comment_content }}
      </p>
      <div flex justify-between w-full>
        <div flex>
          <div
            flex justify-center items-center text-xs cursor-pointer
            @click="setOpen(!open)"
          >
            <p i-carbon-chat />
            <p>回复</p>
          </div>
          <div flex justify-center items-center px-2 text-xs cursor-pointer>
            <p i-carbon-warning-alt />
            <p>举报</p>
          </div>
          <div flex justify-center items-center px-2 text-xs>
            <p>回复({{ props.comment.reply_infos.length }})</p>
          </div>
        </div>
        <p class="text-slate-400">
          发表于 {{ props.comment.comment_info.create_time }}
        </p>
      </div>
      <!-- 回复 -->
      <div v-if="props.comment.reply_infos.length > 0" class="bg-[#F7F8FA] p-1">
        <div v-for="(_, i) in 2" :key="i">
          <reply />
        </div>
        <div flex justify-end>
          <n-pagination v-model:page="page" :page-count="1" />
        </div>
      </div>
      <template v-if="open">
        <n-input v-model:value="value" mt-1 type="textarea" placeholder="回复" />
        <div flex justify-end my-1>
          <n-button type="primary">
            发表
          </n-button>
        </div>
      </template>
    </div>
  </div>
</template>
