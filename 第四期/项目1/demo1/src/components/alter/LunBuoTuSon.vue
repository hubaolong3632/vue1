<template>


  <div>
    <div style="width:100%;height: 650px">
      <img  class="kenburns-bottom" :src="indexImage.image" style="width:100%;height: 650px" >
    </div>
  </div>
</template>

<script>


import Bus from "@/utils/EventBus";

export default {


  name: "LunBuoTuSon",
  // methods:{
  // },
  data() {
    return {
     lbtModel:[
       {id:1,title:"AI绘图一",text:"一只鸡在太空上",image:require('@/components/image/Ai/image/c0.png')},
       {id:2,title:"AI绘图二",text:"鸡在太空上有生了很多鸡蛋",image:require('@/components/image/Ai/image/c1.png')},
       {id:3,title:"AI绘图三",text:"鸡和宇航员",image:require('@/components/image/Ai/image/c2.png')},
       {id:4,title:"AI绘图四",text:"超级大鸡和鸡蛋",image:require("../image/png5.png")},
     ],

    indexImage:{id:1,title:"AI绘图一",text:"一只鸡在太空上",image:require('@/components/image/Ai/image/c88.png')},
    // indexImage:{id:1,title:"AI绘图一",text:"一只鸡在太空上",image:require('@/components/image/Ai/image/c128.png')},
    };
  },methods:{
    dj(){
      Bus.$emit('seee',"haahahah")


    }
  },


}
</script>

<style>
  .com1{
   width:100%;height: 80vh;
  }


  @-webkit-keyframes kenburns-bottom{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 84%;transform-origin:50% 84%}100%{-webkit-transform:scale(1.25) translateY(15px);transform:scale(1.25) translateY(15px);-webkit-transform-origin:bottom;transform-origin:bottom}}@keyframes kenburns-bottom{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 84%;transform-origin:50% 84%}100%{-webkit-transform:scale(1.25) translateY(15px);transform:scale(1.25) translateY(15px);-webkit-transform-origin:bottom;transform-origin:bottom}}

  .kenburns-bottom {
    -webkit-animation: kenburns-bottom 7s ease-out both;
    animation: kenburns-bottom 7s ease-out both;
  }
</style>


<!--  图片轮播-->
<!--  <div >-->
<!--    &lt;!&ndash; Carousel &ndash;&gt;-->
<!--    <div id="demo" class="carousel slide" data-bs-ride="carousel">-->

<!--      &lt;!&ndash; Indicators/dots &ndash;&gt;-->
<!--      <div class="carousel-indicators">-->
<!--        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active" v-focus_1></button>-->
<!--        <button v-for="k of lbtModel" :key="k.id" type="button" data-bs-target="#demo"   :data-bs-slide-to="k.id"></button>-->
<!--      </div>-->

<!--      &lt;!&ndash; The slideshow/carousel &ndash;&gt;-->
<!--      <div class="carousel-inner" @click="dj">-->
<!--        <div class="carousel-item active">-->
<!--          <img src="../image/png1.png" class="d-block" style="width:100%;height: 650px">-->
<!--          <div class="carousel-caption">-->
<!--            <h3>AI绘图零</h3>-->
<!--            <p>宇航鸡</p>-->
<!--          </div>-->
<!--        </div>-->



<!--       <div class="carousel-item" v-for="k of lbtModel" :key="k.id">-->
<!--         <img :src="k.image" class="d-block" style="width:100%;height: 650px">-->
<!--&lt;!&ndash;         <img :src="k.image" class="d-block" style="width:100%;height: 500px">&ndash;&gt;-->
<!--         <div class="carousel-caption">-->
<!--           <h3 >{{k.title}}</h3>-->
<!--           <p >{{k.text}}</p>-->
<!--         </div>-->
<!--       </div>-->



<!--      </div>-->

<!--      <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">-->
<!--        <span class="carousel-control-prev-icon"></span>-->
<!--      </button>-->
<!--      <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">-->
<!--        <span class="carousel-control-next-icon"></span>-->
<!--      </button>-->
<!--    </div>-->


<!--&lt;!&ndash;    <br>&ndash;&gt;-->
<!--&lt;!&ndash;    <br>&ndash;&gt;-->
<!--&lt;!&ndash;    <br>&ndash;&gt;-->
<!--&lt;!&ndash;    <br>&ndash;&gt;-->
<!--&lt;!&ndash;    <button @click="dj">点击我启动</button>&ndash;&gt;-->


<!--  </div>-->

