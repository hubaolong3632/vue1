<template>
<div>



<!--  内容显示-->
  <el-card shadow="always" class="jianJu">
    <p>绘画内容:</p>
    <el-input
        type="textarea"
        placeholder="请输入需要描述的内容，如小狗,美女,或者连续的词如电线杆旁边的小狗，并且下面会用AI优化"
        v-model="textarea"
        maxlength="500"
        show-word-limit
        :rows="4"
    >
    </el-input>
  </el-card>



  <el-card shadow="always" class="jianJu">
  </el-card>

  <el-card shadow="always" class="jianJu">
  <el-divider content-position="left"><span style="color:rgba(0,0,0,0.37);">必选属性</span></el-divider>
<!--关键设置-->
  <div>
    <span>文字理解: </span>
    <el-select v-model="comprehend.value" placeholder="选择理解强度">
      <el-option
          v-for="item in comprehend.options"  :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>

    <div class="divMargin">
        <span>画图类型: </span>
        <el-select v-model="type2.value" placeholder="选择风格">
          <el-option
              v-for="item in type2.options"  :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
      </el-select>
    </div>

    <el-divider content-position="left"><span style="color:rgba(0,0,0,0.37);">常用属性</span></el-divider>
    <div class="divMargin">
      <span>画图风格: </span>
      <el-select v-model="style1.value" placeholder="选择风格">
        <el-option
            v-for="item in style1.options"  :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="divMargin">
      <span>图片大体: </span>
      <el-select v-model="generall.value" placeholder="图片大体">
        <el-option
            v-for="item in generall.options"  :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

  </el-card>


<!--重点描述-->
  <el-card shadow="always" class="jianJu">
    <el-divider content-position="left"><span style="color:rgba(0,0,0,0.37);">重点描述</span></el-divider>

    <span>重点描述: </span>
    <el-select
        value-key="122"
         v-model="describe1.value1" multiple  filterable   allow-create  default-first-option  placeholder="请选择重点描述，可以自己输入">
      <el-option
          v-for="item in describe1.options"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.label"
          :value="item.value">
      </el-option>



    </el-select>
  </el-card>



  <!--文字润色-->
  <el-card shadow="always" class="jianJu">
    <el-divider content-position="left"><span style="color:rgba(0,0,0,0.37);">AI润色</span></el-divider>

    <p>GPT4.0润色<span class="badge  bg-danger">推荐</span></p>
    <el-input
        type="textarea"
        placeholder="这里不需要填写任何内容,点击下面的开始润色之后4.0会自动生成画图词，等待生成完毕之后,可以更具需要进行修改 最终图片生成以此提示词为准！"
        v-model="textarea40"
        maxlength="2000"
        show-word-limit
        :rows="10"
    >
    </el-input>
    <el-button type="danger" class="divMargin" :loading="polish" @click="imageCreate()">{{runshe}}</el-button>
  </el-card>



  <!--  生成数量-->
  <el-card shadow="always" class="jianJu">
   <div>
     <p>生成数量</p>
     <div class="block">
       <el-slider
           v-model="form.sum"
           show-input
           :min="1"
           :max="10"
       >
       </el-slider>
     </div>
   </div>

    <el-divider content-position="left">图片大小</el-divider>

    <div style="margin-top: 30px">
<!--      <p>图片大小</p>-->
<!--      <br>-->

      <el-row :gutter="20">

        <el-col :span="8">
          <el-button :type="size1 === '1024x1792' ? 'primary' : 'default'" style="height:60px;width: 30%" @click="image_size(`1024x1792`)" >1:2</el-button><p>1024x1792</p>
        </el-col>

        <el-col :span="8">
          <el-button :type="size1 === '1024x1024' ? 'primary' : 'default'" style="height:40px;width: 30%" @click="image_size(`1024x1024`)">1:1</el-button><p>1024x1024</p>
        </el-col>

        <el-col :span="8">
          <el-button :type="size1 === '1792x1024' ? 'primary' : 'default'" style="height:40px;width: 60%" @click="image_size(`1792x1024`)">2:1</el-button><p>1792x1024</p></el-col>
      </el-row>




      <p>选择的大小为:<span style="color:red;">{{size1}}</span></p>
    </div>

  </el-card>

  <el-card shadow="always" class="jianJu"></el-card>


