<template>


  <div>
    <div class="gao">
      <img  class="kenburns-bottom gao"
            :src="indexImage.image"
            alt="">
    </div>
  </div>


</template>

<script>


import Bus from "@/utils/EventBus";
export default {
  name: "LunBuoTuSon",
  data() {
    return {

    indexImage:{id:1,title:"AI绘图一",text:"一只鸡在太空上",image:require('@/components/image/Ai/image/c88.png')},
    // indexImage:{id:1,title:"AI绘图一",text:"一只鸡在太空上",image:require('@/components/image/Ai/image/c128.png')},
    };
  },
  methods:{

  },


}
</script>

<style>
.gao{
  max-height: 1000px;
  min-height: 400px;

  width:100%;
  height: 42vw;
}

  @-webkit-keyframes kenburns-bottom{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 84%;transform-origin:50% 84%}100%{-webkit-transform:scale(1.25) translateY(15px);transform:scale(1.25) translateY(15px);-webkit-transform-origin:bottom;transform-origin:bottom}}@keyframes kenburns-bottom{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 84%;transform-origin:50% 84%}100%{-webkit-transform:scale(1.25) translateY(15px);transform:scale(1.25) translateY(15px);-webkit-transform-origin:bottom;transform-origin:bottom}}

  .kenburns-bottom {
    -webkit-animation: kenburns-bottom 7s ease-out both;
    animation: kenburns-bottom 7s ease-out both;
  }
</style>

