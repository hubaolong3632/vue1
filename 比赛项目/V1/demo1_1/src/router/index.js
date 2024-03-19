import { createRouter, createWebHistory } from 'vue-router'
import HomeV3 from "../components/HomeV3.vue";
import Login from "../components/Login.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: HomeV3
    },

  ]
})

export default router
