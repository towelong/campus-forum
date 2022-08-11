<script setup lang="ts">
import { getHotSpot } from '~/logic'
import type { Hot } from '~/models/home'

const hots = ref<Hot[]>([])
const loading = ref(false)
onMounted(async() => {
  loading.value = true
  const res = await getHotSpot()
  hots.value = res
  loading.value = false
})

</script>

<template>
  <div mx-1 mt-4 flex justify-between>
    <div flex-1>
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card
            title="全站十大" :segmented="{
              content: true,
            }"
            mb-6
          >
            <n-space v-if="loading" flex-1 vertical>
              <n-skeleton text style="width: 60%" />
              <n-skeleton text :repeat="3" />
            </n-space>
            <hot-list v-else :hots="hots" />
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            title="全站十大" :segmented="{
              content: true,
            }"
            mb-6
          >
            卡片内容
          </n-card>
        </n-gi>
      </n-grid>
    </div>
    <div w-70 ml-6 flex flex-col>
      <n-card
        title="失物招领" :segmented="{
          content: true,
        }"
        mb-6
      >
        <template #header-extra>
          更多
        </template>
        卡片内容
      </n-card>
      <n-card
        title="热门版面" :segmented="{
          content: true,
        }"
        mb-6
      >
        <template #header-extra>
          更多
        </template>
        卡片内容
      </n-card>
    </div>
  </div>
</template>
