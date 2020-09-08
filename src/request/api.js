import request from './request'
import apiConfig from './apiConfig'

const apis = {}

Object.keys(apiConfig).forEach(key => {
  const { functionId, method, appId = 'xxx' } = apiConfig[key]
  apis[key] = data => {
    return request({
      functionId,
      appId,
      data,
      method
    })
  }
})

export default apis
