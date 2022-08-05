<script setup lang="ts">
import type { FormInst, FormRules, LayoutInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { userLogin } from '~/logic'
import { useUserStore } from '~/store'

const message = useMessage()
const { model, execute, data, statusCode } = userLogin()
const user = useUserStore()
// const router = useRouter()
interface Menu {
  name: string
  path: string
  icon: string
}
const menus: Menu[] = [
  {
    name: '首页',
    path: '/',
    icon: 'i-carbon-home',
  },
  {
    name: '所有板块',
    path: '/forum',
    icon: 'i-carbon-template',
  },
  {
    name: '板块收藏',
    path: '/collection',
    icon: 'i-carbon-star',
  },
  {
    name: '关注',
    path: '/follow',
    icon: 'i-carbon-user-favorite',
  },
]

const showModal = ref(false)
const toggleModal = useToggle(showModal)

const formRef = ref<FormInst | null>(null)
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
}
const contentRef = ref<LayoutInst | null>(null)
provide('contentRef', contentRef)
const login = async(e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async(errors) => {
    if (!errors) {
      await execute()
      if (statusCode.value === 200) {
        message.success('登录成功！')
        user.save(data.value)
        toggleModal()
      }
      else {
        message.error(data.value.message)
        model.value = {
          username: '',
          password: '',
        }
      }
    }
    else {
      message.error('请输入必填项')
    }
  })
}
</script>
<template>
  <n-layout h-screen>
    <n-layout-header style="height: 64px;" flex flex-col justify-center bordered>
      <div flex items-center justify-between>
        <!-- left  -->
        <div w-55 flex px-2>
          <div flex items-center>
            <p i-carbon-ibm-z-cloud-mod-stack text-2xl />
            <p font-serif ml-2 text-2xl>
              Cloud Shadow
            </p>
          </div>
        </div>
        <!-- right -->
        <div flex flex-1 justify-between px-4>
          <div flex items-center>
            <n-input-group>
              <n-input placeholder="搜索板块、帖子、用户" />
              <n-button type="primary" ghost>
                搜索
              </n-button>
            </n-input-group>
          </div>
          <div flex items-center justify-center>
            <div flex>
              <p v-if="!user.user" mx-6 @click="toggleModal()">
                注册/登录
              </p>
              <p v-else mx-6 @click="toggleModal()">
                退出
              </p>
              <p mx-6>
                帮助中心
              </p>
              <n-modal
                v-model:show="showModal"
                preset="card"
                :auto-focus="false"
                :mask-closable="false"
                style="width: 360px;"
              >
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
                      <n-button
                        type="primary" block secondary strong
                        @click="login"
                      >
                        登录
                      </n-button>
                    </n-form>
                  </n-tab-pane>
                  <n-tab-pane name="signup" tab="注册">
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
                      <n-form-item label="重复密码" path="password">
                        <n-input
                          v-model:value="model.password"
                          type="password" placeholder="请再次输入密码"
                          show-password-on="click"
                        />
                      </n-form-item>
                      <n-button type="primary" block secondary strong>
                        注册
                      </n-button>
                    </n-form>
                  </n-tab-pane>
                </n-tabs>
              </n-modal>
            </div>
          </div>
        </div>
      </div>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px" has-sider class="bg-[#F4F5F8]">
      <n-layout-sider
        bordered show-trigger collapse-mode="width"
        :native-scrollbar="false" :collapsed-width="16"
        :width="220" mr-4 mb-2
      >
        <router-link v-for="menu in menus" :key="menu.path" :to="menu.path">
          <div flex="~" items-center mx-4 px-1 py-2 my-1 rounded class="hover:bg-[#F4F5F7]">
            <p :class="menu.icon" text-xl />
            <p ml-2>
              {{ menu.name }}
            </p>
          </div>
        </router-link>
      </n-layout-sider>
      <n-layout ref="contentRef" content-style="padding:10px 20px 20px 0;" :native-scrollbar="false" class="bg-[#F4F5F8]">
        <slot />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.router-link-active {
  color: #1A9F58;
}
</style>
