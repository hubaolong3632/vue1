<template>
<!--  首页   文件图床  智能AI  物品购买  联系我们-->
<!-- AI助手  AI绘图  GPT4   看图识物-->
<!--  头部   fixed-top最上面-->
  <header style="height: 56px;background-color: rgba(255,255,255,0.54)" class="p-1  fixed-top with-underline" >
    <!--      这里的 作用是 让 页面的 宽度 适配 手机屏幕的 宽度，这样写 就能使 html 的 width 等于 对应手机 屏幕的 宽度。另外 还阻止用户 缩放 界面-->
<!--    设置logo-->
    <el-row :gutter="20">
      <el-col :span="4" class="left-content p-1 ">
        <img   src="../image/logo/logo2.png" style="height:40% ;width:40%; cursor:pointer" @click="skip_index(headerDate[0])">
<!--        <span class="index_tag__vNHRb"><span>内测版</span></span>-->
      </el-col>

<!--      设置文章显示-->
      <el-col class="font_1 index_gradient-label__6zsG5 " :span="15"  >

        <!--        设置文字显示-->
            <div @click="skip_index(header)" v-for="header of headerDate" :key="header.id" style="cursor: pointer;"  >
                <el-col :span="3" :class="['float-event', 'p-2', 'el-dropdown-link',xuanzhon==header.id?'float-event_click':'']">
