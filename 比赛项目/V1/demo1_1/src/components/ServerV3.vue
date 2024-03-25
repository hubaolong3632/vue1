<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import {ref} from "vue";
import axios from "axios";
import ip from '../router/utio';

let leixing=ref()

let kk=async () => {
  let {data} = await axios.get(ip.url()+"fromType", {})
  leixing.value = data;
}
kk();


//-----

let neiron=ref({

})

let neiron1=ref({

})
let zhuangtai=ref([
  {label:"待上架",value:"0"},
  {label:"已上架",value:"1"},])

let sj=ref({
  service_type_id:"",
  service_content_id:"",
});

let Onchange1=async () => {
  // console.log(sj.value.service_type_id)
  let {data} = await axios.get(ip.url()+"fromContent", {
    params:xuanze.value,
  })
  neiron1.value=data;
  console.log(data)

  // sj.value.service_content_id=data[0].service_content_id

  console.log(neiron1.value)
}

let Onchange=async () => {
    // console.log(sj.value.service_type_id)
  let {data} = await axios.get(ip.url()+"fromContent", {
    params:sj.value,
  })
  neiron.value=data;
  // console.log(data)

  // sj.value.service_content_id=data[0].service_content_id

  // console.log(neiron.value)
}

// ------------



let tableData=ref([]);


let kk2=async () => {
  let {data} = await axios.get(ip.url()+"service", {
    params:sj.value
  })
  tableData.value = data;
}
kk2();



let deleteRow=async (index) => {
  console.log(index.row)

  tableData.value.splice(index.$index, 1)


  let {data} = await axios.get(ip.url()+"deleteService", {
    params: index.row
  })
  console.log(data)

}

let updateScope=async (index) => {
  console.log( index.row.status)

      if(index.row.status==1){
        index.row.status=0;
      }else{
        index.row.status=1;
      }
  console.log( index.row.status)

  let {data} = await axios.get(ip.url()+"addService", {
    params: index.row
  })
  console.log(data)
}






const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // console.log(response)
  xuanze.value.promotional_image = response
}



const handleAvatarSuccess2: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // console.log(response)
  xuanze.value.promotional_logo = response
}


const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('Avatar picture size can not exceed 20MB!')
    return false
  }
  return true
}


// let drawer=ref(false);
let drawer=ref(true);
let addOrUpdate=ref(0); //0为添加
let xuanze=ref({
  service_type_id:"",
  service_content_id:"",
  introduction:"",
  details:"",
  promotional_image:"",
  promotional_logo:"",
  price:"",
  volunteer_open_flag:"",
  status:"",
});

let xz=ref(0);
let drawerClick=(index)=>{

  drawer.value=true;
  // console.log(index.row)
  if(index!=null){
    xz.value=1; //修改
    xuanze.value=index.row;

    console.log(index.promotional_image)
  }else{
    xz.value=0; //添加
    xuanze.value={
      details: "",
      introduction: "",
      price: "",
      promotional_image: "",
      promotional_logo: "",
      service_content_id: "",
      service_type_id: "",
      status: "",
      volunteer_open_flag: ""
    };

  }

}



//插入或者修改数据
let insertUpdateData=async () => {
  let url="InsertService";
  if(xz.value==1){
    url="updateService";
  }

  let {data} = await axios.get(ip.url()+`${url}`, {
    params: xuanze.value
  })


  if(data==1){
    ElMessage({
      message: '成功',
      type: 'success',
    })
    drawer.value=false;
  }
}
let filrIP=ip.url()+"file";
</script>

<template>
  <div>
<!--弹窗部分-->
    <el-drawer v-model="drawer" title="健康颐养平台管理后台：" :with-header="drawer">
      <div>
        <p>服务类型:</p>
        <el-select v-model="xuanze.service_type_id" placeholder="Select" size="large" style="width: 240px" :change="Onchange1()">
          <el-option v-for="item in leixing" :key="item.id" :label="item.name" :value="item.id"
          />
        </el-select>
      </div>
      <br>
      <br>
      <div>
        <p>服务内容:</p>
        <el-select
            v-model="xuanze.service_content_id"
            placeholder="Select"
            size="large"
            style="width: 240px"
        >
          <el-option
              v-for="item in neiron1"
              :key="item.service_content_id"
              :label="item.service_content_name"
              :value="item.service_content_id"
          />


        </el-select>
      </div>


      <br>
      <br>

