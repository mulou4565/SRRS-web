import httpInstance from '@/utils/http'

export const insertCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新购物车列表
export const getNewestCartListAPI = () => {
  return httpInstance({
    url: '/member/cart'
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}

export const delCartAPI = (skuId) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      skuId
    }
  })
}
