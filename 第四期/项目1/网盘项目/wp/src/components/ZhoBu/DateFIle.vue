<script setup>
import {ref,onMounted,inject} from 'vue'
import axios from "axios";
import ip from "@/router/ip.js";
import {ElNotification} from "element-plus";

let init=async () => {
  let {data} = await axios.get(ip.fromIp,{})
  console.log(data)
  tableData.value=data.data.reverse();

}
onMounted(() => {
  init();
  // 这里的代码会在组件挂载到 DOM 之后立即执行
});


let download=(downloadUrl)=>{ //下载文件
  init();
}



const tableData = ref([]);





let csh=(xx)=>{
  alert("初始化加载")
  console.log(xx)
}

let refresh=()=>{  //刷新上传的文件
  init();
}



let copyPre=(perTag,bol)=> {  //复制链接
  let copy;
  if(bol==null||bol===true){
    copy=`--广告位---
文件名称:${perTag.fileName}
文件大小:${perTag.fileSize}
文件ID:${perTag.file_id}
下载地址:${perTag.filePath}`;
  }else {
    copy=perTag;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(copy);

    ElNotification({
      title: '复制成功',
      message: '链接已复制到剪切板粘贴即可',
      type: 'success',
    })
  } else {
    let textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;
    textarea.value = copy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);


    ElNotification({
      title: '复制成功',
      message: '链接已复制到剪切板粘贴即可',
      type: 'success',
    })

  }

}


let s2=ref();
let yulang=(s1)=>{

  // s2.value=s1.filePath;
  s2.value=s1.filePath2;

}
defineExpose({ csh,refresh })
</script>

<template>
  <hr>
<!--  <p style="color: red;font-size: 100px">{{c}}</p>-->



  <el-table class="c3" :data="tableData"    style="width: 90%">

    <el-table-column  fixed prop="file_id"  label="文件名称" width="350" >
      <template #default="scope">
        <span>{{scope.row.fileName}}</span>
      </template>
    </el-table-column>
    <el-table-column  prop="file_id" label="文件ID" width="150" />


    <el-table-column prop="fileSize" label="文件大小" width="120" />
    <el-table-column prop="date" label="上传时间" width="220" />
    <el-table-column prop="userIp" label="上传ip" width="200" />

    <el-table-column fixed="right" label="Operations" min-width="200">
      <template  #default="scope">

<!--        <el-button   link type="primary" size="small" @click="handleClick">复制链接</el-button>-->
                  <a :href="scope.row.filePath+'&noBol=true'"  >下载</a>
<!--        <el-button   link type="primary" size="small" @click="download(scope.row.filePath)"> 下载 </el-button>-->
        <el-button   link type="primary" size="small">
<!--        <a href="">a标签下载</a>-->
<!--          <a :href="scope.row.filePath" :download="scope.row.fileName" >复制下载链接</a>-->
        <el-button   link type="primary" size="small" @click="copyPre(scope.row)"> 复制链接 </el-button>
        <el-button   link type="primary" size="small" @click="yulang(scope.row)"> 预览 </el-button>

        </el-button>

      </template>
    </el-table-column>

  </el-table>
  <br>
  <br>
  <br>
<!--图片展示-->
<!--      <iframe :src="s2"  frameborder="0" scrolling="no" style="margin-left: 30%;width: 40vw;height: 100%;" ></iframe>-->


  <img :src="s2" style="margin-left: 30%;width: 40vw;height: 100%;" alt="">
</template>
<style>


.c3{
  width: 100%;height: 400px;
}

/*
手机屏幕
 */
@media only screen and (max-width: 768px) {
  .c3{
    width: 100%;
    height: 400px;
  }
}
/*
电脑
 */
@media only screen and (min-width: 769px) {
  .c3{
    margin-left: 5vw;
    width:20%;
    height: 400px;
  }
}

</style>

