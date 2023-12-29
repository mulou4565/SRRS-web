import { loginAPI } from "@/api/login";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const userInfo = ref([])
  // 登录
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({account, password})
    userInfo.value = res.result
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  // token持久化缓存进行存储 pinia-plugin-persistedstate
  // 本地同步数据状态
  persist: true,
})