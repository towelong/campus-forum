<script setup lang="ts">
import Vue3Tinymce from '@jsdawn/vue3-tinymce'

const content = ref('')
const setting = ref({
  menubar: false,
  height: 400, // editor 高度
  // 以中文简体为例
  language: 'zh_CN',
  language_url:
      'https://unpkg.com/@jsdawn/vue3-tinymce@1.1.6/dist/tinymce/langs/zh_CN.js',
  toolbar:
    'bold italic underline h1 h2 blockquote codesample numlist bullist link image | removeformat fullscreen',
  plugins: 'codesample link image table lists fullscreen',
  // 自定义 图片上传模式
  custom_images_upload: true,
  images_upload_url: 'http://localhost:3000/upload',
  custom_images_upload_callback: (res: any) => res.url,
})

</script>

<template>
  <div>
    {{ content }}
  </div>
  <vue3-tinymce v-model="content" :setting="setting" />
</template>
