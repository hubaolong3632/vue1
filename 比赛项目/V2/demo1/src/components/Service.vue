<script setup>
import {ref} from "vue";
import axios from "axios";
import ip from "../router/ip.js";
import { ElMessage } from 'element-plus'

let tableData=ref([]);

let init=async () => {
  let {data} = await axios.get(ip + "service",{});
  tableData.value=data;
}
init();



let v1=ref({
  id:"",
  name:"",
  service_content_name:"",
  introduction:"",
  price:"",
  status:"",
  promotional_image:"",
  promotional_logo:"",
  details:"",
  service_content_id:"",
  service_type_id:"",
  volunteer_open_flag:"",
  certificate_flag:"",
  create_user_id:"",
 create_time:"",
 update_time:"",
})



let updateData=async (index) => {
  ElMessage.success("tis "+index.status)

  index.status===0?index.status=1:index.status=0;

  let {data} = await axios.get(ip + "updateService", {params:index});
  tableData.value = data;
  // await init()
}




let messageBol=ref(false);
let b1bol=0;
let tanchuang=(data)=>{
  console.log(data)
    if(data==null){
      b1bol=0;
      v1.value={
        id:"",
        name:"",
        service_content_name:"",
        introduction:"",
        price:"",
        status:"",
        promotional_image:"",
        promotional_logo:"",
        details:"",
        service_content_id:"",
        service_type_id:"",
        volunteer_open_flag:"",
        certificate_flag:"",
        create_user_id:"",
        create_time:"",
        update_time:"",
      };

    }else{
      b1bol=1;
      v1.value={...data};
      console.log(v1.value)
    }
  messageBol.value=true;

}

let deleteDate=async (index) => {
  console.log(index)
  let {data} = await axios.get(ip + "deleteService", {params: {id:index.row.id}});
  tableData.value.splice(index.$index, 1)
  console.log(data)

}


let IUData=async () => {
  let SURL="";
    if (b1bol == 0) {//新增
      SURL="insertService";
    } else { //修改
      SURL="updateServiceAll";
    }

  let {data} = await axios.get(ip + SURL,{params:v1.value} );
    console.log(data)

  ElMessage.success("成功")
  messageBol.value=false;

}


import { Plus } from '@element-plus/icons-vue'

const handleAvatarSuccess= (response) => {
  v1.value.promotional_image = response
}
const handleAvatarSuccess1= (response) => {
  v1.value.promotional_logo = response
}

const beforeAvatarUpload= (rawFile) => {
  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>

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
        <el-option label="待上架" value="0"/>
        <el-option label="已上架" value="1"/>
      </el-select>
    </el-col>

    <el-col :span="6">
      <el-button type="success">搜索</el-button>
      <el-button type="success" @click="tanchuang(null)">新增</el-button>
      <el-button type="success">批量操作</el-button>
    </el-col>
  </el-row>
<br>
<br>

  <el-table :data="tableData" style="width: 100%;" max-height="500">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="序号" width="120" />
    <el-table-column prop="name" label="服务类型" width="120" />
    <el-table-column prop="service_content_name" label="服务内容" width="120" />
    <el-table-column prop="introduction" label="服务简介" width="120" />
    <el-table-column prop="price" label="定价" width="120" />
    <el-table-column fixed="right" label="状态" width="120">
      <template #default="scope">
        <span v-if="scope.row.status===0">
          待上架
        </span>
        <span v-else>
          已上架
        </span>
<!--        {{scope.row.status===0?"待上架":"已上架"}}-->
      </template>
    </el-table-column>


    <el-table-column fixed="right" label="操作" width="300">
      <template #default="scope">
        <el-button type="success" @click="tanchuang(scope.row)">编辑</el-button>
        <el-button :type="scope.row.status===0?'warning':'success'" @click="updateData(scope.row)"> {{scope.row.status===0?"待上架":"已上架"}}</el-button>
        <el-button type="danger" @click="deleteDate(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>




  <el-drawer v-model="messageBol"  :with-header="false">

    <div>
      <span>服务类型:</span>
      <el-select v-model="v1.name" placeholder="服务类型" size="large" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </div>
    <br>

    <div>
      <span>服务内容：</span>
      <el-input v-model="v1.service_content_name" style="width: 240px" placeholder="Please input" />

    </div>
    <br>


    <div>
      <span>宣传图片：</span>
      <el-upload
          class="avatar-uploader"
          :action="ip+'file'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="v1.promotional_image" :src="v1.promotional_image" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <br>

    <div>
      <span>缩略图片：</span>
      <el-upload
          class="avatar-uploader"
          :action="ip+'file'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="v1.promotional_logo" :src="v1.promotional_logo" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>

    </div>
    <br>

    <div>
      <span>服务简介</span>
      <el-input v-model="v1.introduction" style="width: 240px" placeholder="Please input" />

    </div>
    <br>


    <div>
      <span>定价</span>
      <el-input v-model="v1.price" style="width:60px"  placeholder="Please input" />/元

    </div>
    <br>

    <div>
      <span>服务详情</span>
      <el-input v-model="v1.details" style="width: 240px"   type="textarea" placeholder="Please input" />

    </div>
    <br>

    <div>
      <el-button type="success" @click="IUData()">保存</el-button>

    </div>







  </el-drawer>



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