<script setup lang="ts">
import { useMessage } from 'naive-ui'
import type { PostModel } from '~/models/post'
import { editPost, getOnePost } from '~/logic'
import type { EditorModel } from '~/components/CustomEditor/model'

const props = defineProps<{
  id: number
}>()

const message = useMessage()
const router = useRouter()

const model = ref<PostModel>({
  section_id: props.id,
  title: '',
  content: '',
})

onMounted(async() => {
  const res = await getOnePost(props.id)
  model.value.title = res.title
  model.value.content = res.content
})

const handleSubmit = async(editorContent: EditorModel) => {
  const res = await editPost({
    id: props.id,
    title: editorContent.title,
    content: editorContent.content,
  })
  if (res.code === 2) {
    message.success('修改成功')
    router.push(`/post/${props.id}`)
  }
  else { message.error('修改失败') }
}
</script>
<template>
  <n-card title="编辑帖子">
    <custom-editor
      :title="model.title"
      :content="model.content"
      @submit="handleSubmit"
    />
  </n-card>
</template>
<style scoped>
</style>
