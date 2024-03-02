<template>
 <div style="width: 100%;height: 400px">
<!-- <div >-->
   <div id="box" ref="aa" class="container" style="margin-bottom:50px; margin-top: 50px;">

     <div id="box1" ref="bb" class="container" >
<!--           <div class="container">邮</div>-->

     </div>


   </div>


 </div>
</template>
<!--AI语言聊天-->
<script>
export default {
  name: "RoundTimeEr",
  data(){
    return {
      yuanInterVal:{
        InterVal:null,
        shuiPing:0,
        cuiZhi:0,
        MoHuBanJin:200,
        color:{
          R:3,
          P:4,
          G:5,
        }

      }

    }
  },
  methods:{

  },
  mounted: function () {
    /*
     - 第一个值（10px）：水平偏移量，表示阴影水平方向的位置。
     - 第二个值（10px）：垂直偏移量，表示阴影垂直方向的位置。
     - 第三个值（5px）：模糊半径，表示阴影的模糊程度。
     - 第四个值（#888888）：颜色，表示阴影的颜色。
    */
    let yuan=this.yuanInterVal;
    let k=this.$refs.aa
    let bb=this.$refs.bb

   let timeSum= {
     MoHuBanJin:{sum:0, begin:1, end:100, addUp:4, bool:false},
     MoHuBanJin2:{sum:0, begin:1, end:150, addUp:4, bool:false},
     borderRadius:{sum:0, begin:1, end:55, addUp:1, bool:false},
     width1:{sum:300, begin:200, end:300, addUp:2, bool:false},
     height1:{sum:300, begin:200, end:300, addUp:2, bool:false},
     background1:{sum:0, begin:255, end:300, addUp:3, bool:false},
   }
    this.yuanInterVal.InterVal = setInterval(() => {

     let winth_1= sunDate(timeSum.width1)
     let height_1= sunDate(timeSum.height1)


      k.style.width=winth_1+"px"
      k.style.height=height_1+"px"

      bb.style.width=(winth_1-100)+"px"
      bb.style.height=(height_1-100)+"px"


      // k.style.backgroundColor=`#${sunDate(timeSum.background1)}`


      k.style.boxShadow=`${yuan.shuiPing}px ${yuan.cuiZhi}px ${sunDate(timeSum.MoHuBanJin)}px #d72938`; //设置悬浮自动事件
      bb.style.boxShadow=`${yuan.shuiPing}px ${yuan.cuiZhi}px ${sunDate(timeSum.MoHuBanJin2)}px #000`; //设置悬浮自动事件


      // k.style.borderRadius=sunDate(timeSum.borderRadius)+"%" //设置圆形变成正方形
      // bb.style.borderRadius=sunDate(timeSum.borderRadius)+"%" //设置圆形变成正方形


    }, 30)

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
  beforeDestroy() {

    clearInterval(this.yuanInterVal.InterVal);
  }
}
</script>

<style scoped>

#box{

  width: 400px; height: 400px;text-align: center;
  padding: 50px; box-sizing: border-box;
  border-radius: 100%; /* 将边框半径修改为50%，使其成为圆形 */
  /*background-color: #3576ef;*/
  /*background-image: linear-gradient(45deg, rgb(71, 255, 0), rgb(71, 255, 0), rgba(66, 185, 131, 0.3), rgba(9, 255, 79, 0.3), #0000ff, #8000ff, #ff00ff);*/

}


#box1{
  width: 200px; height: 200px;text-align: center;
  padding: 50px; box-sizing: border-box;
  border-radius: 100%; /* 将边框半径修改为50%，使其成为圆形 */
  box-shadow: 0px 0px 5px #9aa8c5;
  background-color: #ffffff;
}



/*#box div:nth-child(1){*/
/*  margin-top: 130px;*/
/*  color: white;*/
/*  background-color:#666;*/

/*}*/

</style>