import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { useMessage } from 'naive-ui'
import { apiBaseUrl } from '~/composables'
import { useUserStore } from '~/store'

const nIMessage = useMessage()
const config = {
  baseURL: apiBaseUrl,
  timeout: 5 * 1000, // 请求超时时间设置
  crossDomain: true,
  // withCredentials: true, // Check cross-site Access-Control
  // 定义可获得的http响应状态码
  // return true、设置为null或者undefined，promise将resolved,否则将rejected
  validateStatus(status: number) {
    return status >= 200 && status < 510
  },
}

function refreshTokenException(code: number) {
  const codes = [10000, 10042, 10050, 10052, 10012]
  return codes.includes(code)
}

// 创建请求实例
const _axios = axios.create(config)

_axios.interceptors.request.use(
  (originConfig: AxiosRequestConfig) => {
    const reqConfig = { ...originConfig }

    // step1: 容错处理
    if (!reqConfig.url)
      console.error('request need url')

    reqConfig.method = reqConfig?.method?.toLowerCase() // 大小写容错

    // 参数容错
    if (reqConfig.method === 'get') {
      if (!reqConfig.params)
        reqConfig.params = reqConfig.data || {}
    }
    else if (reqConfig.method === 'post') {
      if (!reqConfig.data)
        reqConfig.data = reqConfig.params || {}

      // 检测是否包含文件类型, 若包含则进行 formData 封装
      let hasFile = false
      Object.keys(reqConfig.data).forEach((key) => {
        if (typeof reqConfig.data[key] === 'object') {
          const item = reqConfig.data[key]
          if (item instanceof FileList || item instanceof File || item instanceof Blob)
            hasFile = true
        }
      })

      // 检测到存在文件使用 FormData 提交数据
      if (hasFile) {
        const formData = new FormData()
        Object.keys(reqConfig.data).forEach((key) => {
          formData.append(key, reqConfig.data[key])
        })
        reqConfig.data = formData
      }
    }

    // step2: permission 处理
    if (reqConfig.url === 'user/refresh') {
      const user = useUserStore()
      const refreshToken = user.refreshToken
      if (refreshToken)
        reqConfig!.headers!.Authorization = refreshToken
    }
    else {
      const user = useUserStore()
      const accessToken = user.accessToken
      if (accessToken)
        reqConfig!.headers!.Authorization = accessToken
    }

    return reqConfig
  },
  error => Promise.reject(error),
)

// Add a response interceptor
_axios.interceptors.response.use(
  async(res: AxiosResponse) => {
    if (res.status.toString().charAt(0) === '2')
      return res.data

    const { code, message } = res.data
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      let tipMessage = ''
      const { url } = res.config

      // refresh_token 异常，直接登出
      if (refreshTokenException(code)) {
        setTimeout(() => {
          const user = useUserStore()
          user.logout()
          const { origin } = window.location
          window.location.href = origin
        }, 1500)
        return resolve(null)
      }
      // assessToken相关，刷新令牌
      if (code === 10041 || code === 10051) {
        const cache = { url: '' }
        if (cache.url !== url) {
          cache.url = url as string
          const refreshResult = await _axios('user/refresh')
          const user = useUserStore()
          user.saveAccessToken((refreshResult as any).access_token)
          // 将上次失败请求重发
          const result = await _axios(res.config)
          return resolve(result)
        }
      }

      // 弹出信息提示的第一种情况：直接提示后端返回的异常信息（框架默认为此配置）；
      // 特殊情况：如果本次请求添加了 handleError: true，用户自行通过 try catch 处理，框架不做额外处理
      // if (res.config.handleError)
      //   return reject(res)

      if (typeof message === 'string')
        tipMessage = message

      if (Object.prototype.toString.call(message) === '[object Object]')
        [tipMessage] = Object.values(message).flat() as string[]

      if (Object.prototype.toString.call(message) === '[object Array]')
        [tipMessage] = message

      message.error(tipMessage)
      reject(res)
    })
  },
  (error) => {
    if (!error.response)
      nIMessage.error('请检查 API 是否异常')
      // console.log('error', error)

    // 判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout'))
      nIMessage.warning('请求超时')

    return Promise.reject(error)
  },
)

// 导出常用函数
/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url: string, data = {}, params = {}): Promise<any> {
  return _axios({
    method: 'post',
    url,
    data,
    params,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url: string, params = {}): Promise<any> {
  return _axios({
    method: 'get',
    url,
    params,
  })
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url: string, data = {}, params = {}): Promise<any> {
  return _axios({
    method: 'put',
    url,
    params,
    data,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url: string, data = {}, params = {}): Promise<any> {
  return _axios({
    method: 'delete',
    url,
    params,
    data,
  })
}

export default _axios
