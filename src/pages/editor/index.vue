<script setup lang="ts">
import type { EditorModel } from '~/components/editor/model'

function handleSubmit(editorContent: EditorModel) {
  console.log(editorContent)
}
</script>

<template>
  <n-card title="发布帖子">
    <editor @submit="handleSubmit" />
  </n-card>
</template>
