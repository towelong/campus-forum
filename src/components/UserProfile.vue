<script setup lang="ts">
const props = defineProps<{
  userId: number
  avatar: string
  name: string
  time: string
}>()

const router = useRouter()
function gotoUser() {
  router.push(`/user/${props.userId}`)
}
</script>

<template>
  <div flex items-center>
    <img :src="props.avatar" w-6 h-6 rounded-2xl lg:w-12 lg:h-12 lg:rounded-3xl>
    <div flex flex-col text-sm justify-between max-h-12 ml-2>
      <h3 text-xs hover:text-emerald-700 cursor-pointer @click="gotoUser">
        {{ props.name }}
      </h3>
      <p text-xs text-neutral mt-1 hidden lg:block>
        {{ props.time }}
      </p>
    </div>
  </div>
</template>
