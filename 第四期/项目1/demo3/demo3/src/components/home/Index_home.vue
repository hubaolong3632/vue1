<script setup>

import { ref } from 'vue';
import { ElContainer, ElHeader, ElAside, ElMain, ElMenu, ElMenuItem } from 'element-plus';
import bqsbImage from '@/img/bqsb.png';
import jtyk from '@/img/机体遥控.png';
import yssb from '@/img/yssb.png';
import byms from '@/img/byms.png';
import mbzz from '@/img/mbzz.png';
import bqsb from '@/img/shang.png';
import router from "@/router/index.js";

const robots = ref([
  {routerUrl:"/bodyControl",name: '机体遥控(完成)', image: jtyk},
  {routerUrl:"/perform",name: '表演模式(完成)', image: byms},

  {routerUrl:"/rgb",name: '颜色识别(完成)', image: yssb},
  {routerUrl:"/target",name: '目标追踪', image: mbzz},

  {routerUrl:"/tag",name: '标签识别(完成)', image: bqsbImage},
  {routerUrl:"/faces",name: '人脸检测', image: bqsbImage},

  {routerUrl:"/vision",name: '视觉巡线', image:mbzz},
  {routerUrl:"/lidar",name: '激光雷达', image: bqsb},

  // {routerUrl:"/bodyControl",name: '8', image: bqsbImage},
  // {routerUrl:"/bodyControl",name: '9', image: bqsbImage},
  // {routerUrl:"/bodyControl",name: '10', image: bqsbImage},
  // {routerUrl:"/bodyControl",name: '11', image: bqsbImage},
  // {routerUrl:"/bodyControl",name: '12', image: bqsbImage},
  // {routerUrl:"/bodyControl",name: '13', image: bqsbImage},
  // {routerUrl:"/bodyControl",name: '14', image: bqsbImage},
]);


let url=(robot)=>{  //跳转选择的
  console.log("跳转：",robot.routerUrl)
  localStorage.setItem("router",robot.routerUrl)
  router.push(robot.routerUrl);  //跳转选择的界面
}
</script>

<template >
  <div class="app-main template_index">
    <!-- 居中可移动-->
    <el-card class="card"  v-for="robot in robots" :key="robot.name" @click="url(robot)" >
      <template #header>{{robot.name}}</template>
      <img :src="robot.image" style="width:30vh;height: 100%" alt=""/>
    </el-card>
  </div>



</template>

<style scoped>
.app-main {
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
}


.card {
  flex: 0 0 auto;
  cursor: pointer;
  margin-right: 50px;  /* 设置两个内的间距*/

}
.template_index {
  background-image: url('@/img/logo/imagetp.png'); /* 设置背景图片 */
background-size: cover; /* 覆盖整个元素，保持图片的比例 */
background-position: center; /* 图片居中显示 */
}

</style>