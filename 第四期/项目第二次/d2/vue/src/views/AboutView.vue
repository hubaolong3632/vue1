<script setup>

import {inject, onMounted} from "vue";


let sanji=inject('sanji')


onMounted(()=>{
  console.log("顶层传递的内容",sanji)
})


</script>


<template>
  <div style="padding: 200px;border: 1px #00ff22 ridge;width:100%;display: flex">
      我是路由内容

    <div style="padding: 100px;border: 1px #00ff22 ridge;width:100%;display: flex">
      <router-view></router-view>
    </div>

  </div>

</template>

<style scoped>

</style>