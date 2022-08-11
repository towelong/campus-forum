<script setup lang="ts">
import Item from './item/index.vue'
import type { Hot } from '~/models/home'

const props = defineProps<{
  hots: Hot[]
}>()

</script>
<template>
  <div flex flex-col>
    <template v-for="hot in props.hots" :key="hot.post_id">
      <Item :title="hot.post.title" :post-id="hot.post_id" :total="hot.total" />
    </template>
  </div>
</template>
<style scoped>
</style>