</div>
</template>
<script>
// 高级创造
import Bus from "@/utils/EventBus";
import requestData from "@/router/requestData";

export default {
  name: "ImageAdvanced",
  data(){
    return{
      textarea:"", //用户输入
      textarea40:"22",//4.0润色
      region1:2,
      form: {
        sum:1,
      },

      //文字理解
      comprehend:{
            options: [{
              value: 'standard',
              label: '一般 (基本理解)'
            }, {
              value: 'hd',
              label: '细腻 (理解更强)'
            }],

            value: 'standard'
      },


      //画图类型
      type2:{
        options: [{
          value: 'vivid',
          label: '写实  (贴近现实)'
        }, {
          value: 'natural',
          label: '虚拟  (天马行空)'
        }],

        value: 'vivid'
      },

      //画图风格
      style1:{
            options: [
                {value: '矢量图', label: '矢量图'},
                {value: '物品', label: '物品'},
                {value: '动物', label: '动物'},
                {value: '衣服', label: '衣服'},
                {value: '中国古风', label: '中国古风'},
                {value: 'white shirt ', label: '白衬衫'},
                {value: 'suit ', label: '西装'},
                {value: 'Hanfu ', label: ' 汉服'},
                {value: 'kimono  ', label: '和服'},
                {value: 'jewelry  ', label: '珠宝首饰'},
                {value: '活力青年', label: '活力青年'},
                {value: '妙年少女', label: '妙年少女'},
                {value: '中国婚礼', label: '中国婚礼'},
                {value: '日本风格', label: '日本风格'},
                {value: '二次元', label: '二次元'},
                {value: '可爱', label: '可爱'},
                {value: '帅气', label: '帅气'},
                {value: '3D卡通', label: '3D卡通'},
                {value: '现实写实', label: '现实写实'},
                {value: '多彩现实', label: '多彩现实'},
                {value: '炫彩动漫', label: '炫彩动漫'},
            ],

            value: '中国古风'
      },

      //图片大体
      generall:{
        options: [
          {value: '人物描述', label: '人物描述'},
          {value: '高清大图', label: '高清大图'},
          {value: '四格漫画', label: '四格漫画'},
          {value: '海报', label: '海报'},
          {value: '物品', label: '物品'},
          {value: '动物', label: '动物'},
          {value: '衣服', label: '衣服'},

          {value: '矢量图', label: 'LOGO矢量图'},
        ],

        value: '高清大图'
      },


      //重点描述
      describe1:{
        options: [
            {value: 'x',  label: '-----人物-----',disabled: true},
            {value: '帽子',  label: '帽子'},
            {value: '头发',  label: '头发'},
            {value: '毛发',  label: '毛发'},
            {value: '脸部',  label: '脸部'},
           {value: '衣服', label: '衣服'},
             {value: '身材',  label: '身材'},


            {value: 'xxxx',  label: '-----天气-----',disabled: true},
            {value: '大雨',  label: '大雨'},
            {value: '小雨',  label: '小雨'},
            {value: '阳光',  label: '阳光'},
            {value: '晴朗',  label: '晴朗'},
            {value: '乌云',  label: '乌云'},


           {value: 'xxxxx1',  label: '-----种族-----',disabled: true},
           {value: '种族精灵',  label: '种族小恶魔'},
           {value: '女仆',  label: ''},
           {value: '服务员',  label: ''},
           {value: 'xxxxx2',  label: '-----姿势动作-----',disabled: true},
           {value: ' Looking towards the viewer',  label: '种族小恶魔'},
           {value: 'jump',  label: ' 跳'},
           {value: 'Kneeling',  label: '跪着'},
           {value: 'Holding flowers',  label: '捧着花'},


          {value: 'xxxxx3',  label: '-----五官表情-----',disabled: true},
          {value: '露齿笑',  label: '露齿笑'},
          {value: '脸红',  label: '脸红'},
          {value: '悲伤',  label: '悲伤'},
          {value: '闭眼',  label: '闭眼'},


          {value: 'xxxxx31',  label: '-----发形发色-----',disabled: true},
          {value: '短发',  label: '短发'},
          {value: '中等长度头发',  label: '中等长度头发'},
          {value: '长发',  label: '长发'},
          {value: '飘扬的头发',  label: '飘扬的头发'},
          {value: '金发',  label: '金发'},

          {value: 'xxxxx4',  label: '-----镜头视角-----',disabled: true},
          {value: '全景',  label: '全景'},
          {value: ' 中景镜头',  label: ' 中景镜头'},
          {value: ' 长焦镜头',  label: ' 长焦镜头'},
          {value: '微距镜头',  label: '微距镜头'},
          {value: '全身像',  label: '全身像'},
          {value: '半身像',  label: '半身像'},
          {value: '特写像',  label: '特写像'},



          {value: 'xxxxxx',  label: '-----其他-----',disabled: true},
            {value: '感人',  label: '感人'},
            {value: '服装',  label: '服装'},
            {value: '场地',  label: '场地'},
        ],
        value1:[]
      },
      size1:"1024x1024",
      //判断是否开始润色
      polish:false,
      runshe:"开始润色"

    }
  },


  methods:{
    image_size(max){
      this.size1=max;

    },
    //生成润色
    async imageCreate(){
      let data=this;
      console.log("文字理解:",data.comprehend.value,"  画图类型:",data.type2.value,"   画图风格:",data.style1.value)
      // console.log("图片大体:",data.generall.value,"  重点描述:",data.describe1.value1[0])
      console.log("图片大体:",data.generall.value,"  重点描述:",this.describe1.value1)
      console.log("用户输入:",data.textarea)
      // "content":"你给出的回答一定是中文，并且你是一个绘画描述大师，接下来的你不需要回答我好的，或者非常感谢什么的你只可以给我描述词"
      data.textarea40="";//清理数据


      let textContent=`用优美的语言描绘【${data.style1.value}】风格的【${data.textarea}】，，并且重点描述【${this.describe1.value1.join(",")}】
         ，来进行描述不论我前面怎么形容都得贴近【${data.textarea}】,图片描述格式为【${data.generall.value}】并且描述画面感中文回答`;
    console.log("描述词:",textContent)
      let data1={
        "sum":1,
        "g2":{
          "role":"system",
          "content":"你的回答都是中文"
        },
        "g3":{
          "role":"user",
          "content":textContent
        },
        "social_uid":"abcddd124",
        "stream":true
      }

      // console.log("步入::  ",data1.g3.content)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "1111"
        },
        body: JSON.stringify(data1)
      };
      data.polish=true;
      data.runshe="请稍后正在匹配词";
      const fetchPromise = fetch(requestData.ip()+"gptChat/gpt4.0.0613", requestOptions); // 创建fetch请求的Promise实例

      const timeoutPromise = new Promise((resolve, reject) => { // 创建超时的Promise实例
        setTimeout(() => {
          reject(new Error('请求超时'));
        }, 10000); // 设置超时时间为10秒
      });
      const response = await Promise.race([fetchPromise, timeoutPromise]); // 使用Promise.race()并行执行fetch请求和超时的Promise实例

      if (response instanceof Response) { // 如果response是fetch请求的响应对象
        const reader = response.body.getReader();
        let result = await reader.read();

        while (!result.done) {

          // innerTextGPT.innerText += new TextDecoder("utf-8").decode(result.value).replace(/\s/g,'\u00A0').replace(/{{END}}/g, '\n');
          let text=new TextDecoder("utf-8").decode(result.value).replace(/\s/g,'\u00A0');
          // console.log(text)

          this.textarea40+=text;

          result = await reader.read();
        }
      } else { // 如果response是超时的错误信息
        console.error(response.message);
      }

      console.log("输出完成")
      this.polish=false;
      data.runshe="重新润色";




    },
  },
  created() {


    //监听父类的按钮消息如果按了就执行我这个
    Bus.$on("aa",(aa)=>{
        let data=this;
        let imageText={
          "model":"dall-e-3",
          "prompt":data.textarea40,
          "n":data.form.sum,
          "style":data.type2.value,
          "size":data.size1,
          "quality":data.comprehend.value
        }
        Bus.$emit("imageText",imageText) //携带参数返回给非父类

    })

  }



}
</script>

<style scoped>
.jianJu {
  margin-bottom: 10px;
}
.divMargin{
  margin-top: 30px
}
</style>