<!--    上传  -->
      <div>
        <p>宣传图片</p>
          <el-upload
              class="avatar-uploader"
              :action="filrIP"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="xuanze.promotional_image" :src="xuanze.promotional_image" class="avatar" style="border: red 1px ridge;width: 200px;height: 200px"/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

      </div>


       <br>
      <!--    上传  -->
      <div >
        <p>缩略图片</p>


          <el-upload
              class="avatar-uploader"
              :action="filrIP"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if=" xuanze.promotional_logo" :src="xuanze.promotional_logo" class="avatar"  style="border: red 1px ridge;width: 200px;height: 200px" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>




      </div>



<!--      服务简介绍-->
      <br>
      <div>
        <p>服务简介:</p>

        <el-input maxlength="15" v-model="xuanze.introduction" style="width: 240px" :rows="2" placeholder="Please input"/>
      </div>


      <br>
      <div>
        <p>定价:</p>
        <el-input  type="number" v-model="xuanze.price" style="width: 240px" :rows="2" placeholder="Please input"/>
      </div>


      <br>
      <div>
        <p>服务详细:</p>
        <el-input maxlength="100" v-model="xuanze.details" style="width: 240px" :rows="2" type="textarea" placeholder="Please input"/>
      </div>

  <br>
  <br>
    <el-button type="success" @click="insertUpdateData">确定</el-button>

    </el-drawer>
  </div>




<!--上半部分-->
<div>
  <el-row :gutter="20">
    <el-col :span="4">

  <span>服务类型:</span>
      <el-select
          v-model="sj.service_type_id"
          placeholder="Select"
          size="large"
          style="width: 130px"
          :change="Onchange()"
      >

        <el-option
            v-for="item in leixing"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>


    </el-col>
    <el-col :span="4">
      <span>服务内容:</span>

      <el-select
          v-model="sj.service_content_id"
          placeholder="Select"
          size="large"
          style="width: 130px"
      >
        <el-option
            v-for="item in neiron"
            :key="item.service_content_id"
            :label="item.service_content_name"
            :value="item.service_content_id"
        />
      </el-select>


    </el-col>
    <el-col :span="4">
      <span>服务简介:</span>
      <el-select
          v-model="sj.status"
          placeholder="Select"
          size="large"
          style="width: 130px"
      >
        <el-option
            v-for="item in zhuangtai"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

    </el-col>


    <el-col :span="2"> <el-button type="primary" @click="kk2()">搜索</el-button></el-col>
    <el-col :span="2"><el-button type="success" @click="drawerClick(null)">新增</el-button></el-col>
    <el-col :span="4"><el-button type="info">批量操作</el-button></el-col>
  </el-row>
</div>

  <br>
  <br>
  <br>
  <br>
  <div>
    <div style="margin-left: 3vw;height: 60vh">
      <el-table :data="tableData" style="width:100%" max-height="600" >
        <el-table-column fixed prop="id" label="序号" width="150" />
        <el-table-column fixed prop="name" label="服务类型" width="150" />
        <el-table-column fixed prop="service_content_name" label="服务内容" width="150" />
        <el-table-column fixed prop="introduction" label="服务简介" width="150" />
        <el-table-column fixed prop="price" label="定价" width="150" />
        <el-table-column fixed   label="状态" width="150" >
        <template #default="scope">
          {{scope.row.status==0?"待上架":"已上架"}}
        </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" @click="drawerClick(scope)">编辑</el-button>
            <el-button :type="scope.row.status==0?'danger':'success'" @click="updateScope(scope)">{{scope.row.status==0?"待上架":"已上架"}}</el-button>
            <el-button type="info" @click="deleteRow(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>





<style scoped>

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