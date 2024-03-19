<script setup>

import {ref} from "vue";

let v1=ref({
  c1:"",
  c2:"",
  c3:"",
  value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
  c4:"请选择"
})
let v2=ref([
    {label:"已支付",value:"已支付"},
    {label:"未支付",value:"未支付"},
    ])

let tableBody=ref([{id:1,c1:"0012303303" ,c2:"已支付",c3:"张三",c4:"13212332123",c5:"上门服务",c6:"2024.2.12"},{id:1,c1:"0012303303" ,c2:"已支付",c3:"张三",c4:"13212332123",c5:"上门服务",c6:"2024.2.12"},{id:1,c1:"0012303303" ,c2:"已支付",c3:"张三",c4:"13212332123",c5:"上门服务",c6:"2024.2.12"},]);

</script>

<template>
  <el-row :gutter="20">
    <el-col :span="8"><span>订单编号:</span><el-input v-model="v1.c1" placeholder="请输入内容"></el-input></el-col>
    <el-col :span="8">联系人姓名:<el-input v-model="v1.c2" placeholder="请输入内容"></el-input></el-col>
    <el-col :span="8">联系电话:<el-input v-model="v1.c3" placeholder="请输入内容"></el-input></el-col>
  </el-row>
<br>
  <el-row :gutter="20">
    <el-col :span="8">订单状态:  <el-select v-model="v1.c4" placeholder="Select" >
      <el-option v-for="item in v2" :key="item.value" :label="item.label" :value="item.value"
      />
    </el-select></el-col>
    <el-col :span="8">下单时间:<div class="block">
      <el-date-picker
          v-model="v1.value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
    </div></el-col>
    <el-col :span="8">服务类型:<el-input v-model="v1.c3" placeholder="请输入内容"></el-input></el-col>
  </el-row>

    <br>
  <el-row :gutter="20">
    <el-col :span="20"></el-col>
    <el-col :span="2"><el-button type="success">查询</el-button></el-col>
    <el-col :span="2"><el-button type="info">清空</el-button></el-col>
  </el-row>
  <br>
  <br>

  <el-table :data="tableBody" style="height: 50vh">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="c1" label="订单编号"></el-table-column>
      <el-table-column prop="c2" label="订单状态"></el-table-column>
      <el-table-column prop="c3" label="联系人姓名"></el-table-column>
      <el-table-column prop="c4" label="联系人电话"></el-table-column>
      <el-table-column prop="c5" label="服务类型"></el-table-column>
      <el-table-column prop="c6" label="下单时间"></el-table-column>
  </el-table>

</template>



<style scoped>

</style>