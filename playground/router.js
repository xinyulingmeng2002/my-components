import { createRouter, createWebHistory } from 'vue-router'
import PlaygroundLayout from './PlaygroundLayout.vue'

const routes = [
  {
    path: '/',
    component: PlaygroundLayout,
    children: [
      {
        path: 'button',
      component: () => import('../src/components/common/Button/ButtonDemo.vue'),
        meta: { title: 'Button 示例' }
      },
      {
        path: 'tabs',
      component: () => import('../src/components/common/Tabs/TabsDemo.vue'),
        meta: { title: 'Tabs 示例' }
      },
      {
        path: 'carousel',
      component: () => import('../src/components/data-display/Carousel/CarouselDemo.vue'),
        meta: { title: 'Carousel 示例' }
      },
      {
        path: 'sidebar',
      component: () => import('../src/components/data-display/SideBar/SideBarDemo.vue'),
        meta: { title: 'SideBar 示例' }
      },
      {
        path: 'codeblock',
      component: () => import('../src/components/layout/CodeBlock/CodeBlockDemo.vue'),
        meta: { title: 'CodeBlock 示例' }
      },
      {
        path: 'previewblock',
      component: () => import('../src/components/layout/PreviewBlock/PreviewBlockDemo.vue'),
        meta: { title: 'PreviewBlock 示例' }
      },
      // 其他组件路由将在这里添加
      {
        path: '',
        redirect: '/button'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/playground'),
  routes
})

export default router
