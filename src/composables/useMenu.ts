import { useUserStore } from '~/store'

export const useMenu = () => {
  const user = useUserStore()
  interface Menu {
    name: string
    path: string
    icon: string
  }
  const initMenus: Menu[] = [
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
  ]

  const authMenus = [
    {
      name: '板块收藏',
      path: '/collection',
      icon: 'i-carbon-star',
    },
    {
      name: '我的关注',
      path: '/follow',
      icon: 'i-carbon-user-favorite',
    },
  ]

  const menus = ref<Menu[]>(initMenus)
  watchEffect(() => {
    if (user.isExist)
      menus.value = menus.value.concat(authMenus)
    else
      menus.value = initMenus
  })

  return menus
}
