<script setup>

import { UploadFilled } from '@element-plus/icons-vue'
import {ElMessage, ElNotification} from "element-plus";
import {ref,onMounted,provide} from 'vue'

import HeadV3 from "@/components/Tou/HeadV3.vue";
import BottomV3 from "@/components/Tou/BottomV3.vue";
import ip from "@/router/ip.js";
import DateFIle from "@/components/ZhoBu/DateFIle.vue";

let d1=ref({
  userName:"tourist",  //游客发送
  bucketName:"my-bucketname",
  filePassword:"111",//上传密码
  start:true //是否显示在首页
});
const dateFile = ref()  //表格子类

let htmlImg=ref(`
body {
        background-image: url('@/img/background/c3.jpg');
        background-attachment: fixed;
        height: 100%;
        width: 100%;
        no-repeat:center top;

        background-color: black; /* 设置备用背景颜色 */
        background-size: 100% 100%;
        background-repeat: no-repeat; /* 禁止背景图片重复 */
        z-index: -1;
    }
`)

let copyPre=(perTag,bol)=> {  //复制链接
  console.log(perTag)

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



let url=ref({
  "url": "请先上传文件",
  "bucketName": "请先上传文件",
  "date": "请先上传文件",
  "fileName": "请先上传文件",
  "filePathName": "/user/tourist/date/2024-09-10/fileName/1725967740680-c2.png",
  "filePathName2": "xx",
  "fileSize": "0.0 KB",
  "fileType": "**",
  "bool": true,
  "message": "文件已成功上传"
});
const handleAvatarSuccess= (response, uploadFile) => {

  if(response.code!==1){
    ElMessage.error(response.data.fileStart)
    return;
  }

  ElNotification({
    title: '上传状态',
    message: response.data.fileStart,
    type: 'success',
  })



  let date= response.data;
  console.log("文件名称："+response.data.fileName)
  console.log(date.url)
  url.value=date;
  console.log("参数：",date)


  // 直接复制到剪切板
  copyPre(date,false)



  htmlImg.value=`
body {
        background-image: url('${date.filePath2}');
        background-attachment: fixed;
        height: 100%;
        width: 100%;
        no-repeat:center top;

        background-color: black; /* 设置备用背景颜色 */
        background-size: 100% 100%;
        background-repeat: no-repeat; /* 禁止背景图片重复 */
        z-index: -1;
    }
`;


  dateFile.value.refresh(); //文件上传成功调用刷新底部

}

// let zcf=ref();
// provide("s1",(kk)=>{
//   zcf.value=kk;
//
// }); //传递动态数据在这里就得传输,


//子组件$on中的名字



let imgUrl=(url)=>{
  console.log(url)
  let copyText=`
   <img src=${url.filePath2}">
  `;
  copyPre(copyText,false);
}





const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5000) {
    ElMessage.error('请上传50MB以内的文件超过此大小请先登录进行上传')
    return false
  }
  return true
}


let error=(e)=>{
  ElMessage.error('文件上传失败错误原因：'+e)
}


// let clearFiles= ()=> {  //清空上传的文件
//   this.$refs['mYupload'].clearFiles();
// }



// let diaoyon=()=>{
//   dateFile.value.csh("xx");
//   dateFile.value.c="11111111";
//
//   // $ref.dateFile.csh();
//   // this.$refs.child.$emit("childFun")
//   // this.$emit("childFun",{id:"xxx"})
// }




</script>

