<script setup lang="ts">
import { getSectionList } from '~/logic/section'

const { data, isFetching, isFinished, error } = getSectionList()

const items = computed(() => data.value?.items)

</script>
<template>
  <div>
    <div v-if="isFetching || error" p-4>
      <h1 text-2xl mb-4 class="text-color">
        所有板块
      </h1>
      <n-grid x-gap="12" :cols="3" :y-gap="8">
        <n-gi v-for="(_, i) in 12" :key="i">
          <n-skeleton h-42 rounded-2xl />
        </n-gi>
      </n-grid>
    </div>
    <div v-if="isFinished" p-4>
      <h1 text-2xl mb-4 class="text-color">
        所有板块
      </h1>
      <n-grid x-gap="12" :cols="3" :y-gap="8">
        <n-gi v-for="(item, i) in items" :key="i">
          <SectionItem :data="item" />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style scoped>
.text-color {
  color: #162C4E;
}
</style>
