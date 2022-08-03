import { useFetch } from '~/request'

export const userLogin = () => {
  const username = ref('')
  const password = ref('')

  const { data, error, statusCode } = useFetch('/user/login', { immediate: true }).json()

  return {
    username,
    password,
    data,
    error,
    statusCode,
  }
}
