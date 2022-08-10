<script setup lang="ts">
import { getSectionByPostId, getUserDynamic } from '~/logic'
import type { UserDynamic } from '~/models/follow'
import { fromNow } from '~/utils/time'

const router = useRouter()
const dynamicList = ref<UserDynamic[]>([])
const result = ref()
const loading = ref(true)
const more = ref(false)
const page = ref(1)

async function getUserDynamicList() {
  loading.value = true
  const res = await getUserDynamic(page.value)
  dynamicList.value = res.items
  result.value = res
  loading.value = false
}

async function loadMore() {
  more.value = true
  page.value++
  const res = await getUserDynamic(page.value)
  dynamicList.value = dynamicList.value.concat(res.items)
  result.value = res
  more.value = false
}

onMounted(async() => {
  await getUserDynamicList()
})

async function gotoPost(id: number) {
  const { data, execute } = getSectionByPostId(id.toString())
  await execute()
  router.push(`/post/${id}?forum=${data.value.id}&name=${data.value.name}`)
}
</script>

<template>
  <n-card>
    <div v-if="loading" flex-1 flex items-center ml-1>
      <n-space flex-1 vertical>
        <n-skeleton text style="width: 60%" />
        <n-skeleton text :repeat="3" />
      </n-space>
    </div>
    <template v-else>
      <n-empty v-if="dynamicList.length == 0" description="你什么也找不到" />
      <n-list v-for="(item) in dynamicList" :key="`user-${item.user_id}`" bordered>
        <n-list-item>
          <div flex items-center @click="router.push('/user/'+item.user_id)">
            <n-space :vertical="false">
              <n-avatar :src="item.avatar" />
              <p cursor-pointer>
                <span text-emerald-700>{{ item.nickname }}</span>
                发表了帖子
              </p>
            </n-space>
          </div>
        </n-list-item>
        <n-list-item>
          <div flex justify-between items-center @click="gotoPost(item.post_id)">
            <p hover:text-emerald-700 cursor-pointer>
              {{ item.title }}
            </p>
            <p>{{ fromNow(item.create_time) }}</p>
          </div>
        </n-list-item>
      </n-list>
      <div v-if="dynamicList.length < result.total" flex py-2 justify-center>
        <div v-if="more" flex-1 flex items-center ml-1>
          <n-space flex-1 vertical>
            <n-skeleton text style="width: 60%" />
            <n-skeleton text :repeat="3" />
          </n-space>
        </div>
        <n-button :loading="more" @click="loadMore">
          加载更多
        </n-button>
      </div>
    </template>
  </n-card>
</template>
