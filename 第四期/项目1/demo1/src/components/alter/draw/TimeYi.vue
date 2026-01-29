<template>
<div  id="name"  >
  <div>
    <el-row :gutter="22">
      <el-col :span="3">
        <br>
      </el-col>

      <el-col  :xs="xsSize" :span="6">
          <el-row :gutter="20">
            <el-col  :span="7">
              <img :src="timeImage[Interval.shi1].image" class="d-block imageClass">
            </el-col>
            <el-col :span="7">
              <img :src="timeImage[Interval.shi2].image" class="d-block imageClass"  >
            </el-col>
            <el-col :span="10">
              <img src="@/components/image/text/shi.png" class=" imageClass1">
            </el-col>

          </el-row>
      </el-col>


      <el-col :xs="xsSize" :span="6">
        <el-row :gutter="20">
            <el-col :span="7">
              <img :src="timeImage[Interval.fen1].image" class="d-block imageClass" >
            </el-col>
            <el-col :span="7">
              <img :src="timeImage[Interval.fen2].image" class="d-block imageClass" >
            </el-col>

            <el-col :span="10">
              <img src="@/components/image/text/fen.png" class=" imageClass1">
            </el-col>
        </el-row>
      </el-col>


      <el-col :xs="xsSize" :span="6">
        <el-row :gutter="20">
              <el-col :span="7">
                <img :src="timeImage[Interval.miao1].image" class="d-block imageClass" >
              </el-col>
              <el-col :span="7">
                <transition name="el-zoom-in-top">
                  <img :src="timeImage[Interval.miao2].image" class="d-block imageClass" >
                </transition>

              </el-col>
              <el-col :span="10" >
                <img src="@/components/image/text/miao.png" class="imageClass1">
              </el-col>
        </el-row>

      </el-col>

    </el-row>
  </div>


<!--  <img :src="a1" class="d-block" style="width:100%;height: 500px">-->
<!--  <img src="@/components/image/time/c0.png" class="d-block">-->
</div>
</template>

<script>
export default {
  name: "TimeYi",
  data(){
    return{
      xsSize:24,
      Interval:{
        Interval:null,
        miao1:0,
        miao2:0,
        fen1:0,
        fen2:0,
        shi1:0,
        shi2:0,

      },
      timeImage:[
        {id:0,image:require("@/components/image/text/b0.png")},
        {id:1,image:require("@/components/image/text/b1.png")},
        {id:2,image:require("@/components/image/text/b2.png")},
        {id:3,image:require("@/components/image/text/b3.png")},
        {id:4,image:require("@/components/image/text/b4.png")},
        {id:5,image:require("@/components/image/text/b5.png")},
        {id:6,image:require("@/components/image/text/b6.png")},
        {id:7,image:require("@/components/image/text/b7.png")},
        {id:8,image:require("@/components/image/text/b8.png")},
        {id:9,image:require("@/components/image/text/b9.png")},
      ]
    }
  },methods:{
    timeInit(){
      this.Interval.Interval=setInterval(() => {
        // 获取当前的小时、分钟和秒
        let now = new Date();
        let hours = ('0' + now.getHours()).slice(-2); // 添加前导零并截取最后两位
        let minutes = ('0' + now.getMinutes()).slice(-2); // 添加前导零并截取最后两位
        let seconds = ('0' + now.getSeconds()).slice(-2); // 添加前导零并截取最后两位

        this.Interval.shi1=parseInt(hours[0])
        this.Interval.shi2=parseInt(hours[1])
        this.Interval.fen1=parseInt(minutes[0])
        this.Interval.fen2=parseInt(minutes[1])
        this.Interval.miao1=parseInt(seconds[0])
        this.Interval.miao2=parseInt(seconds[1])
      }, 1000);

    }


  },created() {
    console.log("执行111")
    this.timeInit();

  },deactivated() {

    clearInterval(this.Interval.Interval)

  },activated() {
    this.timeInit();
  }
}
</script>

<style scoped>
img{
  border-bottom: 2px solid rgba(0, 0, 0, 0.81); /* 添加下划线样式 */
  padding-bottom: 10px; /* 可以添加一些底部内边距，使下划线与内容之间有一定的间距 */
  border-radius: 10px; /* 添加10像素的圆角边框 */
}

.parent {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 让父元素撑开高度 */
}
.imageClass{

  width: 5vw;
  height: 5vw;
  min-width: 50px;
  min-height: 50px;
}
.imageClass1{
  width: 50%;
  height: 50%;
}

</style>