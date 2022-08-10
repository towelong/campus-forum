<script setup lang="ts">
import { getMyCollections } from '~/logic'
const items = ref([])

async function getData() {
  const res = await getMyCollections()
  items.value = res.items
}

onMounted(async() => {
  await getData()
})

</script>

<template>
  <div>
    <div v-if="items.length == 0" p-4>
      <h1 text-2xl mb-4 class="text-color">
        我的收藏
      </h1>
      <n-grid x-gap="12" :cols="3" :y-gap="8">
        <n-gi v-for="(_, i) in 12" :key="i">
          <n-skeleton h-42 rounded-2xl />
        </n-gi>
      </n-grid>
    </div>
    <div v-else p-4>
      <h1 text-2xl mb-4 class="text-color">
        我的收藏
      </h1>
      <n-grid x-gap="12" :cols="3" :y-gap="8">
        <n-gi v-for="(item, i) in items" :key="i">
          <SectionItem :data="item" :refresh="getData" />
        </n-gi>
      </n-grid>
    </div>
    <n-grid
      v-if="items && items.length === 0"
      x-gap="12" :cols="4" :y-gap="8" mb-4
    >
      <n-gi>
        <div
          class="demo-card text-color
          text-xl flex justify-center items-center"
        >
          无
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.demo-card {
  height: 168px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
}

.text-color {
  color: #162C4E;
}
</style>
