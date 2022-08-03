<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  last: string
}>(), {
  name: '李四',
  last: '2020-01-01 13:14:15',
})
</script>

<template>
  <div flex flex-col text-sm justify-between>
    <p hover:text-emerald-700 cursor-pointer>
      {{ props.name }}
    </p>
    <p text-xs text-neutral mt-1>
      {{ props.last }}
    </p>
  </div>
</template>
