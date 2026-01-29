import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import peifang from '@/image/peifang/peifang.svg'
import yuanliao from '@/image/peifang/yuanliao.svg'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: '工具导航', icon: peifang},

      component: () => import("@/views/home/index.vue"),
      children: [
        {
          path: '/',
          name: 'url',
          meta: { title: '常用', icon: yuanliao },
          component: () => import("@/views/url/index.vue"),
        },
        {
          path: '/rest',
          name: 'rest',
          meta: { title: '其他', icon: peifang },
          component: () => import("@/views/rest/index.vue"),
        }

      ],

    },
    //
  ],
})

router.beforeEach((home,part,next)=>{
  console.log("从:"+part.fullPath,"   到："+home.fullPath)
  next();
});

// // 双重拦截器
// router.beforeEach((home,part,next)=>{
//   console.log("从11:"+part.fullPath,"到22："+home.fullPath)
//   next();
// });

export default router
