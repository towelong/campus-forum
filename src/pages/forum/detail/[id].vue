<script setup lang="ts">
// import { useMessage } from 'naive-ui'
import { h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage } from 'naive-ui'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import UserProfile from '~/components/UserProfile.vue'
import LastReply from '~/components/LastReply.vue'
import { getSectionDetail } from '~/logic'
import { fromNow } from '~/utils/time'
import { useUserStore } from '~/store'
import ActionGroup from '~/components/ActionGroup.vue'

const user = useUserStore()
const props = defineProps<{ id: string }>()
const message = useMessage()
const router = useRouter()
const title = useTitle()

const handleUpdateValue = (value: string) => {
  message.info(value)
}

const pagination = ref({
  // 每页数量
  pageSize: 10,
  // 总条数
  itemCount: 0,
  page: 1,
})
const detail = ref()
const loading = ref(true)

async function getData(page = 1) {
  loading.value = true
  const res = await getSectionDetail(props.id, page - 1, pagination.value.pageSize)
  detail.value = res
  title.value = `${res.name} - 校园论坛`
  pagination.value.pageSize = res.posts.count
  pagination.value.itemCount = res.posts.total
  loading.value = false
}

onMounted(async() => {
  await getData()
})
async function next(currentPage: number) {
  pagination.value.page = currentPage
  await getData(currentPage)
}

interface List {
  id: number
  title: string
  nickname: string
  avatar: string
  comment_count: number
  last: string
  create_time: string
  last_comment_user: {
    create_time: string
    nickname: string
    id: number
  }
  is_top: boolean
  user_id: number
}

const initCols: DataTableColumns<List> = [
  {
    title: '序号',
    key: 'id',
    render: (row) => {
      if (row.is_top) {
        return h(
          NTag,
          {
            type: 'success',
            size: 'small',
          },
          '置顶',
        )
      }
      else {
        return h(
          'span',
          {},
          row.id,
        )
      }
    },
  },
  {
    title: '标题',
    key: 'title',
    render: (row) => {
      return h(
        'a',
        {
          onClick: () => {
            // message.info(row.title)
            router.push(`/post/${row.id}?forum=${props.id}&name=${detail.value.name}`)
          },
          style: {
            cursor: 'pointer',
          },
          class: ['hover:text-emerald-700'],
        },
        row.title,
      )
    },
  },
  {
    title: '作者',
    key: 'author',
    render: (row) => {
      return h(
        UserProfile,
        {
          userId: row.user_id,
          name: row.nickname,
          avatar: row.avatar,
          time: fromNow(row.create_time),
        },
      )
    },
  },
  {
    title: '回复',
    key: 'comment_count',
  },
  {
    title: '最后评论',
    key: 'last',
    render: (row) => {
      return h(
        LastReply,
        {
          userId: row.last_comment_user ? row.last_comment_user.id : 0,
          last: row.last_comment_user ? `最后评论于${fromNow(row.last_comment_user.create_time)}` : '',
          name: row.last_comment_user ? row.last_comment_user.nickname : '无',
        },
      )
    },
  },
]

const authCols: TableColumn<List> = {
  title: '操作',
  key: 'actions',
  render(row) {
    return h(
      ActionGroup,
      {
        id: row.id,
        refresh: getData,
        isTop: row.is_top,
      },
    )
  },
}

const cols = ref<DataTableColumns<List>>(initCols)
if (user.user.id === 1) {
  const newCols = cols.value
  newCols.push(authCols)
  cols.value = newCols
}

const columns: DataTableColumns<List> = cols.value

const handleBack = () => {
  router.back()
}

const handleEditor = () => {
  router.push(`/editor?fromSection=${props.id}`)
}

const handleToForum = () => {
  router.push('/forum')
}

</script>

<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center">
      <!-- <n-spin size="large" /> -->
      <n-card>
        <n-skeleton text :repeat="8" />
      </n-card>
    </div>
    <div v-else lg:px-2>
      <n-card style="margin-bottom: 16px">
        <template #header>
          <n-page-header @back="handleBack">
            <template #title>
              <p>{{ detail.name }}</p>
            </template>
            <template #header>
              <n-breadcrumb>
                <n-breadcrumb-item @click="handleToForum">
                  所有板块
                </n-breadcrumb-item>
                <n-breadcrumb-item>{{ detail.name }}</n-breadcrumb-item>
              </n-breadcrumb>
            </template>
          </n-page-header>
        </template>
        <template #header-extra>
          <n-button v-if="user.isExist" type="primary" @click="handleEditor">
            发表
          </n-button>
        </template>
        <div flex gap-2 mb-4>
          <p>今日：<span class="p-color">{{ detail.today_total }}</span></p>
          <p>帖数：<span class="p-color">{{ detail.total }}</span></p>
        </div>
        <p mb-4>
          {{ detail.info }}
        </p>
        <n-tabs type="line" animated @update:value="handleUpdateValue">
          <n-tab-pane name="oasis" tab="帖子">
            <n-data-table :columns="columns" :data="detail.posts.items" :bordered="false" :stripe="true" />
            <div flex justify-end pt-2 mr-12>
              <n-pagination
                v-model:page="pagination.page" :item-count="pagination.itemCount"
                :page-size="pagination.pageSize" :on-update:page="next"
              />
            </div>
          </n-tab-pane>
          <!-- <n-tab-pane name="the beatles" tab="精华">
            Hey Jude
            <n-pagination :item-count="200" :page-size="5" />
          </n-tab-pane> -->
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.p-color {
  color: #18A058;
}
</style>
