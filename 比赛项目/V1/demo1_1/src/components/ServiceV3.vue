<script   setup>
import {ref} from 'vue'
import axios from 'axios'
const tableData = ref([

])

import  ip from  "../router/ip.js"
//初始化
let init=async () => {
  let {data}=await axios.get(ip+"service", {})
    console.log(data)
  tableData.value=data;
}
init()





//---------------------------
let iuTable=ref( {
  id: 53,
  name: "上门护理",
  service_content_name: "送饭",
  introduction: "1231",
  price: "123",
  status: "1",
  promotional_image: "",
  promotional_logo:"",
  service_content_id: 21,
  service_type_id: 1,
  details: "444"
})
let messageBol=ref(true)


//功能区一 ---
import { ElMessage } from 'element-plus'
let updateTable=async (index) => {
  index.status==1?index.status=0:index.status=1;
  let {data} = await axios.get(ip + "addService", {params:index})
  if(data==1){
    ElMessage.success("修改成功")
  }

}

//功能区一 ---
let deletteTable=async (index) => {
  tableData.value.splice(index.$index, 1)
  let {data} = await axios.get(ip + "deleteService", {params: index.row})
  if(data == 1){
    ElMessage.success("删除成功")

  }
}


let bol=0;
let messageShow=(index)=>{
  if(index==null){ //行增
    iuTable.value={}
    bol=0;
  }else{ //修改
    // iuTable.value=index;
    // iuTable.value=Object.assign({}, index);;
    iuTable.value={...index}
    bol=1;
  }

  messageBol.value=true;

}

//功能区一  修改全部---
let IUTableAll=async () => {
  let uIp;
  if(bol==0){
    uIp="InsertService"
    init();
  }else{
    uIp="updateService"
  }

  let {data} = await axios.get(ip + uIp, {params:iuTable.value})
  if(data==1){
    ElMessage.success("成功");
  }
}




//弹窗区 ---
import { Plus } from '@element-plus/icons-vue'

//    上传文件
let handleAvatarSuccess = (response) => {
  console.log(response)
  iuTable.value.promotional_image =response
}
//    上传文件2
let handleAvatarSuccess1= (response) => {
  iuTable.value.promotional_logo =response
}

let beforeAvatarUpload= (rawFile) => {
  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
    ElMessage.error('请上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('图片过大')
    return false
  }
  return true
}


let xx=()=>{

}

</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select v-model="value" placeholder="服务类型" size="large" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="value" placeholder="服务内容" size="large" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="value" placeholder="状态" size="large" style="width: 240px">
          <el-option value="0" label="待上架"></el-option>
          <el-option value="1" label="已上架"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="success">搜索</el-button>
        <el-button type="success" @click="messageShow(null)">新增</el-button>
        <el-button type="success">批量操作</el-button>
      </el-col>
    </el-row>
    <br>
    <br>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed type="selection" width="150" />


      <el-table-column prop="id" label="序号" width="120"/>
      <el-table-column prop="name" label="服务类型" width="120"/>
      <el-table-column prop="service_content_name" label="服务内容" width="120"/>
      <el-table-column prop="introduction" label="服务简介" width="120"/>
      <el-table-column prop="price" label="定价" width="120"/>
      <el-table-column prop="status" label="状态" width="120">
          <template #default="v1">
            {{v1.row.status==1?"已上架":"待上架"}}
          </template>


      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="300">
        <template #default="v1">
          <el-button type="primary" @click="messageShow(v1.row)">修改</el-button>
          <el-button :type="v1.row.status==1?`success`:`warning`" @click="updateTable(v1.row)">{{v1.row.status==1?"已上架":"待上架"}}</el-button>
          <el-button type="primary" @click="deletteTable(v1)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>

<!--  弹窗-->
  <div>
    <el-drawer v-model="messageBol" title="I am the title" :with-header="false">

      <div>
        <p>服务类型:</p>
        <el-select v-model="iuTable.name" placeholder="服务类型" size="large" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </div>
      <br>


      <div>
        <p>服务内容：</p>
        <el-select v-model="iuTable.service_content_name" placeholder="服务类型" size="large" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </div>
      <br>


      <div>
      <p>宣传图片:</p>

        <el-upload class="avatar-uploader" :action="ip+'file'" :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img  v-if="iuTable.promotional_image" :src="iuTable.promotional_image" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

      </div>
      <br>



      <div>
        <p>缩略图片:</p>
        <el-upload class="avatar-uploader" :action="ip+'file'" :show-file-list="false"
                   :on-success="handleAvatarSuccess1"
                   :before-upload="beforeAvatarUpload">
          <img v-if="iuTable.promotional_logo" :src="iuTable.promotional_logo" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

      </div>
      <br>


      <div>
        <p>服务简介:</p>
        <el-input v-model="iuTable.introduction" style="width: 240px" placeholder="简介"  maxlength="20"/>
      </div>
      <br>



      <div>
        <p>定价:</p>
        <el-input v-model="iuTable.price" style="width: 50px"  maxlength="20"/>
        <span>/次</span>
      </div>
      <br>


      <div>
        <p>服务详细:</p>
        <el-input
            v-model="iuTable.details"
            maxlength="30"
            style="width: 300px"
            show-word-limit
            type="textarea"
        />
      </div>
      <br>


     <div>
       <el-button type="success" @click="IUTableAll">确定</el-button>
     </div>
      <br>



    </el-drawer>

  </div>
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