<!--                    <p  v-if="header.list.length==0" style="font-size: 1vw; ">{{header.name}}</p>-->
                    <p  v-if="header.list.length==0" style="">{{header.name}}</p>
                    <el-dropdown v-else>
                      <div class="el-dropdown-link">
                        <span class="el-dropdown-link" style="font-size: 1vw">{{header.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </div>

                      <el-dropdown-menu slot="dropdown" style="width: 8%" >
                        <!--                          @mouseenter=""-->

                        <div v-for="header_to of header.list" :key="header_to.id+1"  @click="skip_index(header_to)" >

                          <el-dropdown-item style="text-align: center;font-size: 1vw; "> {{header_to.name}} </el-dropdown-item>
                        </div>


                      </el-dropdown-menu>
                    </el-dropdown>

                </el-col>
            </div>

      </el-col>


      <el-col :span="5" class="p-2" >

        <div @click="startLogin()" style="display: flex;cursor: pointer">
<!--          <el-avatar :size="sizeList[1]" :src="circleUrl"  style="cursor: pointer"></el-avatar>-->
          <p class="p-1-1" style="padding-top: 5px;padding-left: 10px">登录</p>
        </div>
      </el-col>

    </el-row>
  </header>




</template>

<script>
import Bus from "@/utils/EventBus";
import router from "@/router";

export default {
name: "TouBu",
  data() {
    return {
        headerDate:[
            {id:1,name:"首页",  route:"/IndexZhonBu",list:[]},
            {id:2,name:"联网AI",route:"/ChatGptZhonBu",list:[]},
            {id:3,name:"AI绘图",route:"/AIImage",list:[]},
            {id:4,name:"AI聊天",route:"/VoiceChar",list:[]},
            // {id:5,name:"ChatGpt3.5",route:"/ShoppingZhonBu",list:[]},
            {id:6,name:"其他",route:"null",list:[
                {id:30,name:"图床",route:"/tc",list:[]},
                // {id:30,name:"图床",route:"/ccc",list:[]},
                {id:31,name:"联系我们",route:"/FIleZhonBu",list:[]},{id:32,name:"次数购买",route:"/FIleZhonBu",list:[]},{id:34,name:"看图识物",route:"/FIleZhonBu",list:[]}]},

        ],
       //当前选中的
       xuanzhon:"",
       // home1: {name:"首页",route:"/FIleZhonBu",list:[]}, //主页
       // circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //默认头像
       circleUrl: require("@/components/image/logo/AI.png"), //默认头像
       sizeList: ["large", "medium", "small"] //头像大小
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    startLogin() {  //打开登录界面
      Bus.$emit("centerDialogVisible") //携带参数返回给非父类
    },

    skip_index(h1){
      if(h1.route==="null")return; //如果没有不存在就不要当前参数

      // alert("步入")
      // console.log("名字：",h1.name)
      console.log("名字：",h1.name)
      // console.log("拿到",h1.route)
      this.$router.push(h1.route,()=>{}, ()=>{}) //加回调函数防止连续点击
      this.xuanzhon=h1.id;

      // this.$router.push(h1.route).catch(err => {
      //   if (err.name !== 'NavigationDuplicated') {
      //     throw err;
      //   }
      // });
      // this.$router.push({ name: h1.route });
    }

  }
}
</script>

<style  >
/*需要*/
.el-dropdown {
  display: inline-block;
  position: unset !important;
  color: #606266;
  font-size: 14px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 10px;
  color: #1d38d9;
}
.p-1-1{
  padding-top: 5px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  background-color: #fff;
  border: 3px solid #555;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: inline-block;
}

.index_gradient-label__6zsG5 {
  font-family: 华文楷体;
  background-image: linear-gradient(45deg, #ff0000, #ff8000, rgba(25, 204, 123, 0.3), #d26274, #0000ff, #8000ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /*text-shadow: 0 0 5px #ffffff; !* 添加白色的文字阴影，增加立体感 *!*/
  /*font-size: 48px; !* 设置字体大小 *!*/
}

.left-content {
  flex-grow: 0; /* 左侧内容不拉伸 */

}
.index_tag__vNHRb {
  background: linear-gradient(90deg,#ffb033,#f201f7);
  border-radius: 6px;
  color: #fff;
  cursor: default;
  font-size: 10px;
  font-weight: 400;
  line-height: 1;
  margin-left: 8px;
  padding: 4px;
  position: relative;
}
.with-underline {

  /*border-radius: 2em;*/
  backdrop-filter: blur(3px);  /*增加磨砂效果*/

  /*border-bottom: 2px solid rgba(0, 0, 0, 0.81); !* 添加下划线样式 *!*/
  padding-bottom: 10px; /* 可以添加一些底部内边距，使下划线与内容之间有一定的间距 */
  /*border-radius: 10px; !* 添加10像素的圆角边框 *!*/


  border-radius: 0 0 5px 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.43);

  position: fixed;
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.21), rgba(255, 255, 255, 0.16));
  /*background-image: linear-gradient(20deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.27), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.24), #8000ff, #ff00ff);*/

}


/*浮动背景框*/
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7); /* 设置透明度 */
  border: 1px solid #ccc;
  display: none;
}

.float-event{
  cursor: pointer;
  border: 4px solid transparent; /* 在默认状态下设置透明的1像素边框 */

}
/* 在鼠标悬浮时的样式设置 */
.float-event:hover {
  transition: border-color 0.3s, color 0.3s; /* 添加过渡效果 */
  border-top: 4px solid rgba(255, 9, 166, 0.38); /* 添加上划线样式 */
  /*border-radius: 20px; !* 添加10像素的圆角边框 *!*/
}

/*当鼠标点下的时候*/
.float-event_click{
  border-top: 4px solid rgba(255, 9, 166, 0.38); /* 添加上划线样式 */
}


.round-image {
  width: 200px; /* 设置图片宽度 */
  height: 200px; /* 设置图片高度 */
  border-radius: 50%; /* 将边框半径设置为50%，使其呈现为圆形 */
  overflow: hidden; /* 隐藏超出边界的部分 */
}


/*
body {

  background: url('@/components/image/logo/imagetp.png');
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}


 */
/*!*如果为手机端（竖屏）就切换成特定样式*!*/
/*
@media screen and (max-width: 430px)  {
  body {
    transform-origin: 0 0;
    transform: rotateZ(90deg) translateY(-100%);
  }
}

 */




</style>

