import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component:  () => import('../views/Index.vue'),
      children:[
        {
          path: '/bodyControl',  //机器控制
          component:  () => import('../components/home/BodyControl_home.vue')
        },
        {
          path: '/perform',  //表演模式
          component:  () => import('../components/home/Perform_home.vue')
        },
        {
          path: '/tag',  //标签识别
          component:  () => import('../components/home/TagIdentification_home.vue')
        },
        {
          path: '/rgb',  //颜色识别
          component:  () => import('../components/home/RgbIdentify_home.vue')
        },
        {
          path: '/target',  //目标追踪
          component:  () => import('../components/home/TargetTracking_home.vue')
        },
        {
          path: '/faces',  //人脸检测
          component:  () => import('../components/home/FacesRecognition_home.vue')
        },
        {
          path: '/vision',  //视觉巡线
          component:  () => import('../components/home/Vision_home.vue')
        },
        {
          path: '/lidar',  //激光雷达
          component:  () => import('../components/home/Lidar_home.vue')
        },
        {
          path: '',  //为空默认渲染的时候也带这个界面
          name: 'Index_home',
          component:  () => import('../components/home/Index_home.vue')
        },


      ]
    }
  ]

})

export default router
