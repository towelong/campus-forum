<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { createReply, getReplies } from '~/logic'
import type { Comment, ReplyInfo } from '~/models/comments'
import { useUserStore } from '~/store'
import { fromNow } from '~/utils/time'

const props = defineProps<{
  comment: Comment
}>()
const message = useMessage()
const [open, setOpen] = useToggle(false)
const {
  data,
  isFetching,
  execute,
  error,
} = getReplies(props.comment.comment_id)

const replies = ref<ReplyInfo[] | undefined>(undefined)
replies.value = props.comment.reply_infos

const more = async() => {
  await execute()
  replies.value = data.value
}

const {
  replyForm,
  replyData,
  replyExecute,
  replyStatusCode,
} = createReply()

const input = ref<any>(null)
const handleSubmit = async(value: string) => {
  replyForm.value = {
    comment_id: props.comment.comment_id,
    reply_content: value,
  }
  await replyExecute()
  if (replyStatusCode.value === 201) {
    message.success(replyData.value.message)
    // 重新加载数据
    await more()
  }
  else {
    message.error('发表失败')
  }
  input.value.content = ''
}
const handleComment = async() => {
  setOpen(true)
  await nextTick()
  input.value?.focusToInput()
}
const handleCancelComment = () => {
  setOpen(false)
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
  <!-- [帖子-> 评论 -> 回复] -->
  <div class="flex border-b border-slate-200">
    <div
      flex flex-col items-center max-w-38
      px-4 py-6 border-r border-slate-200
    >
      <img
        :src="props.comment.user_info.avatar"
        class="w-30 h-30 rounded-[50%]"
      >
      <div flex flex-col text-sm justify-between max-h-12 mx-2 mt-2>
        <p hover:text-emerald-700 cursor-pointer @click="gotoUser(props.comment.user_info.id)">
          <n-ellipsis :line-clamp="1">
            {{ props.comment.user_info.nickname }}
          </n-ellipsis>
        </p>
        <!-- <p>发帖数：31</p> -->
      </div>
      <n-tag v-if="props.comment.is_author" type="success" size="small">
        作者
      </n-tag>
    </div>
    <div class="px-6 py-2 flex flex-col justify-between flex-1">
      <p pb-42>
        {{ props.comment.comment_info.comment_content }}
      </p>
      <div flex justify-between w-full>
        <div flex text-slate-400>
          <div v-if="user.isExist" flex>
            <div
              v-if="!open"
              flex justify-center items-center text-sm cursor-pointer
              @click="handleComment"
            >
              <p i-ri-chat-4-line />
              <p>回复</p>
            </div>
            <div
              v-else
              flex justify-center items-center text-sm cursor-pointer
              @click="handleCancelComment"
            >
              <p i-ri-chat-4-fill />
              <p>取消回复</p>
            </div>
            <div flex justify-center items-center px-2 text-sm cursor-pointer>
              <p i-carbon-warning-alt />
              <p>举报</p>
            </div>
          </div>
          <div flex justify-center items-center px-2 text-sm>
            <p>回复({{ props.comment.reply_total }})</p>
          </div>
        </div>
        <p class="text-slate-400 text-sm">
          发表于{{ fromNow(props.comment.comment_info.create_time) }}
        </p>
      </div>
      <!-- 回复 -->
      <div v-if="replies && replies.length > 0" class="bg-[#F7F8FA] p-1">
        <div v-for="(reply, i) in replies" :key="`reply-${i}`">
          <reply
            :reply="reply"
            :comment-id="props.comment.comment_id"
            :more="more"
          />
        </div>
        <div v-if="isFetching" pl-10>
          加载中...
        </div>
        <div v-if="error" pl-10>
          加载失败
        </div>
        <div
          v-if="replies && props.comment.reply_total > replies.length"
          pl-10 flex items-center cursor-pointer text-emerald-700
          @click="more"
        >
          <p hover:underline="~ offset-2">
            查看更多回复
          </p>
          <p i-ri-arrow-down-s-line />
        </div>
        <!-- <div flex justify-end>
          <n-pagination v-model:page="page" :page-count="1" />
        </div> -->
      </div>
      <template v-if="open">
        <Input ref="input" mt-1 @submit="handleSubmit" />
      </template>
    </div>
  </div>
</template>
