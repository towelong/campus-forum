<script setup lang="ts">
import { getSectionByPostId } from '~/logic'

const props = defineProps<{
  postId: number
  total: number
  title: string
}>()
const router = useRouter()

async function gotoPost(id: number) {
  const { data, execute } = getSectionByPostId(id.toString())
  await execute()
  router.push(`/post/${id}?forum=${data.value.id}&name=${data.value.name}`)
}
</script>
<template>
  <div flex items-center border-1 border-coolGray-200 py-1 my-1>
    <div text-emerald-700 px-2 flex items-center>
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
</template>
<style scoped>
</style>
