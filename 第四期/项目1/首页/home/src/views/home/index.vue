<template>
  <div class="common-layout">
    <el-container style="width: 100%; height: 100vh; display: flex; flex-direction: column;overflow:hidden" class="example-box">
      <el-container style="flex: 1; display: flex;">
        <!-- 侧边栏区域 -->
        <el-aside :style="{ width: isCollapse ? '64px' : '200px', display: 'flex', flexDirection: 'column' }">
          <el-footer style="padding-left: 40%;padding-top: 10px" class="example-box"  @click="isCollapse=!isCollapse">
           常用链接
          </el-footer>

          <el-main style="flex: 1;overflow:hidden" class="example-box">
            <navigation-bar :isCollapse="isCollapse"></navigation-bar>
          </el-main>

        </el-aside>
        <!-- 右侧内容区域 -->
        <el-container style="flex: 1; display: flex; flex-direction: column;">
          <el-main style="flex: 1;" class="example-box">
            <el-card style="height: 100%;width: 100%">
              <router-view></router-view>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import navigationBar from '@/components/home/handleBar.vue'

const isCollapse = ref(false)

</script>

<!--border: 1px solid white;-->
<style scoped>
.example-box {

}
</style>