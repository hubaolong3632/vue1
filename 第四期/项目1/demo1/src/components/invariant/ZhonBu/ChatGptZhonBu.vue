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
         <functional-zone @messageBol="messageBol" @drawingID="drawingIDClick" @gptrefresh="gptrefresh" @settingUp="settingUp" @gptSwitch="gptSwitch1"></functional-zone>
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
                    &nbsp;&nbsp;
                    <el-tag type="danger" v-if="time.edition=='系统信息'">{{time.edition}}</el-tag>
                    <el-tag type="success" v-else>{{time.edition}} - {{time.contentName}}</el-tag>

                  </div>
                </el-col>
              </el-row>

              <el-divider></el-divider>


              <el-row :gutter="20" >
                <el-col :span="2">


                  <el-popover placement="right-start" trigger="hover" content="复制回答文字" >
                    <div class="el-icon-document-copy tuBiao copy" slot="reference" :data-clipboard-text="time.AIMessage.replace(/\u00A0/g, ' ').replace(/<br>/g,'\n')">


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
                <span @keyup.shift.enter.exact="button_send()"  @keyup.ctrl.enter.exact="button_send()">
                  <el-input
                      type="textarea"
                      :rows="4"
                      :placeholder="`请输入需要提问的内容 Ctrl+Enter 或者Shift+Enter发送...  \n当前信息:[ 窗口名称: ${this.drawingID.name},  聊天角色:${this.gpt.content.name}   ,上下文长度: ${this.gpt.MessageLength} , 当前模型: ${this.gpt.model} ]    `"
                      v-model="textarea">
                </el-input>
                </span>
              </el-col>


              <el-col :span="4" class="style_drawing">
                <el-row>
                  <!--                  <el-button @click="file_send()" type="info" plain>上传文件</el-button>-->
                  <div>
                    <input type="file" ref="fileInput" style="display: none" @change="onFileChange">
                    <el-button @click="file_send()" type="primary" plain>上传文件{{fileSum}}</el-button>
                    <el-button @click="button_send_xiaoShuo()" type="primary" plain>生成小说</el-button>

                    <!--                      <img :src="require('@/components/image/c1.png')" @click="triggerFileInput">-->
                  </div>
                </el-row>
              </el-col>

              <el-col :span="4" class="style_drawing">
                <el-row>
                    <el-button @click="button_send()" type="success" style="width: 100%" plain>发送</el-button>
                </el-row>
              </el-col>






            </el-row>
<!--          <button @click="drawingID=5564">修改</button>-->
<!--          <button @click="drawingID=55624">修改2</button>-->


        </el-footer>
      </el-container>

    </el-container>

      <character-zhon v-show="characterMessageBol" @messageBol="messageBol" @characterID="characterID"  @characterID_created="characterID_created"></character-zhon>


</div>
</template>

<script>
import FunctionalZone from "@/components/alter/AI/ChatGptZhon/functionalZone";
import CheShi from "@/components/alter/AI/ChatGptZhon/Cs";
import requestData from "@/router/requestData";
import HigHlightV1 from "@/components/alter/AI/ChatGptZhon/HigHlightV1";
import hljs from "highlight.js";
import HigHlightV2 from "@/components/alter/AI/ChatGptZhon/HigHlightV2";
import axios from "axios";
import CharacterZhon from "@/components/alter/AI/ChatGptZhon/characterZhon";


