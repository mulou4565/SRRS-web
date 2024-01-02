// createRouter: 创建router实例对象
// createWebHistory: 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Order from '@/views/Order/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/PayBack/index.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      // 一级路由和二级路由的关系
      children: [
        {
          path: '',  // 默认渲染页
          name: 'home',
          component: Home,
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category,
        },
        {
          path: 'category/sub/:id',
          name: 'subCategory',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        },
        {
          path: 'cartlist',
          name: 'cartList',
          component: CartList
        },
        {
          path: 'checkout',
          name: 'order',
          component: Order
        },
        {
          path: 'pay',
          name: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          name: 'payback',
          component: PayBack
        },
        {
          path: 'member',
          name: 'member',
          component: Member,
          // 三级路由设置
          children: [
            {
              path: '', // 默认：置空path 
              name: 'userInfo',
              component: UserInfo
            },
            {
              path: 'order',
              name: 'userOrder',
              component: UserOrder
            }
          ]
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  
  // 路由行为配置项 滚动行为定制
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

export default router
