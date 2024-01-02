import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, getNewestCartListAPI, delCartAPI } from '@/api/cart'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // 更新购物车列表
  const updateCartList = async () => {
    const res = await getNewestCartListAPI()
    cartList.value = res.result
  }

  // 添加购物车操作
  const addCart = async (goods) => {
    const { skuId, count } = goods
    // 登录 
    if(isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateCartList()
    } else {
      // 未登录  本地购物车 pinia实现
      console.log('添加',goods)
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => {
        goods.skuId === item.skuId
      })
      if(item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    if(isLogin.value){
      await delCartAPI([skuId])
      updateCartList()
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => {
        skuId === item.skuId
      })
      cartList.value.splice(idx, 1)
    }
  }

  // 清除头部购物车
  const clearCart = async () => {
    cartList.value = []
  }

  // 单选功能：始终把单选框的状态和Pinia中的store对应的状态保持同步
  // 基本思想：
  // 1. 通过skuId找到要进行单选操作的商品
  // 2. 把控制是否选中的selected字段修改为当前单选框传过来的状态
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => {
      item.skuId === skuId
    })
    item.selected = selected
  }

  // 全选功能
  // 基础思想：
  // 1. 全选状态决定单选框状态 - 遍历cartList把每一项的selected都设置为何全选框状态一致
  // 2. 单选框状态决定全选状态 - 只有所有单选框的selected都为true, 全选框才为true
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }
  // 是否全选 计算属性
  const isAll = computed(() => {
    return cartList.value.every((item => item.selected))
  })

  // 1. 头部购物车商品 总数量
  const allCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 2. 头部购物车商品 价钱合计
  const allPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  // 3. 已选择数量
  const allSelectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4. 已选择商品价钱合计
  const allSelectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    updateCartList,
    addCart,
    delCart,
    clearCart,
    singleCheck,
    allCheck,
    isAll,
    allCount,
    allPrice,
    allSelectedCount,
    allSelectedPrice
  }
}, {
  persist: true,
})