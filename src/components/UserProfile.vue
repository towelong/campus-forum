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
    <img
      :src="props.avatar"
      hidden lg:block lg:w-12 lg:h-12 lg:rounded-3xl
    >
    <div flex flex-col text-sm lg:justify-between max-h-12 lg:ml-2>
      <h3 text-xs hover:text-emerald-700 cursor-pointer @click="gotoUser">
        {{ props.name }}
      </h3>
      <p text-xs text-neutral mt-1 hidden lg:block>
        {{ props.time }}
      </p>
    </div>
  </div>
</template>
