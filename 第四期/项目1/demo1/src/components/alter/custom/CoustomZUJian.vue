<template>
<!--  <div class="loading">-->
  <div id="yourDivId" >
    <div >
<!--      <span v-show="yuanInterVal.symbol" ref="symbol" style="font-size: 100px;color: #ff6b6b">|</span>-->
      <span v-show="yuanInterVal.symbol" ref="symbol" :style="{ fontSize: dynamicFontSize1,color:color}">|</span>
      <span class="textStyle" ref="title" :style="{ fontSize: dynamicFontSize }" >{{yuanInterVal.text}}</span>
      <span v-show="yuanInterVal.symbol" ref="symbol" :style="{ fontSize: dynamicFontSize1,color:color}">|</span>


    </div>

<!--    <slot name="h1" :id="name" msg="aaa">那边不写我就是默认值</slot>-->
<!--    <slot name="h2">那边不写我就是默认值</slot>-->
<!--    <slot name="h3">那边不写我就是默认值</slot>-->
<!--    <input v-f1_s="name" ref="inp" type="text" v-model="name">-->
<!--    <div class="input-group mt-3 mb-3">-->
<!--      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">-->
<!--        选择网站-->
<!--      </button>-->
<!--      <ul class="dropdown-menu">-->
<!--        <li><a class="dropdown-item" href="https://www.google.com">GOOGLE</a></li>-->
<!--        <li><a class="dropdown-item" href="https://www.runoob.com">RUNOOB</a></li>-->
<!--        <li><a class="dropdown-item" href="https://www.taobao.com">TAOBAO</a></li>-->
<!--      </ul>-->
<!--      <input type="text" class="form-control" placeholder="网站地址">-->
<!--    </div>-->


  </div>
</template>

<script>
//自定义组件
export default {


  data(){
      return{
        yuanInterVal:{
          InterVal:null,
          symbol:true,
          text:"",
          text_1:"欢迎使用邮迹，你的创作灵感激发器 !",
        },
        color:"#ff6b6b",
        screenWidth: window.innerWidth ,// 获取屏幕宽度
      }
   },
  //这个是局部指令
  directives:{
    f2_s:{
      inserted(el){
        el.focus();
      }
    }
  },
  //计算属性
  computed: {
    dynamicFontSize() {
      if (this.screenWidth  > 1000) {
        return "60px"; // 如果文本超过10个字符，设置字体大小为60px
      } else {
        return "30px"; // 如果文本不超过10个字符，设置字体大小为40px
      }
    },
    dynamicFontSize1() {
      if (this.screenWidth  > 1000) {
        return "100px"; // 如果文本超过10个字符，设置字体大小为60px
      } else {
        return "50px"; // 如果文本不超过10个字符，设置字体大小为40px
      }
    }
  },
  mounted() {
    let yuan= this.yuanInterVal;
    let sum=0;
    let timeSum= {
      text:{sum:0, begin:0, end:yuan.text_1.length, addUp:1, bool:false},
    }
    function time_text(){
    let k= setInterval(() => {
        // yuan.symbol=!yuan.symbol //拿到取反值
        yuan.text = yuan.text_1.substring(0,  sunDate(timeSum.text));
        sum++;
        if(sum==yuan.text_1.length){
          clearInterval(k)
          sum=0;
        }
      },60)

    }

    time_text();
    this.yuanInterVal.InterVal=setInterval(()=>{
      time_text();
    },4000)

    function sunDate(dataSum){
      // sum是返回当前还剩下多少  begin是表示从多少开始 end表示到多少结束  addup表示添加一个 bool表示一开始是加还是减 false表示先加
      // {sum:0, begin:1, end:10, addUp:1, bool:false} //设置时间

      if(dataSum.bool==false){ //如果未false 就往前加
        dataSum.sum=dataSum.sum+dataSum.addUp;
        if(dataSum.sum>=dataSum.end){
          dataSum.bool=true;
        }
      }else{
        dataSum.sum=dataSum.sum-dataSum.addUp;
        if(dataSum.sum<=dataSum.begin){
          dataSum.bool=false;
        }
      }
      return dataSum.sum;
    }

  },

  created() { //初始化之后开始监听器 如果屏幕发生改变就执行下面的事件
    window.addEventListener('resize', this.onResize); // 监听窗口大小改变事件
  },
  methods: { //如果发生改变就执行此事件
    onResize() {
      this.screenWidth = window.innerWidth; // 当窗口大小改变时更新屏幕宽度
    }
  },

  beforeDestroy() {
      clearInterval(this.yuanInterVal.InterVal) //移除定时器
       window.removeEventListener('resize', this.onResize); // 在组件销毁前移除事件监听器
  }

}
</script>

<style scoped>

 .textStyle{

   /*font-family: 华文楷体;*/
   font-family: 华文楷体;
   background: linear-gradient(90deg, rgba(255, 176, 51, 0.38), rgba(242, 1, 247, 0.26));
   /*background-image: linear-gradient(45deg, rgba(255, 0, 0, 0.16), rgba(255, 128, 0, 0.2), rgba(25, 204, 123, 0.27), rgba(210, 98, 116, 0.11), #0000ff, #8000ff, #ff00ff);*/

 }

.loading:before{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*background: #fff url("@/components/image/p1.png") no-repeat;*/
  background-color: #000000;
}

</style>