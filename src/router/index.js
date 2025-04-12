import { createRouter, createWebHistory } from 'vue-router'
import DemoView from '../views/DemoView.vue'
import playgroundRouter from '../../playground/router' // 引入playgroundRouter

const routes = [
  {
    path: '/',
    name: 'demo',
    component: DemoView,
    children: [
      {
        path: 'button',
        component: () => import('@/components/common/Button/ButtonDemo.vue')
      },
      {
        path: 'tabs',
        component: () => import('@/components/common/Tabs/TabsDemo.vue')
      },
      {
        path: 'carousel',
        component: () => import('@/components/data-display/Carousel/CarouselDemo.vue')
      },
      {
        path: 'sidebar',
        component: () => import('@/components/data-display/SideBar/SideBarDemo.vue')
      },
      {
        path: 'codeblock',
        component: () => import('@/components/layout/CodeBlock/CodeBlockDemo.vue')
      },
      {
        path: 'previewblock',
        component: () => import('@/components/layout/PreviewBlock/PreviewBlockDemo.vue')
      }
    ]
  },
  playgroundRouter.options.routes[0], // 获取playgroundRouter的路由配置
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 确保router-link可用
  if (!to.matched.length) {
    next('/')
  } else {
    next()
  }
})

export default router
