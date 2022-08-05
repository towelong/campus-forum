<script setup lang="ts">
import type { ReplyInfo } from '~/models/comments'
const value = ref<string>('')
const [open, toggle] = useToggle(false)
const props = defineProps<{
  reply: ReplyInfo
}>()
</script>

<template>
  <div flex flex-col pt-1 mb-1 border-b-1 border-light-700>
    <div flex>
      <img
        class="w-10 h-10"
        :src="props.reply.user_info.avatar"
        alt=""
      >
      <p v-if="props.reply.parent_reply" ml-1>
        <span text-emerald-700>{{ props.reply.user_info.nickname }}</span>
        <span px-2>回复</span>
        <span text-emerald-700>{{ props.reply.reply_user.nickname }}</span>
      </p>
      <p v-else text-emerald-700 ml-1>
        {{ props.reply.user_info.nickname }}
      </p>
      <p mx-1>
        :
      </p>
      <p>
        {{ props.reply.reply_info.reply_content }}
      </p>
    </div>
    <div flex justify-end text-slate-400>
      <p mr-1>
        发表于 {{ props.reply.reply_info.create_time }}
      </p>
      <!-- <p ml-2 text-emerald-700 cursor-pointer @click="toggle()">
        回复
      </p> -->
      <n-button text @click="toggle()">
        <p text-emerald-700>
          回复
        </p>
      </n-button>
    </div>
    <template v-if="open">
      <n-input v-model:value="value" type="textarea" placeholder="回复" />
      <div flex justify-end my-1>
        <n-button type="primary">
          发表
        </n-button>
      </div>
    </template>
  </div>
</template>
