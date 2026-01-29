<script setup>

import { UploadFilled } from '@element-plus/icons-vue'
import {ElMessage, ElNotification} from "element-plus";
import {ref} from 'vue'
import HeadV3 from "@/components/Tou/HeadV3.vue";
import BottomV3 from "@/components/Tou/BottomV3.vue";
import HomeV3 from "@/components/ZhoBu/HomeV3.vue";

</script>

<template>
  <div>
    <head-v3></head-v3>
    <HomeV3></HomeV3>
    <router-view></router-view>
    <RouterView/>
    <BottomV3></BottomV3>
  </div>
</template>


<style scoped>

</style>
