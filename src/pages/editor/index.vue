<script setup lang="ts">
import { useMessage } from 'naive-ui'
import type { EditorModel } from '~/components/editor/model'
import type { PostModel } from '~/models/post'
import { createPost } from '~/logic'

const router = useRouter()
const route = useRoute()
const message = useMessage()

const sectionId = route.query.fromSection as string
const form = ref<PostModel>({
  section_id: 0,
  title: '',
  content: '',
})
const { execute, statusCode } = createPost(form)
async function handleSubmit(editorContent: EditorModel) {
  form.value = {
    section_id: parseInt(sectionId),
    title: editorContent.title,
    content: editorContent.content,
  }
  await execute()
  if (statusCode.value === 201) {
    message.success('发表成功')
    router.push(`/forum/detail/${sectionId}`)
  }
  else {
    message.error('发表失败')
  }
}
</script>

<template>
  <n-card title="发布帖子">
    <editor @submit="handleSubmit" />
  </n-card>
</template>
