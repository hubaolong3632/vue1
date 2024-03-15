import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import LuYou2 from '../views/LuYou2.vue'

const router = createRouter({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AboutView
    },
    {
      path: '/luyou',
      component: AboutView,
      children:[{path:"/luyou/c1",component:LuYou2}]
    },
  ]
})
export default router
