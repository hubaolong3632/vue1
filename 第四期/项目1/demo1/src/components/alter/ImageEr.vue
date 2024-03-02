<template>
<!--  如果执行到这个的话就执行类刷新-->
<!--  v-roll_1="`slide-in-blurred-top`"-->
<div ref="a1">

<!--  <el-row :gutter="26" v-show="show" id="imageEr">-->
<!--  <el-row :gutter="26" >-->
<!--    <el-col :span="2" ><br></el-col>-->
<!--    <el-col  :span="5" v-for="image of imageData"  :key=image.name >-->
<!--&lt;!&ndash;      设置距离顶部div 10个位置&ndash;&gt;-->
<!--          <el-card :body-style="{ padding: '10px' }">-->

<!--              <el-image-->
<!--                  style=""-->
<!--                  :src="image.image"-->
<!--                  :preview-src-list="image.image.split(' ')"-->
<!--              >-->
<!--              </el-image>-->


<!--            <div style="padding: 14px;">-->
<!--              <span>{{image.name}}</span>-->
<!--              <div class="bottom clearfix">-->
<!--                <time class="time">{{image.introduce}}</time>-->
<!--              </div>-->
<!--              <el-button type="text" class="button"  @click="downloadImage(image)">下载图片</el-button>-->
<!--            </div>-->
<!--          </el-card>-->
<!--    </el-col>-->
<!--  </el-row>-->

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2 col-md-3"  v-for="image of imageData"  :key=image.name>


          <el-card :body-style="{ padding: '10px' }">
            <el-image
                style=""
                :src="image.image"
                :preview-src-list="image.image.split(' ')"
            >
            </el-image>
          </el-card>


          <div style="padding: 14px;">
            <span>{{image.name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{image.introduce}}</time>
            </div>
            <el-button type="text" class="button"  @click="downloadImage(image)">下载图片</el-button>
          </div>

        </div>
<!--        <div class="col-sm-3 col-md-6">-->
<!--          <p>RUNOOB</p>-->
<!--        </div>-->
<!--        <div class="col-sm-9 col-md-6">-->
<!--          <p>菜鸟教程</p>-->
<!--        </div>-->
      </div>
    </div>





<!--  <el-row :gutter="26" >-->
<!--    <el-col :span="2" ><br></el-col>-->
<!--    <el-col  :span="5" v-for="image of imageData"  :key=image.name >-->
<!--      &lt;!&ndash;      设置距离顶部div 10个位置&ndash;&gt;-->
<!--      <el-card :body-style="{ padding: '10px' }">-->

<!--        <el-image-->
<!--            style=""-->
<!--            :src="image.image"-->
<!--            :preview-src-list="image.image.split(' ')"-->
<!--        >-->
<!--        </el-image>-->


<!--        <div style="padding: 14px;">-->
<!--          <span>{{image.name}}</span>-->
<!--          <div class="bottom clearfix">-->
<!--            <time class="time">{{image.introduce}}</time>-->
<!--          </div>-->
<!--          <el-button type="text" class="button"  @click="downloadImage(image)">下载图片</el-button>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </el-col>-->
<!--  </el-row>-->


</div>
</template>

<script>
//四格图展示
export default {
  name: "ImageEr",
  data() {
    return {
      imageData:[

      ],

    }
  },
  mounted() {
    //创建数据
    for(let i=1;i<=4;i++){
      let randomNumber = Math.floor(Math.random() * 270) + 1;
      this.imageData.push({id:6,name:`图-${i}`,introduce:`Ai绘图编号:${randomNumber}`,image:require(`@/components/image/Ai/image/c${randomNumber}.png`)})
    }

  },
  methods: {
    //图片下载
    downloadImage(image) {
      const link = document.createElement('a');
      link.href = image.image;
      link.download = `${image.introduce}.jpg`; // 指定下载后的文件名
      document.body.appendChild(link);
      link.click(); // 触发下载
      document.body.removeChild(link); // 下载后移除<a>标签
    },
    //添加一张
    setLoading(){
      let randomNumber = Math.floor(Math.random() * 270) + 1;
      this.imageData.push({id:6,name:"图一",introduce:"打伞的男生",image:require(`@/components/image/Ai/image/c${randomNumber}.png`)})

    },
  },
}
</script>
<style>



.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>

