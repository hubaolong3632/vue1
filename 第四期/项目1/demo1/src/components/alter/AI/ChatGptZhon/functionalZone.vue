<template>
<div>


    <el-row>
      <el-card shadow="always" style="  margin-bottom: 2px;">
        AI伴侣
      </el-card>
    </el-row>

<!--聊天选择区域-->
    <el-row>
      <el-card shadow="always" style="margin-bottom: 2px; overflow: auto; height: 40vh;">
        <el-row>

<!--          创建聊天-->
          <div @click="createChat">
            <el-col :span="24" class="style_drawing" >
              <el-button type="text" >
                <span><img src="@/components/image/logo/plusSign.png" style="width:30px; margin-bottom: 10px; "></span>
                <span>&nbsp;&nbsp;&nbsp;新建聊天</span>
              </el-button>
            </el-col>

          </div>

        </el-row>
        <el-row>
          <el-col :span="24" class="style_functionalZone"  style=" margin-top: 15px" v-for="(item,index) of drawing" :key="index">
            <div @click="createMessage(item.id)">
              <span><img src="@/components/image/logo/message.png" style="width:18px; margin-bottom: 10px; "></span>
              <span>&nbsp;&nbsp;&nbsp;{{item.name}}</span>
            </div>
          </el-col>
        </el-row>

      </el-card>
    </el-row>

<!--角色扮演功能区域-->
    <el-row>
      <el-card shadow="always" style="margin-bottom: 2px ;height: 45vh;   overflow: auto;  ">
        <el-row>
          <el-col :span="24" class="style_functionalZone" v-for="item of functionalZone" :key="item.id" >
            <div @click="functionalZoneClick(item.clickName)">
              <span><img :src="item.image" style="width:30px; margin-bottom: 10px;"></span>
              <span>&nbsp;&nbsp;&nbsp;{{item.name}}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>



</div>
</template>
<!--GPT功能区-->
<script>
import drawYi from "@/components/alter/draw/drawYi";

export default {
  name: "functionalZone",
  //父类传递过来的值
  data(){
    return{
      functionalZone:[/*功能区*/
        {id:1,image:require("@/components/image/logo/play.png"),name:"角色扮演",clickName:"play"},
        {id:2,image:require("@/components/image/logo/stop.png"),name:"停止回答",clickName:"stop"},
        {id:3,image:require("@/components/image/logo/refresh.png"),name:"刷新缓存",clickName:"refresh"},
        {id:4,image:require("@/components/image/logo/empty.png"),name:"清空缓存",clickName:"empty"},
        {id:5,image:require("@/components/image/logo/settingUp.png"),name:"长度设置",clickName:"settingUp"},
      ],
      gptAIImage:require("@/components/image/logo/AI.png"),
      gptUserImage:require("@/components/image/logo/userImage.png"),

      //显示我当前选着的输出答案
      // drawing: [
      //
      //
      // ],

      drawing:[{"id":"msg:693563","name":"聊天22一"}],

    }
  },
  methods:{

    //当点击id的时候切换选项
    createMessage(id){
      this.$emit('drawingID',id)
    },

    //选择的缓存
    functionalZoneClick(clickName){
      console.log(clickName)
    },


    //创建聊天
    createChat(){
      this.$prompt('请输入创建聊天名称，可以随便取名', '创建聊天', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.saveChatSon(value)
        this.createMessage(this.drawing[0].id);


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消创建'
        });
      });
    },


    //保存聊天
    saveChatSon(value) {
     // let id1=
     let id1=Math.floor(10000 + Math.random() * 900000);
      //添加一个往数组最开头添加

      console.log("ID为:",id1)
      let addDrawing = {
        id: "msg:" +id1,
        name: value
      };

      //数组添加
      this.drawing.unshift(addDrawing)

      console.log(this.drawing)

      //更新内存
      localStorage.setItem("drawing", JSON.stringify(this.drawing))

      //创建聊天
      // let drawingClass = [
      //   {userMessage: "欢迎使用智能AI伴侣", AIMessage: "你好!", edition: "gpt-4.0"},
      //
      // ];

      let drawingClass = [
        {id:"msg_id:1",bol:false,userMessage: "--------------------------------------------", AIMessage: `当前所在分组:  <span style="color: red">${value}</span>  请开始提问吧`, edition: "gpt-4.0"},
      ];

      localStorage.setItem(addDrawing.id, JSON.stringify(drawingClass));

    },


  },


  created(){

    //初始化左侧消息栏
    let drawing = localStorage.getItem("drawing")
    if (drawing == null) {
      console.log("为空")
      this.saveChatSon("聊天一")


    }else {
      this.drawing=JSON.parse(drawing);
    }

    //显示最开始哪个内容
    this.createMessage(this.drawing[0].id);




  },
}
</script>

<style scoped>
.style_functionalZone{
  cursor: pointer;
  font-family: 华文楷体;

  padding: 5px; /* 设置链接内边距 */
  margin-top: 10px;
  display: inline-block; /* 将链接显示为块级元素，以便设置宽度和高度 */
}
.style_functionalZone:hover{
  border: 1px solid #00ff00; /* 设置边框为1像素宽的绿色实线 */
  background-color: rgba(0, 0, 0, 0.07);
}

.style_drawing{
  cursor: pointer;
  font-family: 华文楷体;
  padding: 5px; /* 设置链接内边距 */
  margin-top: 10px;
  display: inline-block; /* 将链接显示为块级元素，以便设置宽度和高度 */
  border: 1px solid rgba(0, 0, 0, 0.39); /* 设置边框为1像素宽的绿色实线 */
}

.style_drawing:hover{

 background-color: rgba(0, 0, 0, 0.15);
}
</style>

<!--watch:{-->
<!--//监听有多少个消息-->
<!--drawing: {-->
<!--handler(xing) {-->
<!--console.log("新",xing)-->


<!--},-->
<!--}-->
<!--},-->