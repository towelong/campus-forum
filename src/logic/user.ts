import { useFetch } from '~/request'

export const userLogin = () => {
  const model = ref({
    username: '',
    password: '',
  })
  const {
    post, data, statusCode, execute, error,
  } = useFetch('/user/login',
    { immediate: false }).json()

  watchEffect(() => {
    post(model.value)
  })

  return {
    model,
    data,
    error,
    statusCode,
    execute,
  }
}
