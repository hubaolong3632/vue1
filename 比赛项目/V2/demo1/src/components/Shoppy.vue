<script setup>
import {ref} from "vue";
import axios from "axios";
import ip from "../router/ip.js";

let tableData=ref([]);

let v1=ref({
  id:"",
  code:"",
  payment_status:"",
  service_object_name:"",
  contact_mobile:"",
  name:"",
  order_time:""
})

let init=async () => {
  let {data} = await axios.get(ip + "shoppy", {})
  tableData.value=data;
}
init();



let dataFrom=async () => {
  let {data} = await axios.get(ip + "shoppy", {
    params: v1.value
  })
  tableData.value=data;
}

let deletData=async () => {
  v1.value={};
}


</script>

<template>

  <el-row :gutter="20">
    <el-col :span="8">
      <span>订单编号:</span>
      <el-input v-model="v1.code" style="width: 240px"/>
    </el-col>
    <el-col :span="8">
      <span>联系人姓名:</span>
      <el-input v-model="v1.service_object_name" style="width: 240px"/>
    </el-col>
    <el-col :span="8">
      <span>联系人电话:</span>
      <el-input v-model="v1.contact_mobile" style="width: 240px"/>
    </el-col>
    </el-row>

  <br>
  <el-row :gutter="20">
    <el-col :span="8">
      <span>订单状态:</span>
      <el-select v-model="v1.payment_status" placeholder="订单状态" size="large" style="width: 240px">
        <el-option label="未支付" value="0"/>
        <el-option label="已支付" value="1"/>
      </el-select>
    </el-col>
    <el-col :span="8">
      <span>下单时间:</span>
      <el-input v-model="v1.order_time" style="width: 240px"/>
    </el-col>
    <el-col :span="8">
      <span>服务类型:</span>
      <el-select v-model="v1.name" placeholder="服务类型" size="large" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-col>
  </el-row>
  <br>

  <el-row :gutter="20">
    <el-col :span="20">
    </el-col>
    <el-col :span="4">
      <el-button type="success" @click="dataFrom()">查询</el-button>
      <el-button type="success" @click="deletData()">清空</el-button>
    </el-col>
  </el-row>
  <br>
  <br>

  <el-table :data="tableData" style="width: 100%"  max-height="500">
    <el-table-column prop="id" label="序号" width="200" />
    <el-table-column prop="code" label="订单编号" width="200" />
    <el-table-column prop="payment_status" label="订单状态" width="200" />
    <el-table-column prop="service_object_name" label="联系人姓名" width="200" />
    <el-table-column prop="contact_mobile" label="联系人电话" width="200" />
    <el-table-column prop="name" label="服务类型" width="200" />
    <el-table-column prop="order_time" label="下单时间" width="200" />

  </el-table>




</template>


<style scoped>

</style>