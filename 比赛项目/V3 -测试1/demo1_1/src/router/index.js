import {createRouter,createWebHistory } from "vue-router"
import   HomeV3 from "../c1/HomeV3.vue"
import   LoginV3 from "../c1/LoginV3.vue"
import   ServiceV3 from "../c1/ServiceV3.vue"
import   ShoppyV3 from "../c1/ShoppyV3.vue"
export default createRouter(
    {
        history:createWebHistory(import.meta.env.BASE_URL),
        routes:[
            {path:"/",component:LoginV3},
            {path:"/home",component:HomeV3,children:[
                    {path:"/service",component:ServiceV3},
                    {path:"/shoppy",component:ShoppyV3},
                ]}
        ]

    })

