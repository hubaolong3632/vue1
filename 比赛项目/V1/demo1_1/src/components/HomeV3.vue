<template>

  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-header style="background-color: rgba(200,255,0,0.25)">

        <el-row :gutter="20">
          <el-col :span="4"><img src="../img/element-plus-logo.svg" style="height: 50px"></el-col>
          <el-col :span="14"><h1>健康颐养平台管理后台</h1> </el-col>
          <el-col :span="1">
            <el-avatar :size="50" />
          </el-col>
          <el-col :span="2">
           <p>管理员</p>
          </el-col>
        </el-row>




      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgba(10,3,3,0.68)">

       <div style="margin-top:30vh">
         <router-link to="/server">服务管理</router-link>
         <hr>
         <router-link to="/shoppy">订单管理</router-link>
       </div>


        </el-aside>
        <el-main style="background-color: rgba(21,5,5,0.3)"><router-view> </router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

</script>

<style scoped>

</style>