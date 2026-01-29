<template>
    <div>
      <br>
      <br>
      <br>
      <div style="display: flex; margin-left: 100px; margin-top: 20px;">
<!--          <a href="#/YiView" style="margin-right: 100px;">第一个</a>-->
<!--          <a href="#/ErView" style="margin-right: 100px;"> 第二个</a>-->
<!--          <a href="#/SanView" style="margin-right: 100px;">第三个</a>-->

<!--        两种方法-->
        <router-link to="/YiView?id=1">第一个</router-link>
        <router-link to="/ErView/332">第二个</router-link>
        <router-link to="/SanView?id=3">第三个</router-link>
        <el-button type="success" @click="goHref" plain>跳转</el-button>


      </div>
      <br>
      <br>
      <br>
<!--      路由进入的地方-->
      <router-view>   </router-view>

    </div>
</template>

<script>
export default {
  name: "ZhonBuViews",
  methods:{
    //跳转方法1
    goHref(){
        this.$router.push("/ErView?id=12");
        this.$router.push({
           //路由名
           name:"yi",
          query:{
             key:"abc123",
             id:"12",
            name:"张三"
          },
          //通过rs风格传递参数
          // params:{
          //   key:"abc123", //要和那边对应
          // }

        });
    }
  }
}
</script>

<style scoped>
/*可以自动加高亮  这个是模糊匹配  就比如如果是to=/ma  那 /my/a /my/b   /my/c 都会被匹配到*/
/*a.router-link-active{*/
/*  background-color: #ff6b6b;*/
/*  color: #ff6b6b;*/
/*}*/

/*!*可以自动加高亮  这个是精确匹配  就比如如果是to=/ma  那就只能是这个*!*/
/*a.router-link-exact-active{*/
/*  background-color: #ff6b6b;*/
/*  color: #ff6b6b;*/
/*}*/

/*a.active{*/
/*  background-color: #ff6b6b;*/
/*  color: #47ff00;*/
/*}*/



</style>