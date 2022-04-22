<script setup lang="ts">
// import { useMessage } from 'naive-ui'
import { h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage } from 'naive-ui'
import UserProfile from '~/components/UserProfile.vue'
import LastReply from '~/components/LastReply.vue'
const props = defineProps<{ id: string }>()
const message = useMessage()
const handleUpdateValue = (value: string) => {
  // alert(value)
  message.info(value)
}

interface List {
  id: number
  title: string
  author: string
  avatar: string
  reply: number
  last: string
  create: string
  lastReply: string
  isTop: boolean
}
const createColumns = ({
  play,
}: {
  play: (row: List) => void
}): DataTableColumns<List> => {
  return [
    {
      title: '序号',
      key: 'id',
      render: (row) => {
        if (row.isTop) {
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
              message.info(row.title)
            },
            style: {
              cursor: 'pointer',
            },
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
            name: row.author,
            avatar: row.avatar,
            time: row.create,
          },
        )
      },
    },
    {
      title: '回复',
      key: 'reply',
    },
    {
      title: '最后发表',
      key: 'last',
      render: (row) => {
        return h(
          LastReply,
          {
            name: row.lastReply,
            last: row.last,
          },
        )
      },
    },
    // {
    //   title: 'Action',
    //   key: 'actions',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         strong: true,
    //         tertiary: true,
    //         size: 'small',
    //         onClick: () => play(row),
    //       },
    //       { default: () => 'Play' },
    //     )
    //   },
    // },
  ]
}
const data: List[] = [
  { id: 3, title: 'Wonderwall', author: 'Lily', avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', last: '14:18', create: '2021-01-01 14:28', reply: 1001, lastReply: '王五', isTop: true },
  { id: 4, title: 'Don\'t Look Back in Anger', author: 'Lily', avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', create: '2021-01-02 10:28', last: '14:48', reply: 0, lastReply: '王五', isTop: false },
  { id: 12, title: 'champing', author: 'Lily', avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', last: '07:27', create: '2021-01-03 08:28', reply: 67, lastReply: '王五', isTop: false },
]
const columns = createColumns({
  play(row: List) {
    message.info(row.title)
  },
})
const pagination = ref({
  pageSize: 10,
})

const handleBack = () => {
  message.info('返回')
}
</script>

<template>
  <div>
    <p>列表: {{ props.id }} </p>
    <n-card style="margin-bottom: 16px">
      <template #header>
        <n-page-header @back="handleBack">
          <template #title>
            <a
              href="https://anyway.fm/"
              style="text-decoration: none; color: inherit"
            >Anyway.FM</a>
          </template>
          <template #header>
            <n-breadcrumb>
              <n-breadcrumb-item>播客</n-breadcrumb-item>
              <n-breadcrumb-item>精选</n-breadcrumb-item>
              <n-breadcrumb-item>超级精选</n-breadcrumb-item>
              <n-breadcrumb-item>Anyway.FM</n-breadcrumb-item>
            </n-breadcrumb>
          </template>
        </n-page-header>
      </template>
      <template #header-extra>
        <n-button type="primary">
          发表
        </n-button>
      </template>
      <div flex gap-2 mb-4>
        <p>今日：<span class="p-color">1</span></p>
        <p>主题：<span class="p-color">14299</span></p>
        <p>帖数：<span class="p-color">16699</span></p>
      </div>
      <p mb-4>
        本版负责承接【校内】各项活动及热点公告，发表文章前请先仔细阅读本版置顶第一条并严格遵循其所述格式
      </p>
      <n-tabs type="line" animated @update:value="handleUpdateValue">
        <n-tab-pane name="oasis" tab="帖子">
          <n-data-table
            :columns="columns"
            :data="data"
            :pagination="pagination"
            :bordered="false"
            :stripe="true"
          />
        </n-tab-pane>
        <n-tab-pane name="the beatles" tab="精华">
          Hey Jude
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped>
.p-color {
color: #18A058;
}
</style>
