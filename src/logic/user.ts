import { useAuthFetch, useFetch } from '~/request'
import { useUserStore } from '~/store'
import { _delete } from '~/request/axios'

export const userLogin = () => {
  const model = ref({
    username: '',
    password: '',
    captcha: '',
    tag: '',
  })

  const {
    data, statusCode, execute, error,
    isFetching, isFinished, post,
  } = useFetch('/user/login', { immediate: false }).json()

  watchEffect(() => {
    post(model.value)
  })

  return {
    model,
    data,
    statusCode,
    execute,
    error,
    isFetching,
    isFinished,
  }
}

export const getCaptcha = () => {
  const {
    data, statusCode, execute, error, isFetching, isFinished,
  } = useFetch('/user/captcha').post().json()
  return {
    captchaData: data,
    captchaStatusCode: statusCode,
    captchaExecute: execute,
    captchaError: error,
    captchaFetching: isFetching,
    captchaFinished: isFinished,
  }
}

export const userRegister = () => {
  const model = ref({
    nickname: '',
    username: '',
    password: '',
    confirm_password: '',
    email: '', // optional
  })
  const {
    post, data, execute, error, statusCode, isFetching,
  } = useFetch('/user/register',
    { immediate: false }).json()

  watchEffect(() => {
    post(model.value)
  })

  function resetRegisterForm() {
    model.value = {
      nickname: '',
      username: '',
      password: '',
      confirm_password: '',
      email: '', // optional
    }
  }

  return {
    registerModel: model,
    registerData: data,
    registerStatusCode: statusCode,
    registerError: error,
    registerExecute: execute,
    resetRegisterForm,
    registerFetching: isFetching,
  }
}

export function getUserDetail(i: string) {
  const page = ref(1)
  const count = ref(10)
  const id = ref(i)

  const prefix = '/user'
  const initurl = `${prefix}/${id.value}?page=${page.value - 1}&count=${count.value}`

  const url = ref(initurl)

  const {
    data,
    isFetching,
    isFinished,
    error,
    execute,
  } = useFetch(url, { refetch: true }).get().json()

  watch([page, id],
    (value) => {
      const query = `page=${value[0] - 1}`
      url.value = `${prefix}/${value[1]}?${query}&count=${count.value}`
    },
  )

  return {
    data,
    query: execute,
    isFetching,
    isFinished,
    error,
    page,
    count,
    id,
  }
}

export const follow = (id: number) => {
  const userStore = useUserStore()
  const { data, execute, post, statusCode } = useAuthFetch('/user/follow', { immediate: false }).json()
  watchEffect(() => {
    post({
      user_id: userStore.user.id,
      followed_user_id: id,
    })
  })
  return { data, execute, statusCode }
}

export const getFollowList = (id: string) => {
  const userStore = useUserStore()
  let url = `/user/follow/${id}`
  if (userStore.isExist)
    url = `${url}?current=${userStore.user.id}`

  const {
    data, execute,
    statusCode, isFinished, isFetching, error,
  } = useFetch(url, { immediate: false }).get().json()

  return {
    followList: data,
    execute,
    statusCode,
    followFinished: isFinished,
    followFetching: isFetching,
    followError: error,
  }
}

export const cancelFollow = async(id: number) => {
  const userStore = useUserStore()
  const res = await _delete('/user/follow', {
    user_id: userStore.user.id,
    followed_user_id: id,
  })
  return res
}
