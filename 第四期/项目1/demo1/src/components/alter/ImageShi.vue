<template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item of image" :key="item.id">
<!--      <el-image-->
<!--          style=""-->
<!--          src="@/components/image/p1.png"-->
<!--      >-->
<!--      </el-image>-->
      <div class="divMargin">
        <img :src="item.image" style="width: 100%;height: 100%">
      </div>

    </el-carousel-item>
  </el-carousel>
</template>
<script>
// 轮播图
export default {
  name: "ImageShi",
  data(){
    return{
      image:[
        {id:5,image:require('@/components/image/Ai/image/c198.png')},
        {id:1,image:require('@/components/image/Ai/image/c185.png')},
        {id:2,image:require('@/components/image/Ai/image/c75.png')},
        {id:3,image:require('@/components/image/Ai/image/c143.png')},
        {id:4,image:require('@/components/image/Ai/image/c175.png')},
        {id:6,image:require('@/components/image/Ai/image/c9.png')},
      ]
    }

  }

}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>