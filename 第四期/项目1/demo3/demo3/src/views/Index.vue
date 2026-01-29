<template >
  <el-container class="app-container">

<!--     -->
    <el-header class="app-header">

      <el-row :gutter="20">
        <el-col :span="16"><span style="margin-left: 30vw">  机械狗控制程序</span></el-col>
        <el-col :span="8"> <img src="@/img/wxjslogo.png" style="width: 15vw;height: 2vw;padding: 10px;margin-left: 10vw"></el-col>
      </el-row>
    </el-header>
    <el-container style="background-color: white">



      <div style="width: 70px"  >
        <div class="template_index" style="margin-top: 20vh" >

          <router-link @click="routerItem" class="nav-link" to="">当前选择</router-link>

          <hr>
          <br><br>
          <router-link to="/" class="nav-link">主页</router-link>
<!--          <router-link :to="routerItem" class="nav-link">当前选择</router-link>-->
        </div>
      </div>


<!--    主页路由-->
      <el-main>
            <router-view></router-view>
      </el-main>

  </el-container>

  </el-container>
</template>

<script setup>

import {ElMain} from "element-plus";
import router from "@/router/index.js";

let routerItem=()=>{
 let r1= localStorage.getItem('router');
 if(r1==null||r1===""){ //如果不存在的话就默认为跳转
   r1="/bodyControl";
 }
 router.push(r1)
 return r1;
}


</script>

<style scoped>

.app-container {
  height: 100vh;
  background-color: #FFA500; /* 橙色背景，与图片配色一致 */
}

.app-header {
  background-color: #FFA500;
  color: white;
  font-size: 24px;
  text-align: center;
  padding: 10px;
}

.c1 {
  border-right-color: #d3d3d3; /* 浅灰色边框 */
  border-right-width: 1px;
  border-right-style: solid;
}

.nav-link {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.router-link-exact-active  {
  background-color: #007bff;
  color: #fff;
}






</style>