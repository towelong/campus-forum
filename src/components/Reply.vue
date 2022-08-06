<script setup lang="ts">
import type { ReplyInfo } from '~/models/comments'
import { fromNow } from '~/utils/time'

const [open, toggle] = useToggle(false)
const props = defineProps<{
  reply: ReplyInfo
}>()

const input = ref<any>(null)
const handleSubmit = (value: string) => {
  input.value.content = ''
}
const handleReply = async() => {
  toggle()
  await nextTick()
  input.value?.focusToInput()
}

onClickOutside(
  input,
  (event) => {
    open.value = false
  },
)

</script>

<template>
  <!-- [帖子-> 评论 -> 回复->回复] -->
  <div flex flex-col pt-1 mb-1 border-b-1 border-light-700>
    <div flex>
      <img
        class="w-10 h-10"
        :src="props.reply.user_info.avatar"
        alt=""
      >
      <div flex flex-col flex-1>
        <!-- 内容 -->
        <div flex>
          <p v-if="props.reply.parent_reply" ml-1>
            <span text-emerald-700>
              <n-ellipsis style="max-width: 100px">
                {{ props.reply.user_info.nickname }}
              </n-ellipsis>
            </span>
            <span px-2>回复</span>
            <span text-emerald-700>
              <n-ellipsis style="max-width: 100px">
                {{ props.reply.reply_user.nickname }}
              </n-ellipsis>
            </span>
          </p>
          <p v-else text-emerald-700 ml-1>
            <n-ellipsis style="max-width: 100px">
              {{ props.reply.user_info.nickname }}
            </n-ellipsis>
          </p>
          <span px-1>:</span>
          <p text-sm>
            {{ props.reply.reply_info.reply_content }}
          </p>
        </div>
        <div flex justify-between items-center text-slate-400 text-sm>
          <div
            v-if="!open"
            flex justify-center items-center cursor-pointer
            text-slate-400 m-2
            @click="handleReply"
          >
            <p i-ri-chat-4-line />
            <p>回复</p>
          </div>
          <div
            v-else
            flex justify-center items-center cursor-pointer
            text-slate-400 m-2
            @click="toggle(false)"
          >
            <p i-ri-chat-4-fill />
            <p>取消回复</p>
          </div>
          <p mr-1>
            发表于{{ fromNow(props.reply.reply_info.create_time) }}
          </p>
        </div>
      </div>
    </div>

    <template v-if="open">
      <Input ref="input" @submit="handleSubmit" />
    </template>
  </div>
</template>
