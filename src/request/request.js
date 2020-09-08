import qs from 'qs'
import axios from './api.request'
import { toLoginPage } from '@/utils/tools'
export default ({ functionId, data = {}, method = 'get', appId = 'paimai' }) => {
  const params = {
    method
  }
  if (method === 'post') {
    params.url = '/api'
    params.data = qs.stringify({
      appid: appId,
      functionId,
      body: JSON.stringify(data)
    })
  } else {
    params.url = `/api?appid=${appId}&functionId=${functionId}&body=${JSON.stringify(
      data
    )}&time=${Date.now()}`
  }
  return axios.request(params).then((res = {}) => {
    // console.log(res)
    const { data: result, status } = res
    if (status === 200) {
      const { data, message, resultCode } = result
      if (resultCode === '0000') {
        return data
      } else if (resultCode === '0005') {
        // 未登录
        toLoginPage()
      } else {
        return Promise.reject(new Error(message || '请求失败，请稍后再试'))
      }
    } else {
      return Promise.reject(new Error('请求失败，请稍后再试'))
    }
  })
}
