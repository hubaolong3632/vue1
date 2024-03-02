<template>
<div>

    <!--设置电脑和手机默认都兼容-->
<!--    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">-->


    <el-container>

      <!--  左边-->
      <el-aside  style="width:250px;">
         <functional-zone @drawingID="drawingIDClick"></functional-zone>
      </el-aside>

<!--      右边-->
      <el-container  style="height: 93vh">

        <!--      右边 上面-->
        <el-main style="background-color: rgba(204,0,0,0.03);  overflow: auto;">


          <div :style="{'margin-top':index==0?null:'100px'}"   class="tuBiao1" v-for="(time,index) of drawingClass" :key="time.id">
            <!--              用户问题-->
            <el-row :gutter="20" >
              <el-col :span="2" >

                <div class="el-icon-user" style="margin-top: 15px"></div>

              </el-col>
              <el-col :span="22">
                <div style=" text-align: left;">

                    <!--  显示当前回答的文字-->
                      <span style="font-size: 15px;color:#a9a8a8 ;" >
                         <span v-if="time.bol==false">

                            {{time.userMessage.slice(0,text.textSize)}}{{time.userMessage.length>text.textSize?".......":""}}
                         </span>

                          <span v-else>
                            {{time.userMessage}}
                         </span>
                      </span>

                  <el-popover placement="top-start" trigger="hover" content="显示全部">
                    <div  @click="time.bol=!time.bol"   class="el-icon-caret-bottom tuBiao" style="margin-left: 40px" slot="reference" v-if="time.userMessage.length>text.textSize"></div>
                  </el-popover>
                  <!-- 显示更多-->


                </div>
              </el-col>
            </el-row>

            <el-divider></el-divider>


            <el-row :gutter="20" >
              <el-col :span="2">


                <el-popover placement="right-start" trigger="hover" content="复制回答文字" >
                  <div class="el-icon-document-copy tuBiao copy" slot="reference" :data-clipboard-text="time.AIMessage">


                  </div>

                </el-popover>
                <br>
                <el-popover placement="right-start" trigger="hover" content="重新生成答案" >
                  <div class="el-icon-refresh-right tuBiao" slot="reference" @click="anew(time.userMessage)"></div>
                </el-popover>


              </el-col>
              <el-col :span="22">
                <blockquote style="font-size: 15px;color:rgba(0,0,0,0.68); text-align: left;" v-html="time.AIMessage">

                </blockquote>
                <div>

                </div>
              </el-col>
            </el-row>


          </div>


        </el-main>

<!--        右边下面-->
        <el-footer style="background-color: rgba(0,0,0,0.11);height: 100px ">

            <el-row>

              <el-col :span="20" class="style_drawing">
<!--                <span @keyup.enter.shift="button_send"  @keyup.enter.ctrl.shift="button_send">-->
                <span @keyup.enter.shift.exact="button_send"  @keyup.enter.ctrl.shift.exact="button_send">
                  <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入需要提问的内容 Ctrl+Enter 或者Shift+Enter发送..."
                      v-model="textarea">
                </el-input>
                </span>
              </el-col>

              <el-col :span="4" class="style_drawing">
                <el-row>
                    <el-button @click="button_send()" type="info" plain>发送</el-button>
                </el-row>
                <el-row>
                    <el-button type="danger" plain>换3.5</el-button>
                </el-row>

              </el-col>

            </el-row>
<!--          <button @click="drawingID=5564">修改</button>-->
<!--          <button @click="drawingID=55624">修改2</button>-->


        </el-footer>
      </el-container>

    </el-container>
  <br>
  <br>
  <br>
  <br>
</div>
</template>

