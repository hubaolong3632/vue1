<template>
  <div id="app" >
<!--    头部-->
    <TouBu></TouBu>



<!--    &lt;!&ndash;中部 路由缓存&ndash;&gt;-->
<!--    <keep-alive include="IndexZhonBu" max="10">-->
<!--      <router-view ></router-view>-->
<!--    </keep-alive>-->

<!--    路由缓存，全部缓存-->
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
<!---->
<!--    尾部-->
    <WeiBu/>


  </div>
</template>
<script src="three.r134.min.js"></script>
<script src="vanta.birds.min.js"></script>
<script>

</script>
<script>
const  TouBu =()=>import  ('@/components/invariant/TouBu.vue')
const  WeiBu =()=> import  ('@/components/invariant/WeiBu.vue')


import Clipboard from "clipboard";
//导入动态样式逻辑

export default {
  name: 'App',
  components: {
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

    //复制功能
    let clipboard = new Clipboard('.copy');
    clipboard.on('success', ()=> {

      this.$notify({
        message: '复制成功',
        duration:1000,
        type: 'success'
      });

    });



    clipboard.on('error', ()=> {
      this.$message({
        message: '复制失败',
        type: 'error',
        duration:1000,
      });
    });
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


</style>
