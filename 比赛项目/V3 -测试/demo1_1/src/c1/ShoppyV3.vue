<script setup>
import {ref} from 'vue'
import ip from "../router/ip.js"
import axios from "axios"
import { ElMessage } from 'element-plus'


const tableData = ref([])



const init = async () => {
  let {data} = await axios.get(ip + "fromShoppy");
  tableData.value=data;
}
init()


let v1={
  "id": 12,
  "title": "Title345345请3123",
  "launch_page": "Launch Page 5",
  "picture": "http://file.00000.work:19000/my-bucketname/user/zhangsan/date/2024-02-29/fileName/1709217151608-Screenshot_2024-02-29-19-01-07-395_com.tencent.mobileqq.jpg",
  "status": "启用",
  "create_user_id": "5",
  "create_time": "2023-05-15 08:34:00",
  "update_time": "2023-05-15 08:34:00"
};

const deleteRow = async (index) => {
  let {data} = await axios.get(ip + "deleteShoppy", {params: index.row})
  if (data == 1) {
    ElMessage.success("成功");
    tableData.value.splice(index.$index, 1)
  } else {
    ElMessage.error("失败");
  }
}

const onAddItem = () => {
  tableData.value.push()
}

const updateFrom = async (index) => {
  index.status==0?index.status=1:index.status=0;
  let {data} = await axios.get(ip + "updateShoppy", {params:index})
    console.log(data)
  if(data==1){
    ElMessage.success("成功");
  }else{
    ElMessage.error("失败");

  }

}

</script>


<template>
  <el-row :gutter="20">
    <el-col :span="6"><el-button type="success" @click="onAddItem">新增</el-button></el-col>
  </el-row>
  <br>
  <br>
  <br>


  <el-table :data="tableData" style="width: 100%" max-height="500">
    <el-table-column prop="id" label="序号" width="200" />
    <el-table-column prop="title" label="广告标题" width="200" />
    <el-table-column  label="广告图片" width="200">
      <template #default="scope">
       <img :src="scope.row.picture" style="height: 20px;width: 20px">
      </template>
    </el-table-column>
    <el-table-column label="状态" width="200" >
      <template #default="scope">
        {{scope.row.status==0?'停用':'启用'}}
      </template>
      </el-table-column>
    <el-table-column prop="" label="操作" width="300" >
      <template #default="scope">

          <el-button type="primary">编译</el-button>
          <el-button @click="updateFrom(scope.row)" :type="scope.row.status==0?'danger':'success'">{{scope.row.status==0?'停用':'启用'}}</el-button>
          <el-button type="info" @click="deleteRow(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>



</template>



<style scoped>

</style>