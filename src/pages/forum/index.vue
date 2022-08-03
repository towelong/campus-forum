<script setup lang="ts">
import { getSectionList } from '~/logic/section'

const { data } = getSectionList()

const items = computed(() => data.value?.items)

</script>
<template>
  <div p-4>
    <h1 text-2xl mb-4 class="text-color">
      所有板块
    </h1>
    <!-- <n-button @click="page++">
      ++
    </n-button> -->
    <n-grid x-gap="12" :cols="3" :y-gap="8">
      <n-gi v-for="(item, i) in items" :key="i">
        <SectionItem :data="item" />
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.text-color {
  color: #162C4E;
}
</style>
