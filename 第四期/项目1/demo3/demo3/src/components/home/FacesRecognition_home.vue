<script setup>
import { ElButton, ElCol, ElRow } from "element-plus";
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import Shiping_home from "@/components/Shiping/shiping_home.vue";
import axios from "axios";
import ip from "@/router/ip.js";

let recognition = ref(false); // 默认关闭

let init = async () => {  //初始化的时候可以先关掉识别
  await axios.get(ip.ip + "face/enter",{ timeout: 3000 });

}
init();

onBeforeUnmount(async () => {
  let {data} = await axios.get(ip.ip + "face/control/guang", {timeout: 3000});
  await axios.get(ip.ip + "face/exit",{ timeout: 3000 });
});


// 当修改我选择的时候
let recognitionChange = async () => {
  if (recognition.value === true) { //如果为颜色按钮打开
    await axios.get(ip.ip + "face/control/kai", {timeout: 3000});

  } else { //如果关闭
    await axios.get(ip.ip + "face/control/guang", {timeout: 3000});


  }
}
</script>

<template >
  <el-row class="game-container ">

<!--    图片显示-->
    <shiping_home>

      <img style="height: 100%;width: 100%" src="http://192.168.149.1:8080/stream?topic=/face_detect/image_result" alt="@/img/logo/c1.png">

    </shiping_home>

    <div class="button-row">
      识别人脸: &nbsp;&nbsp; <span style="color: red">{{ recognition === true ? "正在检测" : "检测关闭" }}</span> &nbsp;&nbsp;&nbsp;<el-switch v-model="recognition" inline-prompt active-text="是" inactive-text="否" @change="recognitionChange()"/>
    </div>
    <br>
    <div class="button-row" style="font-size: 10px">
      检测最大距离约1cm
    </div>
  </el-row>
</template>

<style scoped>
.button-row {
  display: flex;
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