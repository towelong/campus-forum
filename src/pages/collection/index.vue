<script setup lang="ts">
</script>

<template>
  <div p-4>
    <h1 text-2xl mb-4 class="text-color">
      我的收藏
    </h1>
    <n-grid x-gap="12" :cols="4" :y-gap="8" mb-4>
      <n-gi>
        <div class="demo-card text-color text-xl flex justify-center items-center">
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
