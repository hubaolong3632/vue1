<script setup>
import {ref} from "vue";
import axios from "axios";
import ip from "../router/utio";
const tableData = ref();
let payment_status=ref([ {
  value: '1',
  label: '已支付',
},
  {
    value: '0',
    label: '未支付',
  },]
);

let name=ref([ {
      value: '上门护理',
      label: '上门护理',
    },
      {
        value: '上门体检',
        label: '上门体检',
      },
  {
    value: '上门打扫',
    label: '上门打扫',
  },

    ]
);

const v1 = ref( {});


let updateData=()=>{
  v1.value={}
}

let kk=async () => {
  let {data} = await axios.get(ip.url()+"shoppy")
  tableData.value = data
}
kk();


let from1=async () => {
  let {data} = await axios.get(ip.url()+"shoppy",{
    params:v1.value
  })
  console.log(data)
  tableData.value = data
}
</script>



<template>
  <div style="background-color: rgba(66,185,131,0.13)">
    <el-row :gutter="20">
      <el-col :span="8">订单编号:<el-input v-model="v1.code" style="width: 240px" placeholder="Please input" /></el-col>
      <el-col :span="8">联系人姓名:<el-input v-model="v1.contact_name" style="width: 240px" placeholder="Please input" /></el-col>
      <el-col :span="8">联系人电话:<el-input v-model="v1.contact_mobile" style="width: 240px" placeholder="Please input" /></el-col>
    </el-row>
    <br>

    <el-row :gutter="20">
      <el-col :span="8">订单状态:<el-select
          v-model="v1.payment_status"
          placeholder="Select"
          size="large"
          style="width: 240px"
      >
        <el-option
            v-for="item in payment_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      </el-col>
      <el-col :span="8">下单时间:<el-input v-model="v1.order_time" style="width: 240px" placeholder="Please input" /></el-col>
      <el-col :span="8">服务类型:   <el-select
          v-model="v1.name"
          placeholder="Select"
          size="large"
          style="width: 240px"
      >
        <el-option
            v-for="item in name"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select></el-col>
    </el-row>

<br>
    <el-row :gutter="20">
      <el-col :span="20"></el-col>
      <el-col :span="4"><el-button type="primary" @click="from1()">查询</el-button>
        <el-button type="success" @click="updateData()">清空</el-button></el-col>
    </el-row>
  </div>
  <br>
  <br>
  <br>
  <br>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="code" label="订单编号" width="180" />
      <el-table-column prop="payment_status" label="订单状态" width="180" >
        <template #default="scope" >
          {{scope.row.payment_status=="0"?"未支付":"已支付"}}

        </template>

      </el-table-column>



      <el-table-column prop="contact_name" label="联系人姓名" width="180" />
      <el-table-column prop="contact_mobile" label="联系人电话" width="180" />
      <el-table-column prop="name" label="服务类型" width="180" />
      <el-table-column prop="order_time" label="下单时间" width="180" />
    </el-table>
  </div>
</template>



<style scoped>

</style>