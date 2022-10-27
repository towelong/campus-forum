<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { get, put } from '~/request/axios'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const data = ref({
  id: null,
  name: '',
  info: '',
})
onMounted(async() => {
  const res = await get(`/section/info/${route.params.id}`)
  data.value = res
})

async function handleSave() {
  const res = await put(`/section/info/${route.params.id}`, data.value)
  if (res.code === 2) {
    message.success('编辑成功')
    router.push('/forum')
  }
}
</script>
<template>
  <n-card title="编辑板块">
    <n-form
      ref="formRef"
      :model="data"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="板块名" path="inputValue">
        <n-input v-model:value="data.name" placeholder="请输入板块名" />
      </n-form-item>
      <n-form-item label="板块介绍" path="textareaValue">
        <n-input
          v-model:value="data.info"
          placeholder="请输入板块介绍"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </n-form-item>
      <n-form-item label=" ">
        <n-button type="primary" ghost @click="handleSave">
          保存
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
<style scoped>

</style>
