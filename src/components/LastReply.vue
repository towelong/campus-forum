<script setup lang="ts">
const props = defineProps<{
  name: string
  last: string
  userId: number
}>()
const router = useRouter()
function gotoUser() {
  if (props.userId !== 0)
    router.push(`/user/${props.userId}`)
}
</script>

<template>
  <div flex flex-col text-sm justify-between>
    <p hover:text-emerald-700 cursor-pointer @click="gotoUser">
      {{ props.name }}
    </p>
    <p text-xs text-neutral mt-1>
      {{ props.last }}
    </p>
  </div>
</template>
