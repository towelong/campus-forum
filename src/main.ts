import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'

import routes from 'virtual:generated-pages'
import App from './App.vue'

// import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/reset.css'
import 'uno.css'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// // 通用字体
// import 'vfonts/Lato.css'
// // 等宽字体
// import 'vfonts/FiraCode.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition
    else
      return { top: 0 }
  },
})
app.use(pinia)
app.use(router)
app.mount('#app')
