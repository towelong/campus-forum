<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { cancelCollect, collect } from '~/logic'
import { _delete } from '~/request/axios'
import { useUserStore } from '~/store/user'

const router = useRouter()
const message = useMessage()
const go = (id: number) => {
  if (id)
    router.push(`/forum/detail/${id}`)
}

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
    is_collected: boolean
  }
  refresh: () => void
}>()

const star = ref(props.data.is_collected)
const toggleStar = useToggle(star)

const userStore = useUserStore()
const sectionId = ref(props.data.id)

async function stared() {
  const res = await collect(sectionId)
  if (res.code === 1)
    toggleStar()
  else message.error(res.message)
}

async function cancel() {
  sectionId.value = props.data.id
  const res = await cancelCollect(sectionId)
  if (res.code === 3) {
    await props.refresh()
    toggleStar()
  }
  else { message.error(res.message) }
}

async function handleDelete() {
  const res = await _delete(`/section/info/${props.data.id}`)
  if (res.code === 3) {
    message.success('删除成功')
    await props.refresh()
  }
}

</script>

<template>
  <div class="card h-46" flex="~ col" p-6 @click="go(props.data.id)">
    <div flex items-center justify-between>
      <img
        rounded w-10 h-10 mb-2
        :src="props.data.logo"
      >
      <template v-if="userStore.isExist">
        <div flex gap-1>
          <p v-if="userStore.user.id === 1" i-carbon-edit @click.stop="router.push(`/forum/edit/${props.data.id}`)" />
          <p v-if="userStore.user.id === 1" i-carbon-row-delete @click.stop="handleDelete" />
          <p v-if="!star" i-carbon-star @click.stop="stared" />
          <p v-else i-carbon-star-filled text-yellow @click.stop="cancel" />
        </div>
      </template>
    </div>
    <p class="text-color mb-2 lg:text-xl">
      {{ props.data.name }}
    </p>
    <p mb-2 text-xs lg:text-sm>
      <n-ellipsis :line-clamp="2">
        {{ props.data.info }}
      </n-ellipsis>
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
  /* background-color: rgba(0, 128, 0, 0.12); */
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
}
</style>
