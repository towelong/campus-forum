<script setup lang="ts">
import Item from './item/index.vue'
import type { Hot } from '~/models/home'

const props = defineProps<{
  hots: Hot[]
}>()

</script>
<template>
  <n-list bordered>
    <template v-for="hot in props.hots" :key="hot.post_id">
      <Item :title="hot.post.title" :post-id="hot.post_id" :total="hot.total" />
    </template>
  </n-list>
</template>
<style scoped>
</style>
