<script setup lang="ts">
const value = ref<string>('')
</script>

<template>
  <div>
    <n-input
      v-model:value="value"
      type="textarea"
      placeholder="基本的 Textarea"
    />
  </div>
</template>
