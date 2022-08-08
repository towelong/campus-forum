<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { getCaptcha, userLogin, userRegister } from '~/logic'
import { useUserStore } from '~/store'

const props = defineProps<{
  toggle: () => void
}>()

const message = useMessage()
const {
  captchaData, captchaExecute, captchaError, captchaFinished,
} = getCaptcha()
const { model, execute, data, statusCode, isFetching } = userLogin()
const {
  registerModel,
  registerExecute,
  resetRegisterForm,
  registerData,
  registerStatusCode,
  registerFetching,
}
= userRegister()
const user = useUserStore()
const formRef = ref<FormInst | null>(null)
const registerFormRef = ref<FormInst | null>(null)

function validatePassword(rule: FormItemRule, value: string): boolean {
  return value === registerModel.value.password
}

const rules: FormRules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur', 'input'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur', 'input'],
  },
  capture: {
    required: true,
    message: '请输入验证码',
    trigger: ['blur', 'input'],
  },
}
const registerRules: FormRules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur', 'input'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur', 'input'],
  },
  confirm_password: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePassword,
      message: '两次密码输入不一致',
      trigger: ['input', 'blur'],
    },
  ],
  nickname:
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'input'],
    },
}

const login = async(e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async(errors) => {
    if (!errors) {
      model.value.tag = captchaData.value.tag
      await execute()
      if (statusCode.value === 200) {
        message.success('登录成功！')
        user.save(data.value)
        props.toggle()
      }
      else {
        message.error(data.value.message)
        model.value = {
          username: '',
          password: '',
          captcha: '',
          tag: '',
        }
      }
    }
    else {
      message.error('请输入必填项')
    }
  })
}
const register = async(e: MouseEvent) => {
  e.preventDefault()
  registerFormRef.value?.validate(async(errors) => {
    if (!errors) {
      await registerExecute()
      if (registerStatusCode.value === 201) {
        message.success('注册成功！')
      }
      else {
        message.error(registerData.value.message)
        resetRegisterForm()
      }
    }
    else {
      message.error('请输入必填项')
    }
  })
}
</script>
<template>
  <n-tabs default-value="signin" size="large" justify-content="space-evenly">
    <n-tab-pane name="signin" tab="登录">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="model.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="model.password"
            type="password" placeholder="请输入密码"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item label="验证码" path="captcha">
          <div flex items-center justify-between flex-1>
            <n-input
              v-model:value="model.captcha"
              flex-1
              placeholder="请输入验证码"
              show-password-on="click"
            />
            <img
              v-if="captchaFinished && !captchaError" pl-2 w-20 h-8
              :src="captchaData.image" @click="captchaExecute()"
            >
          </div>
        </n-form-item>
        <n-button
          type="primary" block secondary strong
          :loading="isFetching"
          @click="login"
        >
          登录
        </n-button>
      </n-form>
    </n-tab-pane>
    <!-- 注册 -->
    <n-tab-pane name="signup" tab="注册">
      <n-form
        ref="registerFormRef"
        :model="registerModel" :rules="registerRules"
      >
        <n-form-item label="昵称" path="nickname">
          <n-input v-model:value="registerModel.nickname" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="registerModel.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="registerModel.password"
            type="password" placeholder="请输入密码"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item label="重复密码" path="confirm_password">
          <n-input
            v-model:value="registerModel.confirm_password"
            type="password" placeholder="请再次输入密码"
            show-password-on="click"
          />
        </n-form-item>
        <n-button
          type="primary" block secondary strong
          :loading="registerFetching"
          @click="register"
        >
          注册
        </n-button>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>
<style scoped>
</style>