<template >
<!--  <button style="color: red;font-size: 100px"  @click="diaoyon()">调用子类方法</button>-->
<!--  <button style="color: red;font-size: 100px"  @click="diaoyon()">调用子类方法</button>-->


  <div style="margin-left: 25vw;margin-top: 15vh">
    <div class="text-1 tracking-in-contract-bck-bottom" style="">
      <span style="margin-left: 14vw">YG图床</span><br>
      <span style="font-size: 2vw;line-height: 2.25rem;">游客仅可上传 50MB 以内文件，查找历史文件请往下翻。</span>

    </div>
    <br>
    <br>

    <div   style="width: 55vw">
      <!--      limit="1"-->
      <!--  上传-->
      <el-upload
          ref="mYupload"
          class="upload-demo"
          drag
          name="file"
          :action="ip.fileIp"
          :data="d1"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="error"
          :multiple="false" >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <br>
        <br>
        <div class="el-upload__text">
          请将文件拖拽到此&nbsp;&nbsp;&nbsp;<em>或单击进行上传</em>
        </div>

      </el-upload>
      <br>
      <br>
      <div >
        <el-tabs type="border-card" class="with-underline1" style="height: 200px;overflow-y: auto">
          <!--             <a target="_blank" :href="url.filePath"></a>-->
<!--          <el-tab-pane  class="text-2" style="color: #51be1b;" label="下载链接(单击复制)" @click="copyPre(url.filePath,false)">-->
          <el-tab-pane  class="text-2" style="color: #51be1b;" label="下载链接(单击复制)" @click="copyPre(url.filePath2,false)">
           <div  style="height:100%;overflow-x: auto">
             类型:&nbsp;{{url.fileType}}<br>
             名称:&nbsp;{{url.fileName}}<br>
             大小:&nbsp;{{url.fileSize}}<br>
             <p> 地址:&nbsp;<span style="color: red">{{url.filePath2}}</span></p>
             <br>
             <br>

           </div>


          </el-tab-pane>
          <el-tab-pane class="text-2" label="图片链接" @click="imgUrl(url)">
           <div style="text-align:center;line-height: 100px;color: rgba(0,255,72,0.62)">
             &lt;img src="{{url.filePath2}}" &gt;
           </div>

            </el-tab-pane>

          <el-tab-pane class="text-2" label="网页背景链接"  @click="copyPre(htmlImg,false)">
            <pre v-text="htmlImg" style="height:100%;overflow-x: auto;color: rgba(0,255,72,0.66)"></pre>
          </el-tab-pane>

<!--          <el-tab-pane class="text-2" label="URL链接"></el-tab-pane>-->
          <!--          <el-tab-pane label="Task">Task</el-tab-pane>-->
        </el-tabs>
      </div>
    </div>

  </div>

  <br>
  <br>
  <br>
  <br>
  <br>

<!--  <history-file-v3></history-file-v3>-->
  <date-f-ile ref="dateFile"></date-f-ile>


  <br>
  <br>
  <br>

</template>


<style scoped>

.text-2{
  cursor: pointer;
  color: rgba(255, 255, 255, 0.77);
  font-size:15px;
  width: 100%;
  height: 100%;


}

.text-1{

  /*transform: translate(-50%,-50%);  将元素向左和向上移动，使其中心点与父容器的中心点对齐*/
  margin-left: 5vw;

  font-size: 4vw;
  line-height: 1;
  color: #fffdfd;
  font-family: 华文楷体,serif;
  font-weight: 600;
}



.tracking-in-contract-bck-bottom{-webkit-animation:tracking-in-contract-bck-bottom 1s cubic-bezier(.215,.61,.355,1.000) both;animation:tracking-in-contract-bck-bottom 1s cubic-bezier(.215,.61,.355,1.000) both}


@-webkit-keyframes tracking-in-contract-bck-bottom{0%{letter-spacing:1em;-webkit-transform:translateZ(400px) translateY(300px);transform:translateZ(400px) translateY(300px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0) translateY(0);transform:translateZ(0) translateY(0);opacity:1}}@keyframes tracking-in-contract-bck-bottom{0%{letter-spacing:1em;-webkit-transform:translateZ(400px) translateY(300px);transform:translateZ(400px) translateY(300px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0) translateY(0);transform:translateZ(0) translateY(0);opacity:1}}

</style>
