<script setup>

</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-header style="background-color: rgba(66,185,131,0.53)">

        <el-row :gutter="20">
          <el-col :span="4"><img src="../img/element-plus-logo.svg" style="height: 40px"></el-col>
          <el-col :span="13"><h2>健康颐养平台 后台管理系统</h2></el-col>
          <el-col :span="2">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
            <span> 管理员</span>

          </el-col>

        </el-row>
      </el-header>
      <el-container>
        <el-aside style="background-color: rgba(2,2,2,0.37)" width="200px ">

          <div style="margin-top: 20vh">
            <router-link to="/service">志愿者管理</router-link>
            <hr>
            <router-link to="/shoppy">广告管理</router-link>

          </div>


        </el-aside>
        <el-main style="background-color: rgba(2,2,2,0.13)">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>

</style>