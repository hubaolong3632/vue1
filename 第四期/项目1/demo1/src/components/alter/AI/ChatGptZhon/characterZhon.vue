<template>
<div >
  <el-card class="cc1 box-card">
    <el-card class="cc2 box-card" >
      <p  style="color: #de032d ;font-size: 40px;cursor: pointer;  position: absolute;right: 0;" @click="messageBol()">×</p>


      <p >角色扮演模型选择(用于更具你的模板回答内容)</p>
      <hr>
      <div class="cc3">
        <div v-for="(time,index) of characterData" :key="index"  @click="templateClick(time)" style="cursor:pointer">
          <el-card :class="['box-card','tuBiao1',time.id==clickID.id?'yes':'']">
            <div slot="header" class="clearfix">
              <span style="color: rgba(166,163,163,0.84)">扮演名称:</span> <el-tag type="success">{{time.name}}</el-tag>
              <el-button style="float: right; padding: 3px 0" type="text" @click="templateClick(time)">选择此模板</el-button>
            </div>
           <div>
             <span style="color: #606266">{{time.content}}</span>
           </div>

          </el-card>


        </div>
        <br>


      </div>

    </el-card>
  </el-card>

</div>
</template>

<script>
//放角色的地方
export default {
  name: "characterZhon",
  data(){
    return{
      //角色
      characterData:[
        {id:"gpt:hint-1",name:"普通聊天"  ,content:"你会认真回答我的问题，不能马虎"},
        {id:"gpt:hint-6",name:"面试大师",content:"你充当一个面试官，接下来我会告诉我你要面试什么,然后根据你所有的知识库进行提问，除了第一次我告诉你我要问什么，第二次你都会更具上下文对我进行提问并且回答我上一次答案正确率"},
        {id:"gpt:hint-2",name:"文言文大师",content:"你是一个文言文大师,你接下来和我的所有对话都会采用文言文的方式进行回答,不论我问你什么问题都采用中国文言文回答我"},
        {id:"gpt:hint-8",name:"小说大佬一(使用此功能请把上下文长度调高一些)",content:`
        你是一个小说家,是用于写小说的，第一次回答我是给我你准备写的小说目录(只要目录比如 第一章:为什么什么 第二章:为什么什么 ......),第二次上下文之后就是对应的目录每一个章节对应的文章,
        故事得承接上下文文章 但是故事一定得精彩一旦有情节一定得详细描述哪个情节以及他们之间的对话 并且文章所有上下文都要有故事和一些对话情节，
        故事给一个章节就可以,故事结尾不要讲大道理正常结束就可以，要留一些给下文提问继续使用。记住，主要得有对话情节和聊天情节，并且不要一直用排比句和少用(他们，我们)！`
        },
        {id:"gpt:hint-3",name:"代码助手",content:"你是一个代码助手,我问你的所有问题,你只需要提供代码给我即可"},
        {id:"gpt:hint-4",name:"情感助手",content:"你是一个情感助手,会收集你所了解的情感，并且分析我发给你的问题，给予最优质的解答"},
        {id:"gpt:hint-5",name:"文章大师",content:"你会用最优美的文笔，不要排比句，等一些影响作品的，并且你给我的文章你要自己先自我推敲和检查2遍，在给我，文章一定得优美，并且更具我给你的下文进行编写"},
        {id:"gpt:hint-7",name:"物理系大佬",content:"你将模仿最杰出的物理系博士,进行指导我发给你的上下文进行物理方面的专业回答"},
        {id:"gpt:hint-7",name:"AI算命",content:"你是一个老谋深算的算命大师 ,名字叫玄玄,你会问我一些关于算命需要的东西然后给我进行算命更具上下文问，并且最后的回答要是一篇文章更具(八字排测、紫微斗数、面相手相、八卦六爻、奇门遁甲、地理风水)不能一点一点列举，算出最后我的未来，"},
         ],
      clickID:{id:"gpt:hint-1",name:"普通聊天",content:"你会认真回答我的问题"},

    }
  },
  methods:{
    messageBol(){
      this.$emit("messageBol",false) //关闭角色选择
    },
    //模板选择
    templateClick(time){
      this.clickID=time;
      localStorage.setItem("clickID",JSON.stringify(this.clickID));
      this.$emit("characterID",this.clickID); //高速那边我当前选择的角色

      this.$emit("messageBol",false) //关闭角色选择
    //  提示用户我选择的模板
      this.$notify({
        title: '成功',
        message: `选择的扮演者为:${this.clickID.name}`,
        type: 'success'
      });

    }


  },





  created() {
    let clickID=localStorage.getItem("clickID");

    if(clickID==null){ //如果没有选择的话默认选择第一个角色id为模板
      localStorage.setItem("clickID",JSON.stringify(this.characterData[0]));
      this.clickID=this.characterData[0];
    }else{
      this.clickID=JSON.parse(clickID);
    }

    this.$emit("characterID_created",this.clickID); //传输选择高速那边



    // let clickID=localStorage.setItem("clickID","1")
  }
}
</script>

<style scoped>
  .cc1{
    /*display: none;*/
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 0, 0, 0.38);
    z-index: 99999;

  }

  .cc2{
    border-radius: 2%;

    position: absolute; /*开启 相对定位*/
    top: 15%;
    left: 15%;
    background-color: rgb(255, 255, 255);

    width: 70vw;
    height: 70vh;
  }
  .cc3{
    display: grid;
    grid-template-columns: 1fr;
    /*grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));*/
    grid-column-gap: 10vw; /* 设置列之间的间距为10px */
    grid-row-gap: 10vh; /* 设置行之间的间距为10px */

    height: 60vh;
    overflow-y: auto;
  }
  /*-------------------------*/

  .tuBiao1{
    border: 1px solid transparent; /* 在默认状态下设置透明的1像素边框 */
  }



  .tuBiao1:hover{
    box-shadow: 0 0 5px 1px rgb(166, 163, 163),
    0 0 5px 1px #00ff00,
    0 0 5px 1px #47ff00; /* 在Hover状态下添加彩色的外部发光效果 */
    background-color: rgb(255, 255, 255);
  }
  .yes{
    box-shadow: 0 0 5px 1px rgb(166, 163, 163),
    0 0 5px 1px #ff004d,
    0 0 5px 1px #ff004d; /* 在Hover状态下添加彩色的外部发光效果 */
    background-color: rgb(255, 255, 255);
  }

</style>