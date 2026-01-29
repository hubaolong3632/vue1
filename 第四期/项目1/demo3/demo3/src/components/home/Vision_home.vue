<script setup>
import { ElButton, ElCol, ElRow } from "element-plus";
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import Shiping_home from "@/components/Shiping/shiping_home.vue";
import axios from "axios";
import ip from "@/router/ip.js";

let recognition = ref(false); // 默认关闭
let colour=ref("黑");
let init = async () => {  //初始化的时候可以先关掉识别
  await axios.get(ip.ip + "visual/enter",{ timeout: 3000 });

}
init();

onBeforeUnmount(async () => {
  await axios.get(ip.ip + "visual/control/guang", {timeout: 3000});
  await axios.get(ip.ip + "visual/exit",{ timeout: 3000 });
});




// 当修改我选择的时候
let recognitionChange = async () => {
  if (recognition.value === true) { //如果为颜色按钮打开
    await axios.get(ip.ip + "visual/control/kai", {timeout: 3000});

  } else { //如果关闭
    await axios.get(ip.ip + "visual/control/guang", {timeout: 3000});
  }
}

let yssb=async (rgb) => {
  colour.value = rgb;

  if (rgb === "black") {
    await axios.get(ip.ip + "visual/target/black", {timeout: 3000});

  } else if (rgb === "red") {
    await axios.get(ip.ip + "visual/target/red", {timeout: 3000});

  }

}

</script>

<template >
  <el-row class="game-container ">

<!--    图片显示-->
    <shiping_home>

      <img style="height: 100%;width: 100%" src="http://192.168.149.1:8080/stream?topic=/visual_patrol/image_result" alt="@/img/logo/c1.png">


    </shiping_home>

    <div class="button-row">
      开始巡线:&nbsp;&nbsp;&nbsp;<el-switch v-model="recognition" inline-prompt active-text="是" inactive-text="否" @change="recognitionChange()"/>
      <br>
      <br>
      巡线颜色选择:
      <br>
      <br>
      <button style="color: white;background-color: black;width: 60px;height: 40px"  @click="yssb('black')">黑</button>
      <button style="color: white;background-color: red;width: 60px;height: 40px;margin-left: 4vw"     @click="yssb('red')">红</button>
    </div>
    <br>
<!--    <div class="button-row" :style="background-color: red">-->
    <div class="button-row" :style="{backgroundColor:colour}">
     <span style="color: white;padding: 10px">追踪颜色</span>
    </div>
  </el-row>
</template>

<style scoped>
.button-row {
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 5vh; /* 调整顶部间距 */
  margin-left: auto; /* 自动边距使其居中对齐 */
  margin-right: auto; /* 自动边距使其居中对齐 */
  padding: 10px 20px; /* 内边距 */
  background-color: #f0f0f0; /* 背景颜色 */
  border-radius: 10px; /* 边角圆滑 */
  width: auto; /* 自动宽度根据内容调整 */
  max-width: 80%; /* 最大宽度限制 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 轻微的阴影效果 */
  font-size: 16px; /* 字体大小 */
}
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