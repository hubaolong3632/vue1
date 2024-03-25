<script setup>
  import {ref} from "vue";
  import axios from "axios";
  import ip from "../router/ip.js";
  import router from "../router/index.js";

  let v1=ref({
    username:localStorage.getItem("username")||"",
    password:localStorage.getItem("password")||"",
    clickbok:false,
  })
  let messageShow=ref("");


  let login=async () => {
    if (v1.value.username.trim() == "") {
      messageShow.value = "请输入账号"

      return;
    }
    if (v1.value.password.trim() == "") {
      messageShow.value = "请输入密码"
      return;
    }
    if(v1.value.clickbok==true){
      localStorage.setItem("username",v1.value.username)
      localStorage.setItem("password",v1.value.password)
    }else{
      localStorage.setItem("username","")
      localStorage.setItem("password","")
    }


    let {data} = await axios.get(ip+"login", {params:v1.value});
    if(data==true){
      await router.push("/service")
    }else{
      messageShow.value = "账号密码错误"
    }


  }


</script>

<template>
  <div>
    <div style="margin-top: 20vh;margin-left: 50vh">
      <h1>健康颐养管理系统</h1>

      <span>请输入账号:</span>
      <el-input v-model="v1.username" style="width: 240px"/>
      <br>
      <br>
      <span>请输入密码:</span>
      <el-input v-model="v1.password" placeholder="Please input password" show-password style="width: 240px" type="password"/>
      <br>
      <br>
      <el-switch
          v-model="v1.clickbok"
          inline-prompt
          active-text="是"
          inactive-text="否"
      />
      <br>
      <p>{{messageShow}}</p>


      <el-button type="success" @click="login()">登入</el-button>
    </div>


  </div>
</template>


<style scoped>

</style>