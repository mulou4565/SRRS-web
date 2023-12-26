// createRouter: 创建router实例对象
// createWebHistory: 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path:'',  // 默认渲染页
          name: 'layout',
          component: Home,
        },
        {
          path:'category',
          component: Category,
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
  ]
})

export default router
