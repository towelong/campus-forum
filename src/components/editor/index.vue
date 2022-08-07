<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { editorConfig, toolbarConfig } from './config'
import type { EditorModel } from './model'
const emit = defineEmits<{
  (e: 'submit', editorContent: EditorModel): void
}>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 标题
const title = ref('')
// 内容 HTML
const valueHtml = ref('')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const mode = 'default'

const handleSubmit = () => {
  emit('submit', {
    title: title.value,
    content: valueHtml.value,
  })
}

</script>

<template>
  <div p-2>
    <n-space justify="space-between">
      <n-space flex items-center>
        <p>标题: </p>
        <n-input
          v-model:value="title"
          maxlength="30" show-count clearable
          type="text" placeholder="请输入标题"
        />
      </n-space>
      <n-space vertical mt-2>
        <p>内容：</p>
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :default-config="toolbarConfig"
            :mode="mode"
          />
          <Editor
            v-model="valueHtml"
            class="overflow-y-hidden"
            style="height: 500px;"
            :default-config="editorConfig"
            :mode="mode"
            @on-created="handleCreated"
          />
        </div>
        <div flex justify-end mt-2>
          <n-button type="primary" @click="handleSubmit">
            立即发布
          </n-button>
        </div>
      </n-space>
    </n-space>
  </div>
</template>
