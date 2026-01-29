<template>
  <div>
    <el-menu
        style="overflow-y: auto"
        :default-active="currentPath"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"

    >
<!--      更具路由生成-->
      <el-menu-item :index="item.path" v-for="(item,index) in rou" :key="index" @click="path_router(item)">
<!--        <el-icon><IconMenu /></el-icon>-->
        <el-icon><img :src="item.meta.icon"></el-icon>
        <template #title>{{item.meta.title}} </template>
      </el-menu-item>



    </el-menu>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue'
import {Menu as IconMenu, Location, Setting,} from '@element-plus/icons-vue'
import router from "@/router";
import {useRoute} from "vue-router";

const props = defineProps({ //子父传参
  isCollapse:{
    type: Boolean,
    default: false
  }
})


// 获取路由
let rou=ref(router.options.routes[0].children);
console.log(router.options)


let path_router=(path)=>{ //路由跳转
  router.push(path.path);

}

// 获取请求url
const route = useRoute();
const currentPath = route.path;
console.log(currentPath)


</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>