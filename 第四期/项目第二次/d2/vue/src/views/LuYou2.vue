<script setup>

import {inject, onMounted} from "vue";


let sanji=inject('sanji')


onMounted(()=>{
  console.log("顶层传递的内容",sanji)
})


</script>


<template>
  <div style="padding: 200px;border: 1px #0426d9 ridge;width:100%;display: flex">
      我是二级路由
  </div>

</template>

<style scoped>

</style>