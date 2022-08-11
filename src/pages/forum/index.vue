<script setup lang="ts">
import { getSectionList } from '~/logic'

const items = ref([])
const page = ref(1)
const total = ref(0)

const loading = ref(false)
const getData = async() => {
  loading.value = true
  const res = await getSectionList(page.value)
  if (items.value.length === 0)
    items.value = res.items
  else
    items.value = items.value.concat(res.items)
  total.value = res.total
  loading.value = false
}
onMounted(async() => {
  await getData()
})

const handleMore = async() => {
  page.value++
  await getData()
}

const hasMore = computed(() => items.value.length < total.value)

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const cols = ref(2)
watch(isLargeScreen, (value) => {
  if (value)
    cols.value = 3
  else
    cols.value = 2
})

</script>
<template>
  <div>
    <div v-if="loading" p-4>
      <h1 text-2xl mb-4 class="text-color">
        所有板块
      </h1>
      <n-grid x-gap="12" :cols="cols" :y-gap="8">
        <n-gi v-for="(_, i) in 12" :key="i">
          <n-skeleton h-42 rounded-2xl />
        </n-gi>
      </n-grid>
    </div>
    <div v-else p-4>
      <h1 text-2xl mb-4 class="text-color">
        所有板块
      </h1>
      <n-grid x-gap="12" :cols="cols" :y-gap="8">
        <n-gi v-for="(item, i) in items" :key="i">
          <SectionItem :data="item" :refresh="getData" />
        </n-gi>
      </n-grid>
    </div>
    <div v-if="hasMore" flex justify-center items-center>
      <n-button ghost :loading="loading" @click="handleMore">
        加载更多
      </n-button>
    </div>
  </div>
</template>

<style scoped>
.text-color {
  color: #162C4E;
}
</style>
