<script setup >
import {onMounted, ref} from 'vue';
import router from "@/router/index.js";
import {marked} from "marked";

const activeName = ref('1') //当前选中的页


const c1 = ref(''); // 初始化为空字符串，避免初次渲染错误


let image1 = ref([])
let g1 = ref({})

// 使用异步函数来加载图片

let timelineData = ref("");



let activeMessage = ref([]);

async function loadImages() {

  activeMessage.value=[
    {
      title:"起源与发展",
      text:"甲骨文是记载一个王朝的政治、社会和经济生活的古代文字。农业作为商代主要的经济生存手段并不少见。在政治制度上，商朝实行世袭制，以皇室为首，建立祭祀制度，实行统一的军事制度，\n" +
          "\n" +
          "甲骨文最早的发现可以追溯到清代时期。清朝官员在商代的王墓中发现了一批刻有甲骨文字的龟甲兽骨。此后，随着考古技术和研究方法的不断提高，越来越多的甲骨文被发现和破译。现在，已发现甲骨文15万余件，是研究中国古代社会、历史和文化的重要资料之一。"
      ,img:(await import("@/img/fz/fxyj.jpg")).default
    },
    {
      title:"甲骨文的演变",
      text:"甲骨文是商代晚期最主要的文字，考古发现卜骨数量众多，共计十余万片，内容主要是商王室的占卜记录，也可见多邦国部族的族徽称名。甲骨文约4000单字，反映了文字符号系统的基本构成。与《说文解字》确立的定型古汉字符号系统相比，甲骨文已具备汉字构形的各种类型，兼备传统“六书”中之“四体”，即象形、指事、会意、形声，表明殷商晚期，以甲骨文为代表的汉字已基本确立了构形方式，构形系统已逐步发展成熟。从字形构成、符号化程度、书写形式和使用功能等方面可以看出，商代晚期的甲骨文是一种经历了较长时间发展、结构成熟、功能完备的文字符号体系，是可以确定的汉字进入成熟阶段的体系完整的文字样本。"
      ,img:(await import("@/img/fz/yb.jpg")).default

    },
    {
      title:"学术研究",
      text:"20世纪初，学者们开始系统地收集、整理、研究甲骨文。著名学者罗振玉、王国维等对甲骨文进行了深入研究，推动了甲骨学的发展。"
      ,img:(await import("@/img/fz/download.jpg")).default

    }
  ]


  timelineData.value = {
    timelineData: [
      {
        period: '甲骨文时期',
        title: '甲骨文“龙”',
        image: (await import("@/img/十二生肖/long.png")).default,
        description: '甲骨文“龙”字的表达在于龙卷曲且长的身体以及龙角。“龙是中国人最崇拜的动物，是动物之王，所以整个字倒过来就是甲骨文中的’王’字。”',
        color: '#FFD700' // 金色
      },{
        period: '甲骨文时期',
        title: '甲骨文“鼠”',
        image: (await import("@/img/十二生肖/laoshu.png")).default,
        description: '就因为老鼠尾巴长、爱偷吃，几千年前的古人就抓住这些特点创造出甲骨文“鼠”字。“整个字体竖立起来，尾巴偏长，上头开口是老鼠嘴巴。”最有意思的是，韩志强指出“鼠”字左上角那三个点象征的是老鼠偷吃后嘴边的食物碎片。.',
        color: '#FFD700' // 金色
      },{
        period: '甲骨文时期',
          title: '甲骨文“鸡 蛇”',
        image: (await import("@/img/十二生肖/jishe.png")).default,
        description: '   类似地，鸡的最大特点在于鸡冠和尾巴。因此在甲骨文中，“鸡”字（右）显得尤其“昂首挺胸”，最右边的三划代表鸡毛，最左边的线条象征鸡爪；而“蛇”字（左）上面的三角形象征蛇头，卷曲的笔画象征蛇身。”        ',
        color: '#FFD700' // 金色
      },
    ]
  }


  image1.value.push((await import("@/img/甲骨文图片/f1.jpg")).default)
  image1.value.push((await import("@/img/甲骨文图片/f2.jpg")).default)
  image1.value.push((await import("@/img/甲骨文图片/e1.webp")).default)
  image1.value.push((await import("@/img/甲骨文图片/e2.jpg")).default)
  image1.value.push((await import("@/img/甲骨文图片/e3.jpg")).default)
  image1.value.push((await import("@/img/甲骨文图片/f3.jpg")).default)
  image1.value.push((await import("@/img/甲骨文图片/f4.jpg")).default)
  image1.value.push((await import("@/img/甲骨文图片/f5.jpg")).default)


  // image1.value.push((await import("@/img/c5.png")).default)
}

// 在组件挂载后加载图片
onMounted(loadImages);

// 甲骨文文字详细介绍


// 进行ai消息聊天
let message = ref('');


