<script setup lang="ts">
import { getSectionByPostId, getUserDynamic } from '~/logic'
import type { UserDynamic } from '~/models/follow'
import { fromNow } from '~/utils/time'

const router = useRouter()
const dynamicList = ref<UserDynamic[]>([])

async function getUserDynamicList() {
  const res = await getUserDynamic()
  dynamicList.value = res.items
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
    <div v-if="dynamicList.length == 0" flex-1 flex items-center ml-1>
      <n-space flex-1 vertical>
        <n-skeleton text style="width: 60%" />
        <n-skeleton text :repeat="3" />
      </n-space>
    </div>
    <template v-else>
      <n-list v-for="(item) in dynamicList" :key="`user-${item.user.id}`" bordered>
        <n-list-item v-if="item.posts.length > 0">
          <div flex items-center @click="router.push('/user/'+item.user.id)">
            <n-space :vertical="false">
              <n-avatar :src="item.user.avatar" />
              <p cursor-pointer>
                <span text-emerald-700>{{ item.user.nickname }}</span>
                发表了帖子
              </p>
            </n-space>
          </div>
        </n-list-item>
        <template v-for="post in item.posts" :key="`post-${post.post_id}`">
          <n-list-item>
            <div flex justify-between items-center @click="gotoPost(post.post_id)">
              <p hover:text-emerald-700 cursor-pointer>
                {{ post.title }}
              </p>
              <p>{{ fromNow(post.create_time) }}</p>
            </div>
          </n-list-item>
        </template>
      </n-list>
    </template>
  </n-card>
</template>
