<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { createReply } from '~/logic'
import type { ReplyInfo } from '~/models/comments'
import { useUserStore } from '~/store'
import { fromNow } from '~/utils/time'

const [open, toggle] = useToggle(false)
const message = useMessage()
const props = defineProps<{
  reply: ReplyInfo
  commentId: number
  more: () => void
}>()

const input = ref<any>(null)
const handleSubmit = async(value: string) => {
  const replyForm = {
    comment_id: props.commentId,
    reply_content: value,
    reply_to_user_id: props.reply.user_info.id,
    reply_to_reply_id: props.reply.reply_info.reply_id,
  }
  const res = await createReply(replyForm)
  if (res.code === 1) {
    message.success('发表成功')
    // 重新加载数据
    await props.more()
  }
  else {
    message.error('发表失败')
  }
  input.value.content = ''
  open.value = false
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
const user = useUserStore()
const router = useRouter()
function gotoUser(id: number) {
  router.push(`/user/${id}`)
}
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
          <p
            v-if="props.reply.parent_reply" ml-1 cursor-pointer
            @click="gotoUser(props.reply.user_info.id)"
          >
            <span text-emerald-700>
              <n-ellipsis style="max-width: 100px">
                {{ props.reply.user_info.nickname }}
              </n-ellipsis>
              <span v-if="props.reply.is_author" text-emerald-700>(作者)</span>
            </span>
            <span px-2>回复</span>
            <span
              text-emerald-700 cursor-pointer
              @click="gotoUser(props.reply.reply_user.id)"
            >
              <n-ellipsis style="max-width: 100px">
                {{ props.reply.reply_user.nickname }}
              </n-ellipsis>
            </span>
          </p>
          <p
            v-else text-emerald-700 ml-1 cursor-pointer
            @click="gotoUser(props.reply.user_info.id)"
          >
            <n-ellipsis style="max-width: 100px">
              {{ props.reply.user_info.nickname }}
            </n-ellipsis>
            <span v-if="props.reply.is_author" text-emerald-700>(作者)</span>
          </p>
          <span px-1>:</span>
          <p text-sm>
            {{ props.reply.reply_info.reply_content }}
          </p>
        </div>
        <div flex justify-between items-center text-slate-400 text-xs lg:text-sm>
          <div v-if="user.isExist">
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
          </div>
          <div />
          <p mr-1 text-xs lg:text-sm>
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
