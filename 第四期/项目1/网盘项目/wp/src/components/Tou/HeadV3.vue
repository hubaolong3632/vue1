<script setup>

</script>

<template style="">
  <div style="" class="with-underline  ">
    <el-row :gutter="20" style="color: white;padding: 25px;font-size: 1.125rem">
      <el-col   :xs="14"  :sm="18" :md="18" :lg="20" :xl="22"  >YG图床</el-col>
      <el-col   :xs="10"  :sm="6"  :md="6"  :lg="4"  :xl="2">
        <el-row :gutter="20">
          <el-col style="cursor: pointer" :span="10"><img src="@/img/login/login.png">登录</el-col>
          <el-col style="cursor: pointer" :span="10"><img src="@/img/login/sing.png">注册</el-col>

        </el-row>

      </el-col>

    </el-row>
  </div>
</template>

<style scoped>
.with-underline1 {
  backdrop-filter: blur(3px);  /*增加磨砂效果*/
  height: 75px;
  background-image: linear-gradient(45deg, rgba(58, 7, 30, 0.15), rgba(220, 201, 184, 0.11));
}

.with-underline {
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  /*border-radius: 2em;*/
  backdrop-filter: blur(15px);  /*增加磨砂效果*/


  /*border-radius: 10px; !* 添加10像素的圆角边框 *!*/
  height: 75px;


  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.89), rgba(0, 0, 0, 0.13));

  /*background-image: linear-gradient(20deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.27), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.24), #8000ff, #ff00ff);*/

}
</style>