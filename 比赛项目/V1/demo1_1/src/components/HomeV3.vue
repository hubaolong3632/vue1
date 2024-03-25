<template>
  <div>

    <div class="common-layout">
      <el-container style="height: 100vh">
        <el-header style="background-color: rgba(71,255,0,0.27)">

          <el-row :gutter="20">
            <el-col :span="6">
              <img src="../img/element-plus-logo.svg" style="height: 40px">
            </el-col>
            <el-col :span="12">
              <h2>xxx管理系统</h2>
            </el-col>
            <el-col :span="1">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-col>
            <el-col :span="2">
              <span style="line-height: 50px;">管理员</span>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="200px" style="background-color: rgba(2,2,2,0.36)">
            <div style="margin-top: 30vh;margin-left: 30px">
              <router-link to="/service">服务管理</router-link>
              <br>
              <br>
              <br>
              <router-link to="/shoppy">订单管理</router-link>
            </div>

          </el-aside>
          <el-main style="background-color: rgba(0,0,0,0.14)">
            <router-view></router-view>

          </el-main>
        </el-container>
      </el-container>
    </div>


  </div>
</template>`

<script>

</script>
<style scoped></style>