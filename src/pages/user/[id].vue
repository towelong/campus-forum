<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { cancelFollow, follow, getFollowList, getSectionByPostId, getUserDetail } from '~/logic'
import type { Follow } from '~/models/follow'
import { fromNow } from '~/utils/time'
const props = defineProps<{
  id: string
}>()
const router = useRouter()
const message = useMessage()
const {
  data,
  error,
  isFetching,
  isFinished,
  id,
} = getUserDetail(props.id)
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    // query()
    if (newValue.startsWith('/user/')) {
      const newId = newValue.replaceAll('/user/', '')
      id.value = newId
    }
  })

async function gotoPost(id: string) {
  const { data, execute } = getSectionByPostId(id)
  await execute()
  router.push(`/post/${id}?forum=${data.value.id}&name=${data.value.name}`)
}
const isFollow = ref(false)
const toggleFollow = useToggle(isFollow)
async function handleFollow(id: number) {
  const { data, execute, statusCode } = follow(id)
  await execute()
  if (statusCode.value === 201) {
    message.success('关注成功')
    toggleFollow()
  }
  else { message.error(data.value.message) }
}

const follows = ref<Follow[]>()

const {
  followList,
  followFinished,
  followFetching,
  execute,
} = getFollowList(props.id)
async function getFollows() {
  await execute()
  follows.value = followList.value.items as Follow[]
}

async function handleTabs(value: string) {
  if (value === 'follow')
    await getFollows()
}

async function handleCancelFollow(id: number) {
  const res = await cancelFollow(id)
  // console.log(res.data)
}

</script>
<template>
  <n-card>
    <div v-if="isFetching || error" flex justify-between>
      <n-skeleton height="100px" circle />
      <div flex-1 flex items-center ml-1>
        <n-space flex-1 vertical>
          <n-skeleton text style="width: 60%" />
          <n-skeleton text :repeat="2" />
        </n-space>
      </div>
    </div>
    <div v-if="isFinished" flex justify-between>
      <div>
        <n-avatar round :size="100" :src="data.avatar" />
      </div>

      <div flex-1 ml-2 flex flex-col justify-around>
        <p px-1>
          {{ data.nickname }}
        </p>
        <div>
          <n-tag type="success">
            普通用户
          </n-tag>
        </div>
      </div>
      <div>
        <n-button type="primary" ghost @click="handleFollow(parseInt(props.id))">
          关注
        </n-button>
        <!-- <n-button type="primary" ghost>
          编辑个人资料
        </n-button> -->
      </div>
    </div>
  </n-card>
  <n-card>
    <div v-if="isFetching" flex-1 flex items-center ml-1>
      <n-space flex-1 vertical>
        <n-skeleton text style="width: 60%" />
        <n-skeleton text :repeat="3" />
      </n-space>
    </div>
    <n-tabs v-if="isFinished" type="line" animated @update:value="handleTabs">
      <n-tab-pane name="post" tab="帖子">
        <template v-if="isFinished">
          <n-list v-for="(post) in data.posts.items" :key="post.post_id" bordered>
            <n-list-item>
              <div flex justify-between items-center @click="gotoPost(post.post_id)">
                <n-button quaternary>
                  {{ post.title }}
                </n-button>
                <p>{{ fromNow(post.create_time) }}</p>
              </div>
            </n-list-item>
          </n-list>
        </template>
      </n-tab-pane>

      <n-tab-pane name="follow" tab="关注">
        <div v-if="followFetching" flex-1 flex items-center ml-1>
          <n-space flex-1 vertical>
            <n-skeleton text style="width: 60%" />
            <n-skeleton text :repeat="3" />
          </n-space>
        </div>
        <template v-if="followFinished">
          <template v-if="follows?.length === 0">
            <n-empty description="你什么也找不到" />
          </template>
          <n-list v-for="fl in follows" :key="fl.user_id" bordered>
            <n-list-item>
              <div flex justify-between items-center>
                <div flex items-center>
                  <n-avatar round :size="70" :src="fl.avatar" />
                  <p ml-2>
                    {{ fl.nickname }}
                  </p>
                </div>
                <div>
                  <n-button v-if="!fl.followed" type="primary" ghost px-6 @click="handleFollow(fl.user_id)">
                    关注
                  </n-button>
                  <n-button v-else type="primary" px-6 @click="handleCancelFollow(fl.user_id)">
                    已关注
                  </n-button>
                </div>
              </div>
            </n-list-item>
          </n-list>
        </template>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<style scoped>
</style>
