<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { post } from '~/request/axios'
const props = defineProps<{
  id: number
  isTop: boolean
  refresh: () => Promise<void>
}>()
const message = useMessage()
async function handleTop() {
  const res = await post('/post/action', {
    id: props.id,
    is_top: 1,
  })
  if (res.code === 2) {
    message.success('置顶成功')
    await props.refresh()
  }
}
async function handleCancelTop() {
  const res = await post('/post/action', {
    id: props.id,
    is_top: 0,
  })
  if (res.code === 2) {
    message.success('取消置顶成功')
    await props.refresh()
  }
}

async function handleDelete() {
  const res = await post('/post/action', {
    id: props.id,
  })
  if (res.code === 2) {
    message.success('删除成功')
    await props.refresh()
  }
}

</script>
<template>
  <n-space>
    <n-button v-if="isTop" type="primary" ghost @click="handleCancelTop">
      取消置顶
    </n-button>
    <n-button v-else type="primary" ghost @click="handleTop">
      置顶
    </n-button>
    <n-button type="error" ghost @click="handleDelete">
      删除
    </n-button>
  </n-space>
</template>
<style scoped>

</style>
