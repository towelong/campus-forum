<script setup lang="ts">

</script>
<template>
  <div p-4>
    <h1 text-2xl mb-4 class="text-color">
      所有板块
    </h1>
    <n-grid x-gap="12" :cols="3" :y-gap="8">
      <n-gi v-for="(_, i) in 20" :key="i">
        <SectionItem />
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.text-color {
  color: #162C4E;
}
</style>
