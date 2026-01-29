<template>
  <el-row class="game-container">

<!--      <el-col :span="24" class="game-view">-->
<!--        &lt;!&ndash; 游戏视图占位 &ndash;&gt;-->
<!--        <div class="game-image" style="height: 50vh;width: 100vh">-->
<!--            <img style="height: 100%;width: 100%" src="http://192.168.149.1:8080/stream?topic=/usb_cam/image_raw" alt="@/img/logo/c1.png">-->
<!--        </div>-->
<!--      </el-col>-->
    <shiping_home>
      <img style="height: 100%;width: 100%" src="http://192.168.149.1:8080/stream?topic=/usb_cam/image_raw" alt="@/img/logo/c1.png">
    </shiping_home>

    <!--    如果是电脑端-->
      <el-col :span="10" class="control-panel" v-if="pc">
        <!-- 按钮排列区 -->
        <div class="button-row">
          <el-button class="control-button" @mouseup="stop" @mousedown="move('up')">前进</el-button>
        </div>
        <div class="button-row">
          <el-button  class="control-button"   @mouseup="stop" @mousedown="move('left')">左移</el-button>
          <el-button  class="control-button" @click="restoration" >复位</el-button>
          <el-button  class="control-button"  @mouseup="stop" @mousedown="move('right')">右移</el-button>
        </div>
        <div class="button-row">
          <el-button class="control-button"  @mouseup="stop" @mousedown="move('down')">后退</el-button>
        </div>
      </el-col>

<!--    如果是平板电脑端-->
    <el-col :span="10" class="control-panel" v-else>
      <div class="button-row">
        <el-button class="control-button" @touchend="stop" @touchstart="move('up')">前进</el-button>
      </div>
      <div class="button-row">
        <el-button  class="control-button"   @touchend="stop" @touchstart="move('left')">左移</el-button>
        <el-button  class="control-button" @click="restoration" >复位</el-button>
        <el-button  class="control-button"  @touchend="stop" @touchstart="move('right')">右移</el-button>
      </div>
      <div class="button-row">
        <el-button class="control-button" @touchend="stop" @touchstart="move('down')">后退</el-button>
      </div>
    </el-col>





    <div class="button-row" style="margin-top:10vh;margin-left: 20vw">
      <div class="slider-demo-block" style="width: 200px">
        <span class="demonstration">机身高度:{{jq.height}}</span>
        <el-slider  v-model="jq.height" @change="heightChange(jq.height)" />
      </div>
    </div>



  </el-row>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {ElButton, ElRow, ElCol, ElNotification} from 'element-plus';
import axios from "axios";
import ip from "@/router/ip.js";
import Shiping_home from "@/components/Shiping/shiping_home.vue";
let pc=ref(false)  //默认为不是pc端   为true 为pc   false 为手机

onMounted(() => {
  let PCBool=()=>{ //手机电脑端判断
    const userAgent = navigator.userAgent;
    pc.value = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if(pc.value===true){
      ElNotification.success("当前为pc端" )

    }else{
      ElNotification.success("当前为手机端" )

    }

  }
  PCBool();
})





async function move(dir) {
  console.log(`移动方向: ${dir}`);

  /*
步频（Frequency）：2 Hz
步幅（Stride Length）：4
支撑时间（Support Time）：1.2 秒
前进速度（Forward Speed）：12
侧向偏移（Lateral Offset）：0.1
转向角度（Turn Angle）：-0.15
   */

 let k= {
    "op": "publish",
      "id": "publish:/puppy_control/gait/pc:4",
      "topic": "/puppy_control/gait/pc",
      // "msg": {"data": [1, 5, 0.8, 10, 0, -0.25]},
      "msg": {"data": [1, 4, 0.8, 10, 10, -1.0]},
    "latch": false
    }

  switch (dir) {
    case "up": //前
      // k.msg.data=[1, 5, 0.8, 10, 0, 0.8];
           await axios.get(ip.ip+"manual/W",k);
           break;
    case "left": //左
      // k.msg.data=[1, 5, 0.8, 10, 0, 0.8];
      k.msg.data= [2, 4, 1.2, 12, -0.2, -0.3];
          await axios.get(ip.ip+"manual/A",k);
          break;
    case "right":  //右
      // k.msg.data=[1, 5, 0.8, 10, 0, -0.8];
      k.msg.data=[2, 4, 1.2, 12, 0.2, 0.3]
         await axios.get(ip.ip+"manual/D",k);
         break;
    case "down": //后
      k.msg.data=[1, 5, 0.8, 10, 0, 0.8];
         await axios.get(ip.ip+"manual/S",k);
         break;
  }


}


async function stop() {
  console.log("停止机器")


  await axios.get("http://192.168.149.1/manual/STOP", {
    "op": "publish",
    "id": "publish:/puppy_control/gait/pc:4",
    "topic": "/puppy_control/gait/pc",
    "msg": {
      "data": [1, 5, 0.8, 10, 0, -0.25]
    },
    "latch": false
  });
}


//设置机体高度
let heightChange=async (height) => {
  await axios.get(`http://192.168.149.1/settings/${height+50}`, {
    "op": "publish",
    "id": "publish:/puppy_control/pose:2",
    "topic": "/puppy_control/pose",
    "msg":
        {"roll": 0, "pitch": 0, "yaw": 0, "height": -10, "x_shift": -0.5, "stance_x": 0, "stance_y": 0, "run_time": 500},
    "latch": false
  });
}

// 当手松开的时候停止机器


// 复位
async function restoration() {
  await axios.get("http://192.168.149.1/settings/100", {
    "op": "publish",
    "id": "publish:/puppy_control/pose:2",
    "topic": "/puppy_control/pose",
    "msg":
        {"roll": 0, "pitch": 0, "yaw": 0, "height": -10, "x_shift": -0.5, "stance_x": 0, "stance_y": 0, "run_time": 500},
    "latch": false
  });
  console.log("停止机器")
}
restoration();


// 设置他的高度
let jq=ref({
  height:0
})
</script>

<style scoped>
.game-container {
  display: flex;
  height: 80vh;
  width: 80vw;
}

.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 0; /* 消除按钮之间的水平间距 */
}

.control-button {
  margin-left: 10px ;
  margin-top: 10px ;
  width: 60px; /* 按钮宽度 */
  height: 60px; /* 按钮宽度 */
  margin-bottom: 0; /* 消除按钮之间的垂直间距 */
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