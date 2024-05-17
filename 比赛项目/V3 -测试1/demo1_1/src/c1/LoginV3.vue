<script setup>
import {onMounted, ref} from "vue"
import axios from "axios"
import router from "../router"
import ip from "../router/ip.js"
let v1=ref({
  username:localStorage.getItem("username")||"",
  password:localStorage.getItem("password")||"",
  clickbok:false

})
let message=ref("");


let login=async () => {
  if (v1.value.username.trim() == "") {
    message.value = "请输入账号"
    return;
  }

  if (v1.value.password.trim() == "") {
    message.value = "请输入密码"
    return;
  }

  if (v1.value.clickbok == true) {

    localStorage.setItem("username", v1.value.username)
    localStorage.setItem("password", v1.value.password)
  } else {
    localStorage.setItem("username", "")
    localStorage.setItem("password", "")
  }

 let {data}= await axios.get(ip + "login", {params: v1.value})
  console.log(data)
  console.log(data.username)
  if(data!=null&&data!=""){
    localStorage.setItem("user",JSON.stringify(data));
    await router.push("/service")
  }else{
    message.value = "账号密码错误"

  }


}



</script>

<template>
<div style="margin-top: 40vh;margin-left: 40vw">
  <h2>健康颐养平台 后台管理系统</h2>
  <br>
   账号:<el-input v-model="v1.username" style="width: 240px" placeholder="Please input" />
  <br>
  <br>
  密码：<el-input
      v-model="v1.password"
      style="width: 240px"
      type="password"
      placeholder="Please input password"
      show-password
  />
  <br>
  <br>
  <span>记住我：</span><el-switch
      v-model="v1.clickbok"
      inline-prompt
      active-text="是"
      inactive-text="否"
  />
  <br>
  <p style="color: red">{{message}}</p>
  <br>
  <el-button type="success" @click="login()"> 登入</el-button>

</div>
</template>



<style scoped>

</style>