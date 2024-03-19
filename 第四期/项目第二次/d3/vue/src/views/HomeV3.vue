<script setup>

let danji=()=>{
  console.log("点击")
}


</script>

<template>
    <div class="common-layout">
      <el-container style="height: 100vh">
        <el-header style="background-color: rgba(246,245,245,0.13)">
          <el-row :gutter="20">
            <el-col :span="4">
          <img src="@/image/logo.svg" style="height: 30px">
            </el-col>

            <el-col :span="14">
             <h1>健康颐养平台后台管理系统</h1>
            </el-col>


            <el-col :span="4">
              <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
              <span>管理员</span>
            </el-col>
          </el-row>

        </el-header>
        <el-container>
          <el-aside style="background-color: rgba(7,0,0,0.11);" width="200px">


      <div style="margin-left: 2vw; margin-top: 20vh">

        <router-link to="/service" class="cc1">服务管理</router-link>
        <hr style="background-color: red">
        <router-link to="/shoppy" class="cc1">订单管理</router-link>

      </div>


          </el-aside>
          <el-main style="background-color: rgba(2,2,2,0.35)">
          <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>
<style scoped>
.cc1{
  cursor: pointer;
  text-decoration: none;
}
.cc1:hover{
 background-color: rgba(0, 0, 0, 0.19);
  color: #e70c0c;
}
.router-link-active{
  background-color: rgba(0, 0, 0, 0.19);
  color: #e70c0c;
}

</style>