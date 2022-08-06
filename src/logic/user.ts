import { useFetch } from '~/request'

export const userLogin = () => {
  const model = ref({
    username: '',
    password: '',
  })
  const {
    post, data, statusCode, execute, error, isFetching,
  } = useFetch('/user/login', { immediate: false }).json()

  watchEffect(() => {
    post(model.value)
  })

  return {
    model,
    data,
    error,
    statusCode,
    execute,
    isFetching,
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
