import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [


    //首页
    {path:"/",component:() => import('@/view/Home.vue'),
        children:[
        // {path:"index",component:() => import('@/components/index.vue')},
    ]},
  ]
})

export default router
