<template>
  <div>
    <el-row :gutter="90" v-for="i in  3" :key="i">
      <el-col :span="2"><br></el-col>
      <el-col :span="6" v-for="j in  3"  :key="j">
        <div v-if="drawList[((i-1)*3)+j].id!=5" :class="{cc:((i-1)*3)+j==sunId}">
          <!--        显示图像-->
          <el-avatar :src="drawList[((i-1)*3)+j].image"></el-avatar>
          <p >{{drawList[((i-1)*3)+j].draw}}</p>
        </div>
        <div v-else>
          <br>
          <el-button @click="start"  :type="draw.type" round >{{draw.startName}}</el-button>
        </div>


      </el-col>
    </el-row>


  </div>
</template>
<!--抽奖功能-->
<script>
export default {
  name: "drawYi",
  data(){
    return {
      styleBackgurn:{cc:true},
      sunId:1,

      draw:{
        startName:"开始抽奖",
        startup:false,
        clea:null,
        type:"",
      },
       drawList:[
           {id:0,image:"xxx",draw:"xx"},
           {id:1,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"参与奖"},
           {id:2,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"神秘大奖"},
           {id:3,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"参与奖"},
           {id:4,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"参与奖"},
           {id:5,image:require("@/components/image/png1.png"),draw:"开始抽奖"},
           {id:6,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"二等奖"},
           {id:7,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"参与奖"},
           {id:8,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"一等奖"},
           {id:9,image:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",draw:"参与奖"},
       ]
    }
  },
  methods:{
     start(){

       this.draw.startup=!this.draw.startup; //拿到相反

       if(this.draw.startup==true){
         this.draw.startName="停止抽奖"
         this.draw.type="danger"
         let draw_list=[1,2,3,6,9,8,7,4]; //按照此顺序进行排布
         let sum=1;

         this.draw.clea=setInterval(() => {
           this.sunId=draw_list[sum++];
           sum%=8;
         }, 1);

       }else{
         // console.log("抽奖",this.draw.clea)
         clearInterval(this.draw.clea)
         this.draw.startName="开始抽奖"
         this.draw.type=""

        let name= this.drawList[this.sunId].draw

         //弹窗提示
         this.$message({

           message: `恭喜你中了 ${name}`,
           type: 'success'
         });

       }






     } ,


  }
}
</script>

<style scoped>

.cc{
  background: #42b983;
  border-radius: 100px; /* 添加10像素的圆角边框 */
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


</style>