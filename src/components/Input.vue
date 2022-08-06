<script setup lang="ts">

const props = defineProps<{
  avatar?: string
}>()
const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

const inputRef = ref<HTMLElement | null>(null)
function focusToInput() {
  inputRef.value?.focus()
}
defineExpose({ focusToInput })

const content = ref('')
function handleSubmit() {
  emit('submit', content.value)
}
</script>

<template>
  <div flex justify-around w-full>
    <img v-if="props.avatar" class="w-14 h-14 rounded-[50%] border-1 border-slate-300" :src="props.avatar" alt="" srcset="">
    <div flex-1 ml-2>
      <n-input
        ref="inputRef" v-model:value="content"
        type="textarea" placeholder="评论"
      />
      <div flex justify-between items-center mt-1>
        <n-icon size="20">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200s-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1c-10.2 8.5-11.5 23.6-3.1 33.8c30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8c-10.1-8.4-25.3-7.1-33.8 3.1z" fill="currentColor" /></svg>
        </n-icon>
        <n-button type="primary" @click="handleSubmit">
          回复
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