export default {
  name: "ChatGptZhonBu",
  components: {CharacterZhon, HigHlightV2, HigHlightV1, CheShi, FunctionalZone},
  mounted() {
    // let highlight = document.getElementById("messageShow").querySelectorAll('pre code');
  },
  data() {
    return {
      characterMessageBol:false,
      fileSum:"",
      placeholder:`请输入需要提问的内容 Ctrl+Enter 或者Shift+Enter发送  当前上下文长度... `,
      textarea: '',
      // originalText: "这是一个超过50个字符的示例文本，用于演示下拉显示更多的功能。asa多的功能。asa多的功能。asa多的功能。asa多的功能。asaaaaaaaaaa",
      expanded: false,
      text: {
        textSize: 100,   //字体长度
      },
      gpt:{
        MessageLength:4, //聊天消息长度
        content:{id:"gpt:hint-1",name:"抬杠聊天(受不了请切换角色扮演)",content:"我想让你装做一个很会拾杠的人(拾杠指的是唱反调，调侃和讽刺对方)，不管我说什么你都先挑刺反驳.但是你也会回答用户的问题"}, // 聊天的内容
        model:localStorage.getItem("model")||"gpt-3.5-turbo-0125",

      },
      drawingID: "msg:1111",
      drawingClass:[
        {id:"msg_id:13242",bol:false,userMessage: "你好,我是你的人工智能", AIMessage: "请对我进行提问吧，我会你想要的任何东西", edition: "gpt-4.0"},

      ],
      gptSwitch:[
        {id:1,name:"请选择下列模型",model:"gpt-3.5-turbo-0125"},
        {id:1,name:"gpt4.0ALL(可联网)(分析文件)(生成图片)(缺点容易崩溃)(0.1$/次)",model:"gpt-4-all"},
        {id:2,name:"gpt4-1025 可分析2024年1月25号模型 (0.1$/次)",model:"gpt-4-0125-preview"},
        {id:2,name:"claude-3-haiku-20240307 谷歌最强大模型(据说比4.0强)(可分析文件) (0.1$/次)",model:"claude-3-haiku-20240307"},
        {id:3,name:"gpt3.5 (支持4千字上下文)(0.001$/次)",model:"gpt-3.5-turbo-0125"},
        {id:3,name:"gpt3.5-16K (支持1w6千字上下文)(0.005$/次)",model:"gpt-3.5-turbo-16k-0613"},
      ]

    }
  },

  methods:{
    characterID_created(characterID){
      this.gpt.content=characterID; //设置选择的值
    },

    //获取那边传输过来的值
    characterID(characterID){
      this.gpt.content=characterID; //设置选择的值
      this.textarea="emptyemptyempty"; //刷新缓存
      this.button_send();


     // console.log(this.gpt.content)
    },

    //关闭聊天
    messageBol(timeBol){
      console.log("状态",timeBol)
      this.characterMessageBol=timeBol;
    },


    //如果点击上传文件
    async onFileChange(e) {
      this.file = e.target.files[0];
      if(this.file==null){
        return;
      }
      if (this.file.size > 20 * 1024 * 1024) { // 20MB 的限制
        alert("文件大小不能超过20MB");
        return;
      }
      // if (!this.file.type.startsWith('image/')) { //如果不为图片
      //   alert("请上传图片文件");
      //   return;
      // }
      console.log("上传文件")

      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('bucketName', 'my-bucketname');
      formData.append('userName', 'zhangsan');

      let {data} = await axios.post(requestData.fileIp(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          this.fileSum = `:${Math.round((100 * progressEvent.loaded) / progressEvent.total)}%`;
        }
      })

      console.log(data)

      // this.messageData.picture = data.data.url;
      console.log(data.data.url)


      this.textarea =`${data.data.url}  \n ${this.textarea}`;
      this.fileSum="";


    },

    file_send(){ //点击上传按钮

      this.$notify({
        title: '上传提示',
        message: '请确保选择的模型为【gpt-4-all】 并且在上传之前请【刷新一下缓存】，问题问完之后在【刷新缓存】确保消息不会出现问题，文件会以链接的方式放入进去在链接后面编写文件提示功能就可以 不用管链接',
        type: 'warning'
      });
      this.$refs.fileInput.click();
    },


    settingUp(){ //当点击长度设置的时候
      this.$prompt('请输入上下文长度1-10以内(用于聊天记录前几条数据，越多记住上下文的也越多,但是费用也会稍微贵一些) ', `上下文长度->当前长度:${this.gpt.MessageLength}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let sum=parseInt(value)
        if(isNaN(sum)){
          this.$message({
            message: '长度设置失败:请输入1-10以内的数字',
            type: 'error'
          });
        }else if(sum<1||sum>10){
            this.$message({
              message: '长度设置失败:请输入大于1并且小于10的数字',
              type: 'error'
            });
        }else{
          localStorage.setItem("MessageLength",value)
          this.gpt.MessageLength=sum;
          this.$message({
            message: `长度设置成功-当前长度${this.gpt.MessageLength}`,
            type: 'success'
          });
        }




      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消设置-当前长度为:'+this.gpt.MessageLength
        });
      });


    },

    async button_send_xiaoShuo() {
      let k=3; //章节控制

      this.$notify({
        title: '上传提示',
        message: `请确保角色扮演选择的是【小说大佬】并且已经让他指定生成了什么小说，点击这个就能连续${k}次生成小说！`,
        type: 'warning'
      });
        while (k){
          this.textarea = "继续给我下一章，并且要有故事情节和他们之间的对话，字数在1000字左右";
          await this.button_send();
          console.log("生成文章！")
          k--;
        }

    },

    //当刷新缓存的时候
    gptrefresh(){
      this.textarea="emptyemptyempty";

      this.button_send();
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

    //gpt模型选择
    gptSwitch1(){
      let optionHtml="";

      for(let time of this.gptSwitch){
        optionHtml+=` <option ref="option1" value="${time.model}">${time.name}</option>`;
      }


      let templateHtml=`
     <select onchange="onGptModelSwitch(this)" id="fruits" style="padding: 5px; font-size: 16px; border-radius: 5px; background-color: #f2f2f2; color: #333;width: 100%" >
          ${optionHtml}
      </select>
    `;


      this.$alert(templateHtml, '模型选择', {
        dangerouslyUseHTMLString: true
      }).catch(()=>{}) // 添加错误捕获;
    },
    //当修改模型的时候
    onGptModelSwitch(model){
      this.gpt.model=model.value;
      localStorage.setItem("model",model.value) //设置模型

      console.log("当前选择的模型:",model.value)
      this.$notify({
        title: '成功',
        message: `当前模型:[${this.gpt.model}]`,
        type: 'success'
      });

    },


  //高亮标记
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
            userMessage:this.textarea ,  //提问的问题
            AIMessage:'', //回答
            edition: this.textarea=="emptyemptyempty"?"系统信息":this.gpt.model,
            contentName:this.gpt.content.name
          };
      //数组添加
      this.drawingClass.unshift(drawingClass)
      drawingClass.AIMessage=`<span style="color: rgba(255,0,59,0.78)">正在生成中,如果10秒之后没反应请重发...</span>`
      //执行修改里面的内容
      let data1 = {
        "sum": this.gpt.MessageLength,
        "g2": {
          "role": "system",
          "content": this.gpt.content.content
        },
        "g3": {
          "role": "user",
          "content": this.textarea   //问题
          // "content":"你是谁"

        },
        social_uid: this.drawingID.id, //问题id
        model:this.gpt.model,
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
      // console.log(data1)

      //错误的
      const fetchPromise = fetch(requestData.ip()+"gptChat/gpt4.0.all", requestOptions); // 创建fetch请求的Promise实例
      const timeoutPromise = new Promise((resolve, reject) => { // 创建超时的Promise实例
        setTimeout(() => {
            // this.$message.error('接口请求超时,请重新生成:错误原因：'+JSON.stringify(resolve));


          reject(new Error('请求超时，错误原因:')+JSON.stringify(reject));
        }, 30000); // 设置超时时间为30秒
      });
      const response = await Promise.race([fetchPromise, timeoutPromise]); // 使用Promise.race()并行执行fetch请求和超时的Promise实例

      if (response instanceof Response) { // 如果response是fetch请求的响应对象
        const reader = response.body.getReader();
        let result = await reader.read();


        let bol=false;
        let regex = /```/g; //正则表达式匹配

        drawingClass.AIMessage="";
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

          result = await reader.read();
        }
      } else { // 如果response是超时的错误信息
        console.error(response.message);
      }


      console.log("输出完成")

      //如果有图片那就要链接
      const regex = /\[Image\]\(([^)]+)\)/g;
      const str =  drawingClass.AIMessage;
      const matches = str.match(regex);

      if (matches) {
        matches.forEach(match => {
          const link = match.match(/\[Image\]\(([^)]+)\)/)[1];
          console.log("匹配到的链接内容：" + link);

          drawingClass.AIMessage = str.replace(regex, ` <img src="${link}" >`);
        });
      }else{
      //  如果没有去查一下另一个
        const regex = /\[Download U1\]\(([^)]+)\)/g;
        const str =  drawingClass.AIMessage;
        const matches = str.match(regex);

        if (matches) {
          matches.forEach(match => {
            const link = match.match(/\[Download U1\]\(([^)]+)\)/)[1];
            console.log("匹配到的链接内容：" + link);

            drawingClass.AIMessage  = str.replace(regex, `<img src="${link}" >`);
          });
        }
      }



      this.$message({
        message: '回答完成',
        type: 'success'
      });


      //更新内存
      localStorage.setItem(this.drawingID.id, JSON.stringify(this.drawingClass))
    },

    async copy(item) {

      let clipboardObj = navigator.clipboard;
      try {
        let dom = item.parentNode.querySelector('[name="cc1"]');
        let text = dom?.innerText || '';

        // 删除首行内容
        text=text.trim();
        text = text.replace(/.*\n/, '');
        text = text.replace(/\u00A0/g, ' ').replace(/<br>/g, '\n');

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
      this.drawingClass=JSON.parse(localStorage.getItem(drawingID.id))
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
    window.onGptModelSwitch=this.onGptModelSwitch;

   let gptMessageLength =localStorage.getItem("MessageLength")
    this.MessageLength=gptMessageLength==null?3:gptMessageLength;

    console.log(localStorage.getItem("model"))




    console.log("长度为:",this.MessageLength)

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