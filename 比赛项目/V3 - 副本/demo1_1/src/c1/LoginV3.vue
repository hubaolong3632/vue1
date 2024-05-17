<script setup>
import {onMounted, reactive, ref} from "vue"
import axios from "axios"
import router from "../router"
import ip from "../router/ip.js"
let v1=ref({
  username:localStorage.getItem("username")||"",
  password:localStorage.getItem("password")||"",
  key:"",
  captcha:"",
  clickbok:false
})
let message=ref("");


let login=async () => {
  if (v1.value.username.trim() === "") {
    message.value = "请输入账号"
    return;
  }

  if (v1.value.password.trim() === "") {
    message.value = "请输入密码"
    return;
  }

  if (v1.value.clickbok === true) {

    localStorage.setItem("username", v1.value.username)
    localStorage.setItem("password", v1.value.password)
  } else {
    localStorage.setItem("username", "")
    localStorage.setItem("password", "")
  }

  let {data}= await axios.post(ip + "auth/login",  v1.value)
  if(data.code ==200){
    localStorage.setItem("key",data.data.access_token)
    console.log(data.data.access_token)

    await router.push("/service")
    localStorage.setItem("user",JSON.stringify(data));
  }else{
    message.value = data.msg
  }




}



let yzm=ref({});
let init=async () => {
  console.log("拿到")
  // let {data} = await axios.post("http://192.168.1.200:8080/auth/captcha", null)
  let {data} = await axios.get(ip+"auth/captcha", null)
  yzm.value=data.data;
  v1.value.key=data.data.key
  console.log("拿到",yzm)
}
init();

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
   验证码:
    <el-input
        v-model="v1.captcha"
        style="width: 240px"
        type="password"
        placeholder="Please input password"
        show-password
    />

    <img :src="yzm.image"  @click="init()">
<!--<p>{{yzm.key}}</p>-->

    <br>
    <br>
    <span>记住我：</span>
    <el-switch
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