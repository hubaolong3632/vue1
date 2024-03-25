<script setup>
import { ref } from 'vue'
import ip from '../router/ip.js'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const tableData = ref([

])


let init=async () => {
  let {data} = await axios.get(ip + "fromShoppy");
  tableData.value=data;
}
init();

//----





let updateV1=async (index) => {
  index.status==1?index.status=0:index.status=1;
  let {data} = await axios.get(ip + "updateShopp", {params: index});
  if(data==1){
    ElMessage.success("成功")
  }else{
    ElMessage.error("失败")

  }

}


const deleteRow = async (index) => {
  if(index.status==1){
    ElMessage.success("请先停用")
    return;
  }

  let {data} = await axios.get(ip + "deleteShoppy", {params: index.row});
  if (data == 1) {
    ElMessage.success("成功")
    tableData.value.splice(index.$index, 1)

  } else {
    ElMessage.error("失败")

  }
}



let v1=ref({
  "id": 12,
  "title": "",
  "launch_page": "",
  "picture": "",
  "status": "",
  "create_user_id": 5,
  "create_time": "2023-05-15T00:34:00.000+00:00",
  "update_time": "2023-05-15T00:34:00.000+00:00"
});

//----
let messageShow=ref(true);
let xBol=ref(0);



let show=(index)=>{
  console.log(index)
  if(index==null){
    v1.value={}
    xBol.value=0;
  }else{
    v1.value=index
    xBol.value=1;
  }
   messageShow.value=true;


}

import { Plus } from '@element-plus/icons-vue'

let handleAvatarSuccess=(response) => {
  console.log(response)
  v1.value.picture =response;
}

let beforeAvatarUpload=(rawFile) => {
  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('Avatar picture size can not exceed 20MB!')
    return false
  }
  return true
}
const UIShoppy = async () => {
  let URL = "";
  if (xBol.value== 0) {
    URL = "insertShoppy";
    console.log("插入")
  } else {
    URL = "updateShoppyAll";
    console.log("修改")

  }

  let {data} = await axios.get(ip + URL, {params: v1.value});
  if (data == 1) {
    ElMessage.success("成功")
  } else {
    ElMessage.error("失败")

  }
  init();
  messageShow.value=false;



}
</script>

<template>

  <el-drawer v-model="messageShow"  :with-header="false">
      <div>
        <p>广告标题:</p>
        <el-input v-model="v1.title" style="width: 240px" placeholder="Please input" />
      </div>
    <br>

    <div>
      <p>广告图片:</p>

      <el-upload
          class="avatar-uploader"
          :action="ip+'file'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="v1.picture" :src="v1.picture" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>



    </div>
    <br>




    <el-button type="success" @click="UIShoppy()">确定</el-button>

  </el-drawer>

  <el-row :gutter="20">
    <el-col :span="6"><el-button type="success" @click="show(null)">添加</el-button></el-col>
  </el-row>
<br>
<br>
  <el-table :data="tableData" style="width: 100%" max-height="500">

    <el-table-column  prop="id" label="序号" width="150" />
    <el-table-column  prop="title" label="广告标题" width="150" />
    <el-table-column  label="广告图片" width="150" >
      <template #default="scope">
  <img :src="scope.row.picture" style="width: 40px;height: 40px">
      </template>
    </el-table-column>

    <el-table-column  label="状态" width="150" >
      <template #default="scope">
    {{scope.row.status==0?'停用':'启用'}}
      </template>
    </el-table-column>

    <el-table-column  label="操作" width="300" >
      <template #default="scope">
          <el-button type="primary" @click="show(scope.row)">编译</el-button>
          <el-button @click="updateV1(scope.row)" :type="scope.row.status==0?'danger':'success'">  {{scope.row.status==0?'停用':'启用'}}</el-button>
          <el-button  @click="deleteRow(scope)"  type="info">删除</el-button>
      </template>
    </el-table-column>

  </el-table>


</template>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>