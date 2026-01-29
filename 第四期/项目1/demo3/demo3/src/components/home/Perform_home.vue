<template>
  <el-row :gutter="20" style="overflow-x: auto;overflow-y: auto;  height: 80vh" class="">
    <el-col :span="8" v-for="(button, index) in buttons" :key="index" >
      <el-card class="box-card template_index" shadow="hover" @click="routerUrl(button.url)" style="margin-top: 10px">
        <div class="text-center">
          <el-button
              :type="button.type"
              plain
              :class="button.animClass"
          >
            {{ button.label }}
          </el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive } from 'vue';
import axios from "axios";
import ip from "@/router/ip.js";

const buttons = reactive([
  {url:"restoration", type: 'danger',  label: '复位'},
  {url:"4_legs_stand",type: 'success', label: '四腿站立' },
  {url:"sit",         type: 'success', label: '坐下' },
  {url:"lie_down",    type: 'success', label: '趴下' },
  {url:"2_legs_stand",type: 'success', label: '双腿站立' },
  {url:"shake_hands", type: 'success', label: '握手' },
  {url:"bow",         type: 'success', label: '作揖' },
  {url:"nod",         type: 'success', label: '点头' },
  {url:"shake_head",  type: 'success', label: '摇头'},
  {url:"boxing",      type: 'success', label: '拳击' },
  {url:"stretch",     type: 'success', label: '伸懒腰' },
  {url:"pee",         type: 'success', label: '撒尿'},
  {url:"push-up",     type: 'success', label: '俯卧撑' },
  {url:"turn_pitch",  type: 'success', label: '转动PITCH' },
  {url:"turn_roll",   type: 'success', label: '转动ROLL' },
  {url:"spacewalk",   type: 'success', label: '太空漫步' },
  {url:"multiaxial",  type: 'success', label: '多轴联动' },
  {url:"mark_time",   type: 'success', label: '原地踏步' },
  {url:"crawl",       type: 'success', label: '匍匐前进' },
  {url:"wave",        type: 'success', label: '波浪' },


]);

// 执行选择的方法
let routerUrl=async (url) => {
  console.log(url)
  if(url==="restoration"){
    await restoration();
  }else{
    await axios.get(ip.ip + "pos/"+url);
  }
}


async function restoration() { //复位
  console.log("复位")

   await axios.get("http://192.168.149.1/settings/100", {
    "op": "publish",
    "id": "publish:/puppy_control/pose:2",
    "topic": "/puppy_control/pose",
    "msg":
        {"roll": 0, "pitch": 0, "yaw": 0, "height": -10, "x_shift": -0.5, "stance_x": 0, "stance_y": 0, "run_time": 500},
    "latch": false
  });
}


</script>

<style scoped>
.el-button {
  font-size: 16px;
}
.box-card {
  transition: transform .3s;
  cursor: pointer;
}
.box-card:hover {
  background-image: url('@/img/logo/imagetp.png'); /* 设置背景图片 */
  transform: translateY(-5px);
}
.text-center {
  text-align: center;
}
.template_index {
  //background-image: url('@/img/logo/imagetp.png'); /* 设置背景图片 */
  background-size: cover; /* 覆盖整个元素，保持图片的比例 */
  background-position: center; /* 图片居中显示 */
}
</style>