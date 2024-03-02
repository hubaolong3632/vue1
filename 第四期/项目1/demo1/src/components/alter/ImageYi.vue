<template>
  <el-card shadow="always" style="margin-bottom:100px">
  <div class="container" >

    <transition name="el-fade-in-linear">
    <div class="row " v-show="imageShow.yc">
      <div class="col-md-6">
<!--        <img class="product-img img-thumbnail" :src="aList.image" alt="Product Image">-->
        <div class="demo-image__preview img-thumbnail">
          <div class="demo-image__preview">

          <el-image
              style=""
              :src="url"
              :preview-src-list="srcList">
          </el-image>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <el-card class="box-card" >
            <h2 class="product-title">{{aList.title}}</h2>
            <p class="product-description">AI绘图一号</p>
            <p class="product-price">价格: ${{aList.price}}</p>
            <button class="btn btn-primary" @click="aa">查看详细{{msg}}</button>
        </el-card>
<!--        <div class="product-info">-->
<!--         -->
<!--        </div>-->
      </div>
    </div>
    </transition>
    <el-button :type="imageShow.type" @click="yingChang">{{imageShow.zt}}</el-button>

  </div>
  </el-card>

</template>

<script>
import Bus from "@/utils/EventBus";
export default {
  name: "demoTrest",
  // props:['aList'],
  props:{
    aList:{
      required:true, //校验参数是否为空
    },
  },
  data(){
    return {
      c1:22,
      msg:"1212",
      imageShow:{
        yc:true,
        zt:"隐藏",
        type:"danger",
      },
      url: this.aList.image,
      srcList: [
        this.aList.image,
      ]
    }
  },
  methods:{
    aa(){
      console.log("子传父")
         this.$emit('abc111',this.c1)
    },
    yingChang(){
      this.imageShow.yc=!this.imageShow.yc;
      this.imageShow.zt=this.imageShow.zt=="显示"?"隐藏":"显示";
      this.imageShow.type=this.imageShow.type=="success"?"danger":"success";
      this.$message({
        message: '隐藏消息成功',
        type: 'success'
      });

    },
    open2(){

    },
  },
  created() {

    //非父子传递接收
    Bus.$on('seee',(msg)=>{
          alert(msg)

    })
  }

}
</script>

<style scoped>
.product-img {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.product-info {
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}
.product-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}
.product-description {
  color: #666;
  margin-bottom: 20px;
}
.product-price {
  font-size: 20px;
  color: #ff6b6b;
  margin-bottom: 20px;
}

</style>