<script>
import FunctionalZone from "@/components/alter/AI/ChatGptZhon/functionalZone";
import Clipboard from 'clipboard'
import ClipboardJS from "clipboard";
import CheShi from "@/components/alter/AI/ChatGptZhon/Cs";
import requestData from "@/router/requestData";
export default {
  name: "ChatGptZhonBu",
  components: {CheShi, FunctionalZone},
  data() {
    return {
      textarea: '',
      // originalText: "这是一个超过50个字符的示例文本，用于演示下拉显示更多的功能。asa多的功能。asa多的功能。asa多的功能。asa多的功能。asaaaaaaaaaa",
      expanded: false,
      text: {
        // textSize: 100,   //字体长度
        textSize: 15,   //字体长度
      },
      gpt:{
        MessageLength:1, //聊天消息长度
        content:"你会认真回答我的问题",

      },



      drawingID: "msg:1111",
      drawingClass:[
        {id:"msg_id:13242",bol:false,userMessage: "我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890我是测试1234567890结束", AIMessage: "sas", edition: "gpt-4.0"},
        {id:"msg_id:43252",bol:false,userMessage: "测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2结束", AIMessage: "你好!2", edition: "gpt-4.0"},
        {id:"msg_id:23242",bol:false,userMessage: "测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3结束", AIMessage: "你好!3", edition: "gpt-4.0"},
        {id:"msg_id:16242",bol:false,userMessage: "测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3结束", AIMessage: "你好!4", edition: "gpt-4.0"},

      ],

    }
  },

  methods:{

    //获取传递过来的id
    drawingIDClick(drawingID){
      console.log("传递过来的id为: ",drawingID)
      this.drawingID=drawingID;
      //拿到对应的数据
      this.drawingClass=JSON.parse(localStorage.getItem(drawingID))
    },



    //重新生成答案
    anew(text){
        console.log("nihoa ")
      this.textarea=text;
    },

    //发送数据
     async button_send() {
       console.log("发送", this.textarea)

       let id1 = Math.floor(10000 + Math.random() * 900000);
       //添加一个往数组最开头添加
       let drawingClass =
           {
             id: "msg_id:" + id1,
             bol: false,
             userMessage: this.textarea,  //提问的问题
             AIMessage:'', //回答
             edition: "gpt-4.0"
           };


       console.log("1")
       //数组添加
       this.drawingClass.unshift(drawingClass)
       console.log("1.1")
       // console.log(this.drawing)

       //执行修改里面的内容
       let data1 = {
         "sum": this.gpt.MessageLength,
         "g2": {
           "role": "system",
           "content": this.gpt.content
         },
         "g3": {
           "role": "user",
           "content": this.textarea   //问题
           // "content":"你是谁"

         },
         "social_uid": "abcddd1241",
         "stream": true
       }

       const requestOptions = {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': "1111"
         },
         body: JSON.stringify(data1)
       };


       this.textarea = "";
       console.log(data1)


       //错误的
       const fetchPromise = fetch(requestData.ip()+"gptChat/gpt4.0.all", requestOptions); // 创建fetch请求的Promise实例

       console.log("2")

       //正确的
       // const fetchPromise = fetch(requestData.ip()+"gptChat/gpt4.0.0613", requestOptions); // 创建fetch请求的Promise实例

       const timeoutPromise = new Promise((resolve, reject) => { // 创建超时的Promise实例
         setTimeout(() => {
           reject(new Error('请求超时'));
         }, 10000); // 设置超时时间为10秒
       });
       const response = await Promise.race([fetchPromise, timeoutPromise]); // 使用Promise.race()并行执行fetch请求和超时的Promise实例
       console.log("3")

       if (response instanceof Response) { // 如果response是fetch请求的响应对象
         const reader = response.body.getReader();
         let result = await reader.read();

         while (!result.done) {

           // innerTextGPT.innerText += new TextDecoder("utf-8").decode(result.value).replace(/\s/g,'\u00A0').replace(/{{END}}/g, '\n');
           let text = new TextDecoder("utf-8").decode(result.value).replace(/\s/g, '\u00A0');


           drawingClass.AIMessage += text;


           if(text=="\n"){
             console.log("输出回车")

           }else {
             drawingClass.AIMessage += '<br>';
             console.log(text)

           }



           result = await reader.read();
         }
       } else { // 如果response是超时的错误信息
         console.error(response.message);
       }
       console.log("4")


       console.log("输出完成")



       //更新内存
       localStorage.setItem(this.drawingID, JSON.stringify(this.drawingClass))



       console.log("5")


     },
    //设置显示文字数量
    displayText(text) {
      if (text.length > this.text.textSize ) {
        return text.slice(0, this.text.textSize) + " ...";
      } else {
        return text;
      }
    },



  },
  // created() {
  //   console.log("输出:",this.drawing[0])
  //   if(this.drawing.length==0){
  //     console.log("输出2")
  //     this.drawingClass={id:1,name:"消息一",message: []}
  //
  //   }else{
  //     let ai=this.drawing[0];
  //     this.drawingClass=ai;
  //   }
  //
  // },


  watch:{
    // drawingID:{
    //   handler(xing){
    //     console.log("修改了")
    //    let boo=false;
    //     for(let time of this.drawing){
    //       if (time.id == xing) {
    //         this.drawingClass=time;
    //         boo=true;
    //         break;
    //       }
    //     }
    //
    //     // //如果不存在这个数据
    //     if(boo==false){
    //       this.$message({
    //         message: `当前聊天id:${xing} 没有查到`,
    //         type: 'error'
    //       });
    //
    //     }
    //
    //
    //   }
    // }
  }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


blockquote {
  border-left: 5px solid #a9a8a8; /*设置左边的边框颜色和粗细*/
  padding-left: 10px; /*设置左边的内边距*/
}

.tuBiao{
  cursor: pointer;
  padding: 5px; /* 设置链接内边距 */
  margin-top: 10px;
  /*display: inline-block; !* 将链接显示为块级元素，以便设置宽度和高度 *!*/
  border: 1px solid transparent; /* 在默认状态下设置透明的1像素边框 */
}

.tuBiao:hover{
  border-color: #00ff00; /* 在Hover状态下改变边框颜色 */
  background-color: rgba(0, 0, 0, 0.07);
}






.tuBiao1{
  border: 1px solid transparent; /* 在默认状态下设置透明的1像素边框 */
}



.tuBiao1:hover{
  box-shadow: 0 0 5px 1px rgb(166, 163, 163),
              0 0 5px 1px #00ff00,
              0 0 5px 1px #47ff00; /* 在Hover状态下添加彩色的外部发光效果 */
  background-color: rgb(255, 255, 255);
}
</style>