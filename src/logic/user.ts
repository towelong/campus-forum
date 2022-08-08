import { useFetch } from '~/request'

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

export function getUserDetail(id: string) {
  const page = ref(1)
  const count = ref(10)

  const prefix = `/user/${id}`
  const initurl = `${prefix}?page=${page.value - 1}&count=${count.value}`

  const url = ref(initurl)

  const {
    data,
    isFetching,
    isFinished,
    error,
    execute,
  } = useFetch(url, { refetch: true }).get().json()

  watch(page,
    (value) => {
      const query = `page=${value - 1}`
      url.value = `${prefix}?${query}&count=${count.value}`
    },
  )

  return {
    data,
    execute,
    isFetching,
    isFinished,
    error,
    page,
    count,
  }
}
