<template>
<div class="cc1">




<div/>
<div/>
<div/>
<div/>

<div  >
  <h2>健康颐养管理平台</h2>

  <div >
    <span>账号:</span><input type="text" v-model="user.username"><br><br>
    <div style="display: flex;">
       <span>密码:</span><input v-model="user.password" :type="text==true?'text':'password'"><span><img  @click="text=!text" :src="text==true?img[0]:img[1]" style="width: 30px;margin-left: 40px;"></span> 
    </div>
  </div>
  <br>
  <input type="checkbox" v-model="checkbol">记住我
  <br>
  <p>{{ show }}</p>
  <br>
  <button @click="login()">登入</button>

 
 


</div>



</div>
</template>
<script>
import axios from 'axios'
import ip from '@/utio/ip'
export default {
  name: "LoginV1",
  data(){
    return {
      show:"",
      checkbol:false,
      text:false,
      img:[
        require('@/img/c1.png'),require('@/img/c2.png')
      ],
      
      user:{
        username:localStorage.getItem("username")||"",
        password:localStorage.getItem("password")||"",
      },

    }
  },
  methods:{
    async login(){
     let user= this.user;
     console.log("xx:"+user.username);
      if(user.username.trim()==""){
       this.show="请输入账号"
        return;
      }

      if(user.password.trim()==""){
        this.show="请输入密码"
        return;
      }

        console.log(ip.url());
    

    let {data}=  await axios.get(ip.url()+"from_login",{
            params:user
     })



     if(data.username!=null){
          if(this.checkbol==true){
            localStorage.setItem("username",user.username)
            localStorage.setItem("password",user.password)
          }else{
            localStorage.setItem("username","")
            localStorage.setItem("password","")
          }
     

      console.log(data)
      this.show="登入成功"
     }else{
      this.show="账号密码错误"
     }
    



    }
  }
}
</script>

<style scoped>

.cc1{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
 grid-row-gap: 30vh;
 grid-column-gap: 30vw;
}

.cc2{
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.cc3{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.cc4{
  display: grid;
  grid-template-columns: 1fr 1fr ;
}


</style>