<script setup>
import {onBeforeUnmount, ref} from "vue";
import Shiping_home from "@/components/Shiping/shiping_home.vue";
import axios from "axios";
import ip from "@/router/ip.js";

let recognitionObstacle = ref(false);  // 雷达避障
let recognitionFollow = ref(false);    // 雷达跟随
let recognitionGuard = ref(false);     // 雷达警卫
let recognition = ref(false); // 默认关闭




let init = async () => {  //初始化的时候可以先关掉识别
  await axios.get(ip.ip + "lidar/enter",{ timeout: 3000 });

}
init();

onBeforeUnmount(async () => {
  await axios.get(ip.ip + "lidar/control/guang", {timeout: 3000});
  await axios.get(ip.ip + "lidar/exit",{ timeout: 3000 });
});



let recognitionChange = async () => {
  if (recognition.value === true) { //如果为颜色按钮打开
    await axios.get(ip.ip + "lidar/control/kai", {timeout: 3000});

  } else { //如果关闭
    await axios.get(ip.ip + "lidar/control/guang", {timeout: 3000});
  }
}

let parameter=ref({
  m:0,
  distance:0,
});

let handleClick = async (type) => {
  if (type === '避障') {
    recognitionObstacle.value = true;
    recognitionFollow.value = false;
    recognitionGuard.value = false;

    await axios.get(ip.ip + "lidar/control/1", {timeout: 3000});


    //   这里放避战的功能

  } else if (type === '跟随') {
    recognitionObstacle.value = false;
    recognitionFollow.value = true;
    recognitionGuard.value = false;

    await axios.get(ip.ip + "lidar/control/2", {timeout: 3000});


  } else if (type === '警卫') {
    recognitionObstacle.value = false;
    recognitionFollow.value = false;
    recognitionGuard.value = true;

    await axios.get(ip.ip + "lidar/control/3", {timeout: 3000});

  }


}
</script>

<template>
  <shiping_home>
    <img style="height: 100%;width: 100%" src="http://192.168.149.1:8080/stream?topic=/usb_cam/image_raw" alt="@/img/logo/c1.png">
  </shiping_home>
    <el-row class="game-container">
    <div class="button-row">
      开启激光雷达:&nbsp;&nbsp;&nbsp;<el-switch v-model="recognition" inline-prompt active-text="是" inactive-text="否" @change="recognitionChange()"/>
  <br>
      <span>雷达避障:
        <el-switch
            v-model="recognitionObstacle"
            @change="() => handleClick('避障')"
            active-text="是"
            inactive-text="否"/>
      </span><br>
      <span>雷达跟随:
        <el-switch
            v-model="recognitionFollow"
            @change="() => handleClick('跟随')"
            active-text="是"
            inactive-text="否"/>
      </span><br>
      <span>雷达警卫:
        <el-switch
            v-model="recognitionGuard"
            @change="() => handleClick('警卫')"
            active-text="是"
            inactive-text="否"/>
      </span><br>
    </div>

<!--    <div class="button-row">-->

<!--        <div class="slider-demo-block">-->
<!--          <span class="demonstration">检测距离(m):{{parameter.m}}</span>-->
<!--          <el-slider v-model="parameter.m" />-->
<!--        </div>-->
<!--      <div class="slider-demo-block">-->
<!--        <span class="demonstration">移动速度:{{parameter.distance}}</span>-->
<!--        <el-slider v-model="parameter.distance" />-->
<!--      </div>-->
<!--    </div>-->
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