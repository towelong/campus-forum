<script setup lang="ts">

</script>

<template>
  <div mx-10 mt-4 flex justify-between>
    <div flex-1>
      <n-grid x-gap="12" :cols="2">
        <n-gi v-for="(_, i) in 10" :key="i">
          <n-card
            title="全站十大" :segmented="{
              content: true,
            }"
            mb-6
          >
            <template #header-extra>
              更多
            </template>
            卡片内容
          </n-card>
        </n-gi>
      </n-grid>
    </div>
    <div w-70 ml-10 flex flex-col>
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
