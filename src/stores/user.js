import { loginAPI } from "@/api/login"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useCartStore } from "./cart"
import { mergeCartAPI } from "@/api/cart"

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref([])

  // 登录
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({account, password})
    userInfo.value = res.result
    // 合并购物车操作
    // map 根据一个现有的数组，经过一定的映射得到一个新数组
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        stuId: item.stuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateCartList()
  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的action
    cartStore.clearCart()
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