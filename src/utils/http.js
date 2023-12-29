// axios 基础配置封装
import axios from "axios"
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/user"
import router from '@/router'

// axios.create()可以执行多次，每次执行都会生成一个新的实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
})

// 拦截器
httpInstance.interceptors.request.use(config => {
  // 从pinia获取token数据
  const userStore = useUserStore()
  // 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误处理
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  // 401 token失效处理
  if(e.response.status === 401) {
    const userStore = useUserStore()
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

// 导出封装实例
export default httpInstance
