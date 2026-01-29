<script setup>
import { ElButton, ElCol, ElRow } from "element-plus";
import {onBeforeMount, onBeforeUnmount, onUpdated, ref} from "vue";
import Shiping_home from "@/components/Shiping/shiping_home.vue";
import axios from "axios";
import ip from "@/router/ip.js";

let recognition = ref(false); // 默认关闭

let init = async () => {  //初始化的时候可以先关掉识别
  console.log("颜色识别")
  await axios.get(ip.ip + "Color/enter");
}
init();

onBeforeUnmount(async () => {
  console.log("退出界面")
  await axios.get(ip.ip + "Color/control/guang",{ timeout: 3000 });
  await axios.get(ip.ip + "Color/exit", {});

});


// 当修改我选择的时候
let recognitionChange = async () => {
  if (recognition.value === true) { //如果为颜色按钮打开
    console.log("识别开")
    // let k={"op":"service_response","service":"/color_detect/set_running","values":{"success":true,"message":"set_running"},"result":true}

    await axios.get(ip.ip + "Color/control/kai",{ timeout: 3000 });


  } else { //如果关闭
    console.log("识别关")
    await axios.get(ip.ip + "Color/control/guang",{ timeout: 3000 });

  }
}



</script>

<template >
  <el-row class="game-container ">

<!--    图片显示-->
    <shiping_home>
      <img style="height: 100%;width: 100%" src="http://192.168.149.1:8080/stream?topic=/color_detect/image_result" alt="@/img/logo/c1.png">
    </shiping_home>

    <div class="button-row">
      颜色识别: &nbsp;&nbsp; <span style="color: red">{{ recognition === true ? "正在识别" : "识别关闭" }}</span> &nbsp;&nbsp;&nbsp;<el-switch v-model="recognition" inline-prompt active-text="是" inactive-text="否" @change="recognitionChange()"/>
    </div>
    <br>
    <div class="button-row" style="font-size: 10px">
      识别最大距离约50cm<br></br>可识别红绿蓝三种颜色<br>其中红色点头，其余摇头。
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