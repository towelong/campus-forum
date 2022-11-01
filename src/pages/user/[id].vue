<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { _delete, put } from '~/request/axios'
import { cancelFollow, follow, getFollowList, getSectionByPostId, getUserDetail } from '~/logic'
import type { Follow } from '~/models/follow'
import { useUserStore } from '~/store'
import { fromNow } from '~/utils/time'
const props = defineProps<{
  id: string
}>()
// 局部关注或未关注状态，刷新页面会闪动一下，
// 这样就不用刷新页面，提升用户体验
type followType = '' | 'follow' | 'cancel'
const followStatus = ref<followType>('')
const followListStatus = ref<followType>('')
const showModal = ref(false)
const toggleModal = useToggle(showModal)

const router = useRouter()
const user = useUserStore()
const message = useMessage()
const {
  data,
  error,
  isFetching,
  isFinished,
  id,
  query,
} = getUserDetail(props.id)

watch(isFinished, (value) => {
  if (value)
    useTitle(`${data.value.nickname}的个人主页 - 校园论坛`)
})

async function gotoPost(id: string) {
  const { data, execute } = getSectionByPostId(id)
  await execute()
  router.push(`/post/${id}?forum=${data.value.id}&name=${data.value.name}`)
}

async function handleFollow(id: number) {
  const res = await follow(id)
  if (res.code === 1) {
    message.success('关注成功')
    // await query()
    // 关注成功则开启 `取消关注` 按钮
    followStatus.value = 'cancel'
    followListStatus.value = 'cancel'
  }
  else { message.error(res.message) }
}

const follows = ref<Follow[]>()

const {
  followList,
  followFinished,
  followFetching,
  execute,
  followId,
} = getFollowList(props.id)
async function getFollows() {
  await execute()
  follows.value = followList.value.items as Follow[]
}

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    if (newValue.startsWith('/user/')) {
      const newId = newValue.replaceAll('/user/', '')
      id.value = newId
      followId.value = newId
    }
  },
)

async function handleTabs(value: string) {
  if (value === 'follow')
    await getFollows()
}

async function handleCancelFollow(id: number) {
  const res = await cancelFollow(id)
  if (res.code === 3) {
    message.success('取关成功')
    // await query()
    // 关注成功则开启 `关注` 按钮
    followStatus.value = 'follow'
    followListStatus.value = 'follow'
  }
}

function gotoUser(id: number) {
  router.push(`/user/${id}`)
}

const nickname = ref('')
async function handleChange() {
  const res = await put('/user', {
    nickname: nickname.value,
  })
  if (res.code === 2) {
    showModal.value = false
    data.value.nickname = nickname.value
    message.success('更新成功')
  }
  else { message.error('更新失败') }
}

async function handleDelete(id: number) {
  const res = await _delete(`/post/${id}`)
  if (res.code === 3)
    await query()
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
            {{ data.is_admin ? '管理员' : '普通用户' }}
          </n-tag>
        </div>
      </div>
      <div v-if="parseInt(props.id) != user.user.id">
        <template v-if="followStatus == ''">
          <n-button v-if="!data.followed" type="primary" ghost px-6 @click="handleFollow(parseInt(props.id))">
            关注
          </n-button>
          <n-button v-if="data.followed" type="primary" px-6 @click="handleCancelFollow(parseInt(props.id))">
            取消关注
          </n-button>
        </template>
        <template v-else>
          <n-button v-if="followStatus == 'follow'" type="primary" ghost px-6 @click="handleFollow(parseInt(props.id))">
            关注
          </n-button>
          <n-button v-if="followStatus == 'cancel'" type="primary" px-6 @click="handleCancelFollow(parseInt(props.id))">
            取消关注
          </n-button>
        </template>
      </div>
      <div v-else>
        <n-button type="primary" ghost @click="toggleModal()">
          编辑个人资料
        </n-button>
      </div>
      <n-modal
        v-model:show="showModal" preset="card" :auto-focus="false" title="编辑资料" :mask-closable="false"
        style="width: 360px;"
      >
        <n-form>
          <n-form-item label="昵称">
            <n-input v-model:value="nickname" placeholder="请输入昵称" />
          </n-form-item>
          <div flex justify-center>
            <n-button type="primary" @click="handleChange">
              确认修改
            </n-button>
          </div>
          <!-- <n-form-item label="密码">
            <n-input />
          </n-form-item>
          <n-form-item label="确认密码">
            <n-input />
          </n-form-item> -->
        </n-form>
      </n-modal>
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
          <template v-if="data.posts.items.length === 0">
            <n-empty description="你什么也找不到" />
          </template>
          <n-list v-for="(post) in data.posts.items" :key="post.post_id" bordered>
            <n-list-item>
              <div flex justify-between items-center @click="gotoPost(post.post_id)">
                <p hover:text-emerald-700 cursor-pointer>
                  {{ post.title }}
                </p>
                <div flex justify-around items-center gap-2>
                  <p>{{ fromNow(post.create_time) }}</p>
                  <n-button v-if="parseInt(props.id) == user.user.id" @click.stop="handleDelete(post.post_id)">
                    删除
                  </n-button>
                </div>
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
                  <p ml-2 hover:text-emerald-700 cursor-pointer @click="gotoUser(fl.user_id)">
                    {{ fl.nickname }}
                  </p>
                </div>
                <div>
                  <template v-if="followListStatus == ''">
                    <n-button v-if="!fl.followed" type="primary" ghost px-6 @click="handleFollow(fl.user_id)">
                      关注
                    </n-button>
                    <n-button v-else type="primary" px-6 @click="handleCancelFollow(fl.user_id)">
                      已关注
                    </n-button>
                  </template>
                  <template v-else>
                    <n-button
                      v-if="followListStatus == 'follow'" type="primary" ghost px-6
                      @click="handleFollow(fl.user_id)"
                    >
                      关注
                    </n-button>
                    <n-button
                      v-if="followListStatus == 'cancel'" type="primary" px-6
                      @click="handleCancelFollow(fl.user_id)"
                    >
                      已关注
                    </n-button>
                  </template>
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
