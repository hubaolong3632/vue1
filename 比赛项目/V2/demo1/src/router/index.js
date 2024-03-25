import { createRouter, createWebHistory } from 'vue-router'
import HomeV3 from "../components/HomeV3.vue"
import LoginV3 from "../components/LoginV3.vue"
import Service from "../components/Service.vue"
import Shoppy from "../components/Shoppy.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:"/",component:LoginV3},
    {path:"/home",component:HomeV3,children:[
        {path:"/service",component:Service},
        {path:"/shoppy",component:Shoppy},
      ]}

  ]
})

export default router
