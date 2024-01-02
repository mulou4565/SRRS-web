import httpInstance from '@/utils/http'

/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre'
  })
}

// 创建订单
export const createOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}

/*
  params: {
    orderState:0,
    page:1,
    pageSize:2
  }
*/
export const getUserOrderAPI = (params) => {
  return httpInstance({
    url:'/member/order',
    method:'GET',
    params
  })
}