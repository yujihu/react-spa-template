import { jsonpAdapter } from '@yolkpie/utils'
import HttpRequest from './axios'
const baseUrl = '//fts.xx.com/area/get'
const axios = new HttpRequest(baseUrl)
/**
 * @description 获取地址列表，如获取某个二级地址下的三级地址里欸包
 * @param {number} [fid=4744] 地址id，4744为获取全国的省份列表
 * @returns
 */
export const getAddress = (fid = 4744) => {
  return axios.request({
    url: '',
    params: {
      fid
    },
    adapter: jsonpAdapter
  }).then((res = {}) => {
    const { data, status } = res
    if (status === 200) {
      return data
    } else {
      Promise.reject(new Error('获取地址列表失败'))
    }
  })
}
