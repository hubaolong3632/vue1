import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/cc',
      name: 'home',
      component: import('@/components/ZhoBu/HomeV3.vue')
    },{
      path: '/',
      name: 'home1',
      component: import('@/components/ZhoBu/CCV2.vue')
    },
  ]
})

export default router
