import { createRouter, createWebHistory } from 'vue-router'
import LoginV3 from '../views/LoginV3.vue'
import HomeV3 from '../views/HomeV3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginV3
    },{
      path: '/home',
      component: HomeV3
    },

  ]
})

export default router
