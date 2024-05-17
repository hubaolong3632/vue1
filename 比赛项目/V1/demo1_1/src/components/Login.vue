<script setup>
import {ref} from "vue";
import axios from "axios";
import rou from "../router/index.js";
import ip from "../router/ip.js";



let user=ref({
  username:localStorage.getItem("username")||"",
  password:localStorage.getItem("username")||"",
  show:"",
  chick:false,
})

let login=async () => {
  console.log("登入")

  if (user.value.username.trim() === "") {
    user.value.show = "请输入用户名"
    return;
  }
  if (user.value.password.trim() === "") {
    user.value.show = "请输入密码"
    return;

  }

  if(user.value.chick===true){
    localStorage.setItem("username",user.value.username)
    localStorage.setItem("password",user.value.password)
  }else{
    localStorage.setItem("username","")
    localStorage.setItem("password","")
  }


 let {data}=await axios.get(ip+"login", {
   params:user.value
  })
  console.log(data)
  if(data===true){
    await rou.push("/service")
    // alert("登入成功")
  }else{
    user.value.show = "账号密码错误"
  }


}



</script>

<template>
<div>
  <div style="margin-top: 20vh;margin-left: 40vw">
  <h2>  健康颐养平台后台管理系统</h2>



    账号:<el-input v-model="user.username" style="width: 240px" placeholder="Please input" /><br><br>
    密码：<el-input v-model="user.password" style="width: 240px" placeholder="Please input" /><br><br>
    <br>
    <el-switch
        v-model="user.chick"
        inline-prompt
        active-text="是"
        inactive-text="否"
    />
    <br>
    <p style="color: red">{{user.show}}</p>
    <br>
    <el-button type="success" @click="login()">登入</el-button>
  </div>

</div>
</template>

<style scoped>

</style>
