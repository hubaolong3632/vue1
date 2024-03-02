<template>
<div>
  <div class="bg-purple-dark el-row">

    <el-row>
      <el-card shadow="always">
        <el-radio-group v-model="imageOption.option" v-for="nameRoute of imageOption.nameRoute" :key="nameRoute.name">
          <el-radio-button :label="nameRoute.name"></el-radio-button>
        </el-radio-group>
      </el-card>
    </el-row>


  <!--  路由缓存-->
<!--    <keep-alive :include="cache" max="10" >-->
    <keep-alive>
     <router-view class="div-with-scroll"></router-view>
    </keep-alive>

    <el-card shadow="always" class="el-row">
      <el-button type="success" @click="shengCheng()"  round >生成图片</el-button>
    </el-card>



  </div>
</div>
</template>

<script>
import Bus from "@/utils/EventBus";
import ElementUI from "element-ui";

export default {
  name: "ImageOrdelZuo",
  data(){
    return{
      //判断是否开始润色
      polish:true,
      //缓存
      cache:[],
      imageOption:{
        option:"高级创作", //推荐高级创造
        nameRoute:[ //头部组件切换
                   {name:"快捷创作",route:"/AIImage/ImageFast",module:"ImageFast"},
                   {name:"高级创作",route:"/AIImage/ImageAdvanced",module:"ImageAdvanced"}
                  ],

      },
      textarea: '',
      imageText:null, //回答的问题
    }
  },
  activated() {
    console.log("激活")
    this.from1(this.imageOption.option);
  },
  deactivated() {
    console.log("离开")

  },
  created() {
    console.log("组件加载")
    //加载缓存组件
    for(let Route of this.imageOption.nameRoute){
      this.cache.push(Route.module)
    }

    this.from1(this.imageOption.option);

    //获取传过来的画图的参数
    Bus.$on("imageText",(imageText)=>{

      if(imageText.prompt==null||imageText.prompt.trim()==""){
        this.$message({
          message: '请填写或点击(开始润色),GPT4.0润色的内容.',
          type: 'warning'
        });
        return;
      }

      console.log("拿到的参数:",imageText)
      this.imageText=imageText; //拿到值传递给我的组件


      this.$confirm(`你确定生成${this.imageText.n}张图片吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //生成图片
        // this.$message({
        //   type: 'success',
        //   message: '请稍等图片已经开始生成了!'
        // });
        this.$notify({
          title: '成功',
          message: "请稍等图片已经开始生成了",
          type: 'success'
        });
        console.log("生成图片")

        //图片绘制
        Bus.$emit("imagePicture",imageText)


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    })

  },
  watch:{
    //监听按钮是否修改
    "imageOption.option"(xing){
        this.from1(xing);
    }
  },
  methods:{
      //查询当前是哪个状态
      from1(xing){
        for(let nameRoute of this.imageOption.nameRoute){
          if(nameRoute.name==xing){
            // console.log(nameRoute.route)
            this.$router.push(nameRoute.route,()=>{},()=>{})
            break;
          }
        }
      },
    shengCheng(){
        Bus.$emit("aa","启动");
        console.log("启动")
    }


  },
  beforeDestroy() {
    console.log("销毁阶段")
    Bus.$off("aa");
    Bus.$off("imagePicture");
    Bus.$off("imageText");
  }
}
</script>

<style scoped>
.div-with-scroll {
  height: 70vh; /* 设置div的高度 */
  overflow-y: auto; /* 垂直溢出时显示滚动条 */
}
.el-row {
  margin-bottom: 10px;
}
</style>