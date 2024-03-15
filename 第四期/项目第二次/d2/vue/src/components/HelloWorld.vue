<script setup>



import {onMounted} from "vue";

console.log("如果想要一开始就执行就放在这里")


//mounted 生命周期  逻辑一
onMounted(()=>{
  console.log("onMounted")

})


//mounted 生命周期 逻辑二
onMounted(()=>{
  console.log("direge")

})
console.log("放在这里也比onMounted快")

</script>

<template>
  asda




  <div style="margin-top: 100vh"></div>

</template>

<style scoped>

</style>
