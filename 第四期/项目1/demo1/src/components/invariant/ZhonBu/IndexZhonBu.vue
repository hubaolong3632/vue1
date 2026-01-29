<template>
<!--  <LunBuoTuSon v-for="k of lbtModel" :key="k.id"></LunBuoTuSon>-->

  <div id="ZhonBu">
<!--    <ImageSan></ImageSan>-->
<!--    <hr>-->
<!--    大图移动/轮播图-->
    <LunBuoTuSon :style="zhonDate.maBot2"></LunBuoTuSon>

<!--    动态文字-->
    <CoustomZUJian  :style="zhonDate.maBot1"></CoustomZUJian>


<!-- element 轮播图-->
    <image-shi></image-shi>

    <!--    炫酷时间-->
    <el-card shadow="always" :style="zhonDate.maBot1">
      <TimeYi></TimeYi>
    </el-card>




<!--    数字-->
    <NumBer  :style="zhonDate.maBot1"> </NumBer>



<!--    四张图片显示-->
    <el-card shadow="always" :style="zhonDate.maBot1" v-for="image in  ImageErsum" :key="image">
      <div v-roll_1="`slide-in-blurred-top`" >
        <ImageEr  :style="zhonDate.maBot1" style="display: none"></ImageEr>
      </div>
    </el-card>


    <!--  抽奖功能  -->
    <el-card shadow="always" :style="zhonDate.maBot1">
      <draw-one  ></draw-one>
    </el-card>
    <br>

    <!--    单张图片显示-->
    <el-card shadow="always" :style="zhonDate.maBot1">
       <Rest  :aList="c1"   v-for="c1 in aList" :key="c1" @abc111="a1" ></Rest>
    </el-card>

<!-- 图片上传功能 -->
<!--    <UploaDing :style="zhonDate.maBot1"></UploaDing>-->

<!--    显示为空的-->
    <el-empty  :image-size="100"></el-empty>






  </div>
</template>

<script>

const LunBuoTuSon     =()=>import       ('../../alter/LunBuoTuSon.vue')
const Rest            =()=>import       ("../../alter/ImageYi.vue")
const ImageEr         =()=>import       ("@/components/alter/ImageEr")
const NumBer          =()=>import       ("@/components/alter/zhonBu/Number")
const UploaDing       =()=>import       ("@/components/alter/uploading/UploaDing")
const DrawOne         =()=>import       ("@/components/alter/draw/drawYi")
const CoustomZUJian   =()=>import       ("@/components/alter/custom/CoustomZUJian")
const TimeYi          =()=>import       ("@/components/alter/draw/TimeYi")
const ImageSan        =()=>import       ("@/components/alter/ImageSan")
const ImageShi        =()=>import       ("@/components/alter/ImageShi")


// import LunBuoTuSon from '../../alter/LunBuoTuSon.vue'
// import Rest from "../../alter/ImageYi.vue"
// import ImageEr from "@/components/alter/ImageEr";
// import NumBer from "@/components/alter/zhonBu/Number";
// import UploaDing from "@/components/alter/uploading/UploaDing";
// import DrawOne from "@/components/alter/draw/drawYi";
// import CoustomZUJian from "@/components/alter/custom/CoustomZUJian";
// import TimeYi from "@/components/alter/draw/TimeYi";
// import ImageSan from "@/components/alter/ImageSan";
// import ImageShi from "@/components/alter/ImageShi";
export default {
  name: "ZhonBu",
  components: {
    ImageShi,
    ImageSan,
    TimeYi,
    CoustomZUJian,
    DrawOne,
    UploaDing,
    NumBer,
    ImageEr,
    Rest,
   LunBuoTuSon,
  },
  data(){
    return {
      ImageErsum:2, //控制imageer组件显示几个
      zhonDate:{
        maBot1:{"margin-bottom":"50px"},
        maBot2:{"margin-bottom":"15px"},
      },
       aList:[
           {image:require('@/components/image/p1.png'),title:"标题1",price:5.6},
           {image:require('@/components/image/p2.png'),title:"标题1",price:5.6},
           {image:require('@/components/image/p3.png'),title:"标题1",price:5.6},
             // {image:require('@/components/image/p2.png'),title:"标题2",price:5.6},
             // {image:require('@/components/image/p3.png'),title:"标题3",price:5.6}
       ],
    }

  },
  created() {
    this.aList.push({image:require('@/components/image/Ai/image/c34.png'),title:"标题1",price:5.6})
    this.aList.push({image:require('@/components/image/Ai/image/c33.png'),title:"标题1",price:5.6})
    this.aList.push({image:require('@/components/image/Ai/image/c32.png'),title:"标题1",price:5.6})
    this.aList.push({image:require('@/components/image/Ai/image/c31.png'),title:"标题1",price:5.6})
  },
  methods:{
    a1(c1){
      console.log("收到")
      console.log(c1);

    }
  },

}
</script>

<style scoped>
@-webkit-keyframes slide-in-blurred-top{0%{-webkit-transform:translateY(-1000px) scaleY(2.5) scaleX(.2);transform:translateY(-1000px) scaleY(2.5) scaleX(.2);-webkit-transform-origin:50% 0;transform-origin:50% 0;-webkit-filter:blur(40px);filter:blur(40px);opacity:0}100%{-webkit-transform:translateY(0) scaleY(1) scaleX(1);transform:translateY(0) scaleY(1) scaleX(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes slide-in-blurred-top{0%{-webkit-transform:translateY(-1000px) scaleY(2.5) scaleX(.2);transform:translateY(-1000px) scaleY(2.5) scaleX(.2);-webkit-transform-origin:50% 0;transform-origin:50% 0;-webkit-filter:blur(40px);filter:blur(40px);opacity:0}100%{-webkit-transform:translateY(0) scaleY(1) scaleX(1);transform:translateY(0) scaleY(1) scaleX(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-filter:blur(0);filter:blur(0);opacity:1}}

.slide-in-blurred-top{-webkit-animation:slide-in-blurred-top 1.5s cubic-bezier(.23,1.000,.32,1.000) both;
  animation:slide-in-blurred-top 0.3s cubic-bezier(.23,1.000,.32,1.000) both}

</style>