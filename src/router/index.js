// createRouter: 创建router实例对象
// createWebHistory: 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

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
