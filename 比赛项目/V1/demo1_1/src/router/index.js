import { createRouter, createWebHistory } from 'vue-router'
import HomeV3 from "../components/HomeV3.vue";
import Login from "../components/Login.vue";
import ServerV3 from "../components/ServerV3.vue";
import ShoppyV3 from "../components/ShoppyV3.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: HomeV3,
      children:[{
        path:"/server",
        component: ServerV3,
      },{
        path:"/shoppy",
        component: ShoppyV3,
      }]
    },


  ]
})

export default router
