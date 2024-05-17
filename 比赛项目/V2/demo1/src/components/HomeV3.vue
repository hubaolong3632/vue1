<script setup>


</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-header style="background-color: rgba(66,185,131,0.4)">
        <el-row :gutter="20">
          <el-col :span="4"><img src="../img/element-plus-logo.svg" style="height: 40px"></el-col>
          <el-col :span="12" ><h2>健康颐养管理平台后台</h2></el-col>

          <el-col :span="5">
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          <span style="line-height:10px">管理员</span>
          </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgba(2,2,2,0.51)">

       <div style="margin-top: 40vh">
         <router-link to="/service">服务管理</router-link>
         <hr>
         <router-link to="/shoppy">订单管理</router-link>

       </div>


        </el-aside>
        <el-main style="background-color: rgba(2,2,2,0.08)"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>

</template>


<style scoped>

</style>