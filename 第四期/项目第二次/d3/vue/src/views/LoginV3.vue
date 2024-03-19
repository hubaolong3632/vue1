<script setup>
import { ref } from 'vue'
import ip from '@/router/utio.js'
import axios from 'axios'
import {useRouter} from "vue-router";
import router from "../router";
let show=ref("");
let user=ref({
  username:localStorage.getItem("username")||"",
  password:localStorage.getItem("password")||"",
  swit:false,
})

let login=async () => {
  console.log(ip.url())
  if (user.value.username.trim() == "") {
    show.value = "请输入账号"
    return;
  }

  if (user.value.password.trim() == "") {
    show.value = "请输入密码"
    return;
  }

    let {data}=  await axios.get(ip.url() + "fromUser", {
        params: user.value
      })
    console.log(data)


    if(data.username==null){

      show.value="账号密码错误";
    }else{
      if (user.value.swit == true) {
        localStorage.setItem("username",user.value.username)
        localStorage.setItem("password",user.value.password)
      }else{
        localStorage.setItem("username","")
        localStorage.setItem("password","")
      }

    console.log("登入成功")
       await router.push("/service")


    }
}


</script>

<template>
<div>

 <div style="margin-top: 20vh;margin-left: 30vw">

     <el-header style="font-size: 30px"><h2>健康颐养平台  后台管理系统</h2></el-header>

       <div style="margin-left: 100px;margin-top: 40px">
         账号: <el-input v-model="user.username" style="width: 240px" placeholder="请输入账号" />
         <br>
         <br>
         密码:<el-input
           v-model="user.password"
           style="width: 240px"
           type="password"
           placeholder="请输入密码"
           show-password
       />

         <br>
         <br>
         是否保存密码:<el-switch
           v-model="user.swit"
           inline-prompt
           active-text="是"
           inactive-text="否"
       />
         <br>
         <p style="color: red">{{show}}</p>
         <br>
         <br>
         <el-button type="success" @click="login()" plain>登入</el-button>
       </div>
 </div>

</div>
</template>
<style scoped>

</style>
