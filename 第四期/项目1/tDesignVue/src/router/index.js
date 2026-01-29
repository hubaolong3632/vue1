import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'text1',
      component: ()=>import("@/components/Text1.vue")
    },

  ],
})

export default router
