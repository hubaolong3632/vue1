<template>
  <div id="app">
<!--    头部-->
    <TouBu></TouBu>


<!--    路由缓存，全部缓存-->
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
<!--    尾部-->
    <WeiBu/>


<!--    登录功能-->
    <login-v2></login-v2>


  </div>
</template>

<script>
import LoginV2 from "@/components/login/LoginV2.vue";

const  TouBu =()=>import  ('@/components/invariant/TouBu.vue')
const  WeiBu =()=> import  ('@/components/invariant/WeiBu.vue')


import Clipboard from "clipboard";
//导入动态样式逻辑

export default {
  name: 'App',
  components: {
    LoginV2,
    TouBu,
    WeiBu
  },
  data(){
    return{
      keepAlive:[
       '',
      ]
    }
  },created(){





  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 6.3vh;
}

body {
  background-image: url('imagetp.png');
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  no-repeat:center top;

  background-color: black; /* 设置备用背景颜色 */
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 禁止背景图片重复 */

  z-index: -1;
}


</style>
