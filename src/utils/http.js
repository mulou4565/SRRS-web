// axios 基础配置封装
import axios from "axios"

// axios.create()可以执行多次，每次执行都会生成一个新的实例
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000,
})

// 拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// 响应器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})

// 导出封装实例
export default httpInstance
