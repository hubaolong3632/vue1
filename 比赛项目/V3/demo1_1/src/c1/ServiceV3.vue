<script setup>
import { ref } from 'vue'
import ip from '../router/ip.js'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const tableData = ref([
])


let init=async () => {
  let {data} = await axios.get(ip + "fromService");
  tableData.value=data;
}
init();

//----


const updateV2 = async (index,c1) => {
  index.audit_status=c1;
    console.log(index)
  let {data} = await axios.get(ip + "updateService", {params: index});
  console.log(data)
  if (data == 1) {
    ElMessage.success("成功")
  } else {
    ElMessage.error("失败")

  }
}



let v1=ref({
  "id": 14,
  "volunteer_user_id": 1,
  "service_type_id": "1",
  "service_content_id": "1",
  "create_time": "2024-03-25 22:19:38",
  "update_time": null,
  "user_id": "1",
  "name": "myt",
  "sex": "1",
  "nation": "myt",
  "age": "123",
  "id_card": "123",
  "mobile": "123",
  "address": "myt",
  "service_start_hour": "2024-03-25T14:08:48.000Z",
  "service_end_hour": null,
  "star": null,
  "cumulative_duation": null,
  "cumulative_singular": null,
  "certificate_flag": null,
  "weekends_take_orders": null,
  "id_card_font_image": null,
  "id_card_back_image": "http://localhost:9324/file/1711375733046.jpg",
  "id_card_holder_image": null,
  "audit_status": 1,
  "source": null,
  "create_user_id": null
},);

//----
let messageShow=ref(false);
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
  v1.value.id_card_back_image =response;
}
let handleAvatarSuccess1=(response) => {
  v1.value.id_card_holder_image =response;
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
    URL = "insertService";
    console.log("插入")
  } else {
    URL = "updateServiceAll";
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
      <p>姓名:</p>
      <el-input v-model="v1.name" style="width: 240px"  />
    </div>
    <br>



    <div>
      <p>性别:</p>
      <el-radio-group v-model="v1.sex" class="ml-4">
        <el-radio value="1" size="large">男</el-radio>
        <el-radio value="2" size="large">女</el-radio>
      </el-radio-group>
    </div>
    <br>



    <div>
      <p>名族:</p>
      <el-input v-model="v1.nation" style="width: 240px"  />
    </div>
    <br>


    <div>
      <p>年龄:</p>
      <el-input v-model="v1.age" style="width: 240px" />
    </div>
    <br>


    <div>
      <p>身份证号:</p>
      <el-input v-model="v1.id_card" style="width: 240px"  />
    </div>
    <br>



    <div>
      <p>手机号码:</p>
      <el-input v-model="v1.mobile" style="width: 240px"  />
    </div>
    <br>



    <div>
      <p>家庭住址:</p>
      <el-input v-model="v1.address" style="width: 240px"  />
    </div>
    <br>


    <div>
      <p>服务类型:</p>
      <el-input v-model="v1.service_type_id" style="width: 240px"  />
    </div>
    <br>


    <div>
      <p>服务内容:</p>
      <el-input v-model="v1.service_content_id" style="width: 240px"  />
    </div>
    <br>


    <div>
      <p>服务时段:</p>
      <div class="block">
        <el-date-picker
            v-model="v1.service_start_hour"
            type="datetime"
            placeholder="Select date and time"
        />
      </div>
    </div>
    <br>






    <div>
      <p>身份证正面:</p>

      <el-upload
          class="avatar-uploader"
          :action="ip+'file'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="v1.id_card_back_image" :src="v1.id_card_back_image" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <br>


    <div>
      <p>身份证反面:</p>

      <el-upload
          class="avatar-uploader"
          :action="ip+'file'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="v1.id_card_holder_image" :src="v1.id_card_holder_image" class="avatar" />
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

    <el-table-column  prop="id" label="ID"  />
    <el-table-column  prop="name" label="姓名" />
    <el-table-column  prop="id_card" label="手机号"/>
    <el-table-column  prop="sex" label="年龄" />
    <el-table-column  prop="service_type_id" label="服务类型"  />
    <el-table-column  prop="service_content_id" label="服务内容"/>
    <el-table-column  prop="audit_status" label="审核状态">
      <template #default="scope">
          <p v-if="scope.row.audit_status==0">未审核</p>
          <p v-if="scope.row.audit_status==1">审核通过</p>
          <p v-if="scope.row.audit_status==2">审核未通过</p>
          <p v-if="scope.row.audit_status==3">拉黑</p>
      </template>
<!--      {{scope.row.status==0?'停用':'启用'}}-->
    </el-table-column>


    <el-table-column  label="操作" width="400" >
      <template #default="scope">
        <el-button type="primary" >详细</el-button>
        <el-button type="primary" @click="show(scope.row)">编译</el-button>
        <el-button @click="updateV2(scope.row,1)">通过</el-button>
        <el-button  @click="updateV2(scope.row,2)"  type="info">拒绝</el-button>
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