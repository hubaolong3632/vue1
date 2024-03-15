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

    let {data}=  await axios.get(ip.url() + "from_login", {
        params: user.value
      })


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
      await router.push("/home")


    }






}


</script>

<template>
<div>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-header></el-header>
      <el-main style="margin-left: 30vw">
        <el-container>
          <el-header style="font-size: 30px"><h1>健康颐养平台  后台管理系统</h1></el-header>
          <el-main>

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


          </el-main>
        </el-container>


      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</div>
</template>

<style scoped>

</style>
