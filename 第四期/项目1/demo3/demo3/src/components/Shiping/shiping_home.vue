<script setup>
import {ElCol} from "element-plus";
</script>

<template >
  <el-col :span="24" class="game-view">
    <div class="game-image" style="height: 60vh;width: 100vh">
    <slot></slot>
    </div>
  </el-col>
</template>

<style scoped>
.game-view {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  text-align: center;
}
.game-image {
  width: 80%;
  height: 80%;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

</style>