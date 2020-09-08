import HttpRequest from './axios'
const baseUrl = process.env.REACT_APP_REQUEST_URL

const axios = new HttpRequest(baseUrl)
export default axios
