<script setup lang="ts">
import { getSectionByPostId, getUserDetail } from '~/logic'
import { fromNow } from '~/utils/time'
const props = defineProps<{
  id: string
}>()
const router = useRouter()
const {
  data,
  // execute,
  error,
  isFetching,
  isFinished,
} = getUserDetail(props.id)
async function gotoPost(id: string) {
  const { data, execute } = getSectionByPostId(id)
  await execute()
  router.push(`/post/${id}?forum=${data.value.id}&name=${data.value.name}`)
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
        <n-avatar
          round
          :size="100"
          :src="data.avatar"
        />
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
        <n-button type="primary" ghost>
          编辑个人资料
        </n-button>
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
    <n-tabs v-if="isFinished" type="line" animated>
      <n-tab-pane name="post" tab="帖子">
        <n-list
          v-for="(post) in data.posts.items" :key="post.post_id"
          bordered
        >
          <n-list-item>
            <div flex justify-between items-center @click="gotoPost(post.post_id)">
              <n-button quaternary>
                {{ post.title }}
              </n-button>
              <p>{{ fromNow(post.create_time) }}</p>
            </div>
          </n-list-item>
        </n-list>
      </n-tab-pane>

      <n-tab-pane name="follow" tab="关注">
        <n-list bordered>
          <n-list-item>
            <div flex justify-between items-center>
              <div flex items-center>
                <n-avatar
                  round
                  :size="70"
                  src="https://p3-passport.byteacctimg.com/img/user-avatar/73fd7785126ca8b41deb62360ff6f482~300x300.image"
                />
                <p ml-2>
                  WeLong
                </p>
              </div>
              <div>
                <n-button type="primary" ghost px-6>
                  关注
                </n-button>
              </div>
            </div>
          </n-list-item>
        </n-list>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<style scoped>
</style>
