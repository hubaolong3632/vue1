import {createRouter,createWebHistory } from "vue-router"
import Login from "../components/Login.vue"
import HomeV3 from "../components/HomeV3.vue"
import ServiceV3 from "../components/ServiceV3.vue"
import ShoppyV3 from "../components/ShoppyV3.vue"
export default createRouter(
    {
        history:createWebHistory(import.meta.env.BASE_URL),
        routes:[
            {path:"/",component:Login},
            {path:"/home",component:HomeV3,children:[{path:"/service",component:ServiceV3},{path:"/shoppy",component:ShoppyV3}]}
        ]

    })

