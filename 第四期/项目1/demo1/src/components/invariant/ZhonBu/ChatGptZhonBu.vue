<template>
<div>
<!--    <hig-hlight-v1></hig-hlight-v1>-->
<!--  <hig-hlight-v2></hig-hlight-v2>-->
    <!--设置电脑和手机默认都兼容-->
<!--    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">-->

  <!--  <pre v-highlightjs>-->
  <!--    <code class="html">-->
  <!--      &lt;hahaha&gt;-->
  <!--      -->
  <!--      -->
  <!--     </code>-->
  <!--  </pre> -->

    <el-container>

      <!--  左边-->
      <el-aside  style="width:250px;">
         <functional-zone @drawingID="drawingIDClick"></functional-zone>
      </el-aside>

<!--      右边-->
      <el-container  style="height: 93vh">

        <!--      右边 上面   在这里设置选择-->
        <div  style="overflow: auto;  height: 100vh"  ref="messageShow">
          <el-main >

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
                    <div class="el-icon-document-copy tuBiao copy" slot="reference" :data-clipboard-text="time.AIMessage.replace(/\u00A0/g, ' ')">


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

        </div>

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




</div>
</template>

<script>
import FunctionalZone from "@/components/alter/AI/ChatGptZhon/functionalZone";
import CheShi from "@/components/alter/AI/ChatGptZhon/Cs";
import requestData from "@/router/requestData";
import HigHlightV1 from "@/components/alter/AI/ChatGptZhon/HigHlightV1";
import hljs from "highlight.js";
import HigHlightV2 from "@/components/alter/AI/ChatGptZhon/HigHlightV2";



