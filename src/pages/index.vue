<script setup lang="ts">
import { getHotSpot, getSectionByPostId, getSectionPostBySectionId } from '~/logic'
import type { Hot, Post } from '~/models/home'

const hots = ref<Hot[]>([])
const lostThings = ref<Post[]>([])
const loading = ref(false)
const router = useRouter()

onMounted(async() => {
  loading.value = true
  const res = await getHotSpot()
  const lost = await getSectionPostBySectionId(2)
  hots.value = res
  lostThings.value = lost
  loading.value = false
})
async function gotoPost(id: number) {
  const { data, execute } = getSectionByPostId(id.toString())
  await execute()
  router.push(`/post/${id}?forum=${data.value.id}&name=${data.value.name}`)
}
</script>

<template>
  <div mx-1 mt-4 flex justify-between>
    <div flex-1>
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card
            title="全站十大" :segmented="{
              content: true,
            }"
            mb-6
          >
            <skeleton v-if="loading" />
            <hot-list v-else :hots="hots" />
          </n-card>
        </n-gi>

        <n-gi>
          <n-card
            title="全站十大" :segmented="{
              content: true,
            }"
            mb-6
          >
            卡片内容
          </n-card>
        </n-gi>
      </n-grid>
    </div>
    <div w-70 ml-6 flex flex-col>
      <n-card
        title="失物招领" :segmented="{
          content: true,
        }"
        mb-6
      >
        <template #header-extra>
          <p
            hover:text-emerald-700 cursor-pointer
            @click="router.push('/forum/detail/2')"
          >
            更多
          </p>
        </template>
        <skeleton v-if="loading" />
        <n-list v-else bordered>
          <template v-for="lostThing in lostThings" :key="lostThing.post_id">
            <n-list-item>
              <p
                hover:text-emerald-700 cursor-pointer
                @click="gotoPost(lostThing.post_id)"
              >
                {{ lostThing.title }}
              </p>
            </n-list-item>
          </template>
        </n-list>
      </n-card>
      <n-card
        title="热门版面" :segmented="{
          content: true,
        }"
        mb-6
      >
        <template #header-extra>
          更多
        </template>
        卡片内容
      </n-card>
    </div>
  </div>
</template>
