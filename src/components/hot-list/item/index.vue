<script setup lang="ts">

const props = defineProps<{
  postId: number
  total: number
  title: string
}>()
const router = useRouter()

function gotoPost(id: number) {
  router.push(`/post/${id}`)
}
</script>
<template>
  <n-list-item>
    <div flex>
      <div text-emerald-700 flex items-center mr-1>
        <p i-carbon-fire />
        <p>{{ props.total }}</p>
      </div>
      <p
        hover:underline="~ offset-4" cursor-pointer
        @click="gotoPost(props.postId)"
      >
        {{ props.title }}
      </p>
    </div>
  </n-list-item>
</template>
<style scoped>
</style>
