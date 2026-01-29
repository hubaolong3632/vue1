<template>
  <div>

    <el-dialog
        title="登录"
        :visible.sync="centerDialogVisible"
        width="70vmin"
        center>


      <hr>
      <div style="text-align:center">公告:如果没有账号密码可以申请，如果有请点击登录功能</div>
      <span slot="footer" class="dialog-footer">


    <div style="display: flex; justify-content: space-between;">
          <span style="white-space: nowrap; font-size: 14px;padding-top: 10px;">用户名:</span>
          <el-input
              clearable="true"
              style="width: 100%; min-width: 150px;padding-left: 10px"
              v-model="user.name"
              placeholder="请输入内容"
          />
    </div>
    <br />
    <div style="display: flex; justify-content: space-between;">
         <span style="white-space: nowrap; font-size: 14px;padding-top: 10px;">密&nbsp;&nbsp;码:</span>

      <el-input
          show-password="true"
          v-model="user.password"
          placeholder="请输入内容"
          style="width: 100%; min-width: 150px;padding-left: 10px"
      />
    </div>
    <br/>
    <img src="@/components/image/login/QQ_login.png" style="cursor: pointer" @click="QQLoginClick()">
    <br/>
    <br />
    <el-button @click="register()">注册</el-button>
    <el-button type="primary" @click="login()">登录</el-button>
  </span>
    </el-dialog>



  </div>
</template>
<script>
import ImageCreateYou from "@/components/alter/AI/AIImage/ImageCreateYou.vue";
import ImageOrdelZuo from "@/components/alter/AI/AIImage/ImageOrdelZuo.vue";
import Bus from "@/utils/EventBus";

export default {
  name: "LoginV2",
  components: { ImageCreateYou, ImageOrdelZuo},
  data() {
    return {
      centerDialogVisible: true,
       user:{
         name:"",
         password:""
       }


    };
  },
  created() {

    //监听父类的按钮消息如果按了就执行我这个
    Bus.$on("centerDialogVisible",()=>{
      this.centerDialogVisible =true;
    })


  },
  methods: {
    QQLoginClick(){
      var A=window.open("https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=102386211&response_type=token&scope=all&redirect_uri=https://yj.00000.work/AIImage","TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");



    },
    login(){




      this.centerDialogVisible = false;

    },
    register(){
      this.centerDialogVisible = false;

    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
};

</script>



<style hidden>
.dialog-footer {
  padding: 10px 0;
}
.dialog-footer span {
  color: #666;
}
.dialog-footer.el-input {
  border-radius: 4px;
}
.dialog-footer.el-button {
  margin-left: 10px;
}
</style>