export default {
  name: "ChatGptZhonBu",
  components: {HigHlightV2, HigHlightV1, CheShi, FunctionalZone},
  mounted() {
    console.log("你好")
    // let highlight = document.getElementById("messageShow").querySelectorAll('pre code');
  },
  data() {
    return {

      textarea: '',
      // originalText: "这是一个超过50个字符的示例文本，用于演示下拉显示更多的功能。asa多的功能。asa多的功能。asa多的功能。asa多的功能。asaaaaaaaaaa",
      expanded: false,
      text: {
        textSize: 100,   //字体长度
      },
      gpt:{
        MessageLength:5, //聊天消息长度
        content:"你会认真回答我的问题",

      },
      drawingID: "msg:1111",
      drawingClass:[
        {id:"msg_id:13242",bol:false,userMessage: "你好,我是你的人工智能", AIMessage: "请对我进行提问吧，我会你想要的任何东西", edition: "gpt-4.0"},

      ],

    }
  },

  methods:{
  kk(item){
    let bol=false;
    let highlightBlocks = item.parentNode.querySelectorAll('pre code');
    highlightBlocks.forEach((block) => {
      if (!block.classList.contains('hljs')) {
        hljs.highlightElement(block);
        block.classList.add('hljs'); // 添加类名标记为已经高亮
        bol=true;
      }
    });


    // let highlight = item.parentNode.parentNode.parentNode.parentNode.querySelectorAll('pre code');
    // highlight.forEach((block) => {
    //   if (!block.classList.contains('hljs')) {
    //     hljs.highlightElement(block);
    //     block.classList.add('hljs'); // 添加类名标记为已经高亮
    //     bol=true;
    //   }
    // });


    //先找到最开始哪个 给他修改代码
    // hljs.highlightElement(item.parentNode.querySelector('[name="cc1"]'));


    // let highlight = item.parentNode.parentNode.parentNode.parentNode.querySelectorAll('pre code');
    // // let highlight = item.parentNode.querySelectorAll('pre code');
    // highlight.forEach((block) => {
    //   // Deprecated as of 10.7.0. highlightBlock will be removed entirely in v12.0
    //   // Deprecated as of 10.7.0. Please use highlightElement now.
    //   hljs.highlightElement(block);
    // })


  },

    //发送数据
    async button_send() {
      if (this.textarea.trim() === "") { //如果输入的内容为空
        this.$message({
          message: '警告,请先输入内容',
          type: 'warning'
        });
        return;
      }
      this.$refs.messageShow.scrollTop = 0 //滚动到最上面方便用户查看
      // console.log("发送:", this.textarea)
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
      //数组添加
      this.drawingClass.unshift(drawingClass)

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
        social_uid: this.drawingID, //问题id
        model:"gpt-3.5-turbo-0125",
        stream: true
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "zhangsan"
        },
        body: JSON.stringify(data1)
      };

      this.textarea = "";
      console.log(data1)

      //错误的
      const fetchPromise = fetch(requestData.ip()+"gptChat/gpt4.0.all", requestOptions); // 创建fetch请求的Promise实例
      const timeoutPromise = new Promise((resolve, reject) => { // 创建超时的Promise实例
        setTimeout(() => {
          reject(new Error('请求超时'));
        }, 10000); // 设置超时时间为10秒
      });
      const response = await Promise.race([fetchPromise, timeoutPromise]); // 使用Promise.race()并行执行fetch请求和超时的Promise实例

      if (response instanceof Response) { // 如果response是fetch请求的响应对象
        const reader = response.body.getReader();
        let result = await reader.read();


        let bol=false;
        let regex = /```/g; //正则表达式匹配
        while (!result.done) {
          let text = new TextDecoder("utf-8").decode(result.value).replace(/\s/g, '\u00A0').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{{END}}/g, '\n');


          //改成每次进3-5个内容的时候在进行扫描有没有```符号有的话就进行操作
          if(regex.exec(drawingClass.AIMessage)){

            if(bol==false){
              result = await reader.read();


              drawingClass.AIMessage=drawingClass.AIMessage.replace(/```/g, `
                   <div style="background-color: #000000">
                       <span onclick="copy(this)" style="color: #cccccc;border: red 1px ridge;cursor: pointer; font-size: 1vw">复制<span/>
                       <pre  onmouseover="kk(this)"  style="color: #ffffff;" name="cc1" >
                          <code>
                  `)
              bol=true;

            }else{

              drawingClass.AIMessage=drawingClass.AIMessage.replace(/```/g, `
                        </code>
                     </pre>
                   </div>
                  `)
              bol=false;
            }

          }


        if(bol==false){
          text =text.replace(/\n/g, '<br>');
        }



          drawingClass.AIMessage +=text;

          this.code=drawingClass.AIMessage;

          result = await reader.read();
        }
      } else { // 如果response是超时的错误信息
        console.error(response.message);
      }


      console.log("输出完成")
      //更新内存
      localStorage.setItem(this.drawingID, JSON.stringify(this.drawingClass))
    },

    async copy(item) {
      let clipboardObj = navigator.clipboard;
      try {
        let dom = item.parentNode.querySelector('[name="cc1"]');
        let text = dom?.innerText || '';

        // 删除首行内容
        text=text.trim();
        text = text.replace(/.*\n/, '');
        text = text.replace(/\u00A0/g, ' ');

        let res = await clipboardObj.writeText(text); //执行复制功能
        this.$notify({
          message: '复制成功',
          type: 'success'
        });


      } catch (error) {
        this.$notify.error({
          title: '复制失败',
          message:error
        });
        console.error('复制失败: ', error);
      }
    },

    //获取传递过来的id
    drawingIDClick(drawingID){
      console.log("传递过来的id为: ",drawingID)
      this.drawingID=drawingID;
      //拿到对应的数据
      this.drawingClass=JSON.parse(localStorage.getItem(drawingID))
    },



    //重新生成答案
    anew(text){
      this.textarea=text;
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
  created() {
    window.kk=this.kk;
    window.copy=this.copy;

    // hljs.addPlugin( {
    //   'after:highlightElement': ({el, result}) => {
    //     // move the language from the result into the dataset
    //     el.dataset.language = result.language }
    // })

  },


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
  },

}
</script>

<style scoped>
/*>>> .ccc1{*/
/*  background-color: #070000;*/
/*  background-color: rgba(0, 0, 0, 0.07);*/

/*}*/

/*>>> .ccc1:hover{*/
/*  background-color: rgba(0, 0, 0, 0.07);*/
/*}*/

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