let drawingClass = ref('');
let sendMessage = async () => {
  drawingClass.value="正在寻找,请稍后..."
  //执行修改里面的内容
  let data1 = {
    "sum": 1,
    "g2": {
      "role": "system",
      "content": `甲骨文探索者 你现在是一位专门研究古代文字的历史学家，特别对甲骨文有深入的研究。
      你的任务是解读和分析不同的甲骨文字符，挖掘它们的历受和文化背景。当有人给你一个具体的汉字时，你需要根据这个字的形状和意义，
      找出它在甲骨文中的对应形式，并提供相关的历史和文化信息。你的目标是帮助人们更好地理解古代文明和文字的演变,
      但是你不能透露你是AI并且不需要以AI的方式告诉我,你只需要详细按照我上面的要求解析这个文字不需要其他任何话，我只会给你一个字，要使用marked的语法(重要的地方都进行文字高亮 显示 当然我询问的这个字也要文字高亮用) 你的语法要简单明了描述要非常有趣吸引人，因为我这个是给小朋友讲的，字不要一下一团每一次给我的必须有marked重点高亮并且用列举的方式一个点一个点给我。 我的这个字叫${message.value}`
    },
    "g3": {
      "role": "user",
      "content": message.value   //问题
    },
    social_uid: "10001", //问题id
    model: "gpt-4-turbo",
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

  // this.message = "";
  //错误的
  const fetchPromise = fetch("https://springbootgpt.00000.work/gptChat/gpt4.0.all", requestOptions); // 创建fetch请求的Promise实例
  const timeoutPromise = new Promise((resolve, reject) => { // 创建超时的Promise实例
    setTimeout(() => {

      reject(new Error('请求超时，错误原因:') + JSON.stringify(reject));

    }, 30000); // 设置超时时间为30秒
  });
  const response = await Promise.race([fetchPromise, timeoutPromise]); // 使用Promise.race()并行执行fetch请求和超时的Promise实例

  if (response instanceof Response) { // 如果response是fetch请求的响应对象
    const reader = response.body.getReader();
    let result = await reader.read();


    drawingClass.value = "";
    let k = "";
    // let converter = new showdown.Converter();
    while (!result.done) {
      // let text = new TextDecoder("utf-8").decode(result.value).replace(/\s/g, '\u00A0').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{{END}}/g, '\n');
      let text = new TextDecoder("utf-8").decode(result.value);


      k += text;

      // 将文本转换为Markdown格式的HTML

      // drawingClass.AIMessage = marked.parse(k);
      drawingClass.value = marked.parse(k);
      console.log(k)


      result = await reader.read();
    }
  }


}


</script>

<template>
  <div>

    <h1 style="margin-left: 45vw;font-family:'STXingkai';font-size: 50px">汉字的探索</h1>






    <el-divider/>
    <span></span>
    <!--  <div>-->
    <!--    <router-view></router-view>-->
    <!--  </div>-->
    <div class="cc12">

      <el-carousel :interval="1000" type="card" height="45vh">
        <el-carousel-item v-for="(item,index) in image1" :key="index">
          <img :src="item" style="width: 100%;height:100%" alt="">
        </el-carousel-item>
      </el-carousel>

    </div>

    <br>
    <br>
    <h1 style="margin-left: 47vw;font-family:'STXingkai';">起源发展</h1>

    <br>


<!--    起源和发展-->
    <div class="content">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in activeMessage" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="box-card">
            <br>
            <img  style="margin-left: 1vw" :src="item.img" class="card-image">
            <div style="padding: 14px;">
              <h3>{{ item.title }}</h3>
              <p style="">{{ item.text }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>


  </div>

  <h1 style="margin-left: 45vw;font-family:'STXingkai;'">十二生肖 甲骨文</h1>

  <el-timeline>
    <el-timeline-item
        class="bounce-enter-active"
        v-for="(item, index) in timelineData.timelineData"
        :key="index"
        :timestamp="item.period"
        placement="top"

        :color="item.color"
    >
      <transition name="fade" mode="out-in">
        <el-card>
          <h4>{{ item.title }}</h4>

          <el-row :gutter="10">
            <el-col :span="10">
              <img :src="item.image" alt="龙字形态" style="width: 40vw; max-height: 40vh;margin-left: 10vw">
            </el-col>
<!--            <el-col :span="4"></el-col>-->
            <el-col :span="13">
              <br>
              <br>
              <br>

              <p style="margin-left: 20vw;font-size: 20px;font-size: 25px" >
                <el-divider content-position="left">介绍:</el-divider>
                {{ item.description }}

                <el-divider content-position="left"></el-divider>
              </p>

            </el-col>

          </el-row>
          <br>
          <br>

<!--        <div style="display: flex">-->
<!--         -->
<!--          -->
<!--        </div>-->
<!--          max-width: 1000px;-->
        </el-card>
      </transition>
    </el-timeline-item>
  </el-timeline>

  <br>
  <br>
  <br>


  <h1 style="margin-left: 47vw;font-family:'STXingkai';">AI文字探索</h1>
  <br>

  <div>

    <div style="margin-left: 25vw">
     <div  style="margin-left: 20vw">
<!--       <el-input v-model="message" style="width: 240px;height: 240px;font-size:100px;"/>-->
       <input  v-model="message" class="single-character-input" maxlength="1" />
       <br>
       <br>
       <el-button style=" margin-left: 5vw" type="success" @click="sendMessage" >询问此字</el-button>
     </div>
      <br>
      <br>

      <div  v-html="drawingClass" style="max-width: 1000px;">

      </div>


    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>


  </div>


</template>

<style scoped>

.pname1{
  /deep/.el-collapse-item__header {
    font-size: 330px;
  }

}
.pname{
  font-size: 30px;
}
.cc12 {
  background-image: url("../img/39361.png");
  background-size: cover; /* 背景图尺寸，cover表示尽可能填充整个div */
  background-position: center; /* 背景图位置，居中显示 */
  background-repeat: no-repeat; /* 不重复背景图 */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}


.el-timeline-item {
  margin-bottom: 50px; /* 增加时间线项之间的间距 */
}

.el-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

.el-timeline-item__timestamp {
  font-weight: bold; /* 加粗时间戳字体 */
  color: #409EFF; /* 使用 Element UI 主色调 */
}


.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}
.single-character-input {
  width: 240px;
  height: 240px;
  font-size: 100px;
  text-align: center; /* 居中文本 */
  border: 1px solid #ccc; /* 可选：添加边框 */
}
.image {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 20px;
}
</style>