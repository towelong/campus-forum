<script setup lang="ts">
const router = useRouter()
const go = (id: number) => {
  if (id)
    router.push(`/forum/detail/${id}`)
}
const star = ref(false)
const toggleStar = useToggle(star)

const props = defineProps<{
  data: {
    id: number
    name: string
    info: string
    logo: string
    users: {
      nickname: string
      avatar: string
      src: string
    }[]
  }
}>()

</script>

<template>
  <div class="card" flex="~ col" p-6 @click="go(props.data.id)">
    <div flex items-center justify-between>
      <img
        rounded w-10 h-10 mb-2
        :src="props.data.logo"
      >
      <p v-if="!star" i-carbon-star @click.stop="toggleStar()" />
      <p v-else i-carbon-star-filled text-yellow @click.stop="toggleStar()" />
    </div>
    <p class="text-color mb-2 text-xl">
      {{ props.data.name }}
    </p>
    <p mb-2>
      {{ props.data.info }}
    </p>
    <n-avatar-group :options="props.data.users" :size="30" :max="5" ml-auto>
      <template #avatar="{ option: { nickname, avatar } }">
        <n-tooltip>
          <template #trigger>
            <n-avatar :src="avatar" size="small" />
          </template>
          {{ nickname }}
        </n-tooltip>
      </template>
    </n-avatar-group>
  </div>
</template>

<style scoped>
.card {
  /* height: 168px; */
  /* background-color: rgba(0, 128, 0, 0.12); */
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
}
</style>
