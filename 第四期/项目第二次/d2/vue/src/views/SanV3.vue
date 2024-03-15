<script setup>
//第三级组件

import {inject, onMounted} from "vue";




let sanji=inject('sanji')


onMounted(()=>{
    console.log("顶层传递的内容",sanji)
})


</script>


<template>
  <div style="padding: 200px;border: 1px red ridge;width:100%;display: flex">
    <div><p>我是第三级组件</p></div>
    <br>
    <br>
    <div>顶层传递过来的内容:<span style="color: red">{{sanji}}</span></div>


  </div>

</template>

<style scoped>

</style>