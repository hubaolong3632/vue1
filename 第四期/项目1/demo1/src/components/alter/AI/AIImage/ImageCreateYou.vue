<template>
<div class="div-with-scroll" >
  <el-card shadow="always" >
    <div class="demo-image__placeholder" >

        <div v-if="imageData.length!=0">
            <div  v-for="image of imageData" :key="image.url">
              <div class="card">
              <div class="row ">
                <div class="col-md-12">
                  <el-image
                      :style="size1"
                      :src="image.url"
                      :preview-src-list="image.url==null?null:image.url.split(' ')">
                  </el-image>
                  <img :src="image.url" :style="size1">


                </div>
                  <div class="col-md-12 juZhon" >
                    <div v-if="image.bool==true">
                      <h2>图片描述</h2>
                      <p>{{image.revised_prompt}}</p>
                      <el-button type="success" @click="downloadPicture(image.url)">下载图片</el-button>


                    </div>
                    <div v-else>
                      <p>该图出现错误！原因 1.图片违规 2.提示词违规 ,具体问题请看下面（这个是正常故障）</p>
                      <h3 style="color: red">{{JSON.parse(image.revised_prompt).message}}</h3>
                    </div>
                  </div>
            </div>
            </div>
            <br>
            <br>

          </div>
      </div>

      <div v-else style="height: 100vh" >
<!--        <h2 v-if="progressBar.bool==false">请操作右侧生成图片</h2>-->
        <div v-if="progressBar.bool===false">

          <div data-v-64e579d8="" data-v-240517e2="" ismbile="false" style="height: 100%; position: relative;"><div data-v-64e579d8="" class="top"><div data-v-64e579d8="" class="wt"><div data-v-64e579d8=""><img data-v-64e579d8="" src="@/components/image/logo/c1.png" alt=""><div data-v-64e579d8="" class="wttext">暂无绘画</div></div></div></div><div data-v-64e579d8="" class="pagination-block"><!----></div><div class="el-overlay" style="z-index: 2014; display: none;"><div role="dialog" aria-modal="true" aria-labelledby="el-id-6447-41" aria-describedby="el-id-6447-42" class="el-overlay-dialog"></div></div></div>

        </div>

        <div v-else class="mc1">
          <h2 >正在努力生成中请稍后！！</h2>
          <el-progress type="dashboard" :percentage="progressBar.percentage" :color="progressBar.colors"></el-progress>
          <el-progress type="dashboard" :percentage="progressBar.percentage" :color="progressBar.colors"></el-progress>
          <el-progress type="dashboard" :percentage="progressBar.percentage" :color="progressBar.colors"></el-progress>
          <el-progress type="dashboard" :percentage="progressBar.percentage" :color="progressBar.colors"></el-progress>
          <el-progress type="dashboard" :percentage="progressBar.percentage" :color="progressBar.colors"></el-progress>
          <el-progress type="dashboard" :percentage="progressBar.percentage" :color="progressBar.colors"></el-progress>
<!--          <el-button type="success" @click="ImageSetInterval()">下载图片</el-button>-->
        </div>

      </div>
<!--      <img src="@/components/image/Ai/image/c19.png" style="width: 500px;height: 400px" class="rounded-image">-->


    </div>
  </el-card>
</div>
</template>

<script>
import Bus from "@/utils/EventBus";
import requestData from "@/router/requestData";

export default {
  name: "ImageCreateYou",
  data(){
    return{

      //进度条
      progressBar:{
        initerVar:null,
        bool:false,
        percentage: 0,
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
      },
      imageSize:{
        "1024x1792":{width: `70vh`,height: `100vh`},
        "1024x1024":{width: `100vh`,height: `100vh`},
        "1792x1024":{width: `100vh`,height: `70vh`},
      },
      // size1:{width: `100vh`,height: `100vh`}, //设置默认大小
      // size1:{width: `70vh`,height: `100vh`}, //设置默认大小
      size1:{width: `100vh`,height: `70vh`}, //设置默认大小
      imageData: [

        // {
        //   revised_prompt: "{\"code\":\"content_policy_violation\",\"message\":\"Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system.\",\"type\":\"invalid_request_error\"}",
        //   url: require("@/components/image/Ai/image/c19.png"),
        //   bool: true
        // }
      ],
      abc:0,
    }
  },
  methods:{
    //图片定时器
    ImageSetInterval(){
        this.progressBar.bool=true;
        this.progressBar.percentage=0
        this.initerVar=setInterval(()=>{
          this.progressBar.percentage++;

          if(this.imageData.length!=0||this.progressBar.bool==false){
            clearInterval(this.initerVar)
            this.progressBar.bool=false;
          }

        },300)
    },
    async handleImagePicture(imagePicture) {
      let data = this;

      this.ImageSetInterval();//启动加载界面

      console.log("图片大小:",imagePicture.size)
      console.log("图片大小:",data.imageSize)
      data.size1 = data.imageSize[imagePicture.size]; //设置图片的大小
      data.imageData = []; //清理掉上次所有图片

      console.log("开始执行异步获取");


      let imageJson = await requestData.postData("gptImage/image.dalle3", imagePicture);
      console.log("获取到的参数:",imageJson)
      if(imageJson.code!=1){
        data.$notify({
          title: '失败',
          message: "加载图片资源失败",
          type: 'error'
        });
        this.progressBar.bool=false;
        return;
      }



      data.$notify({
        title: '成功',
        message: imageJson.data.text+"图片需要加载一会请耐心等待",
        type: 'success'
      });

      data.imageData = imageJson.data.data==null? data.imageData: imageJson.data.data;

      // console.log(data.imageData);
      //
      console.log("------------------完成-----------------------");
    },
    //图片下载
    downloadPicture(imgSrc) {
      this.$message({
        showClose: true,
        message: '如果下载没反应,请右击保存',
        type: 'warning'
      });


     let name= Math.floor(Math.random() * (90000 - 1000 + 1)) + 1000;
        const image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.download = name || 'photo'
            a.href = url
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
    })
  }
  image.src = imgSrc
}
  },
  mounted() {


    Bus.$on("imagePicture", (imagePicture)=> {
      console.log("接收到生成图片命令")
      this.handleImagePicture(imagePicture);
    });
  }

}
</script>

<style scoped>
.div-with-scroll {
  height: 85vh; /* 设置div的高度 */
  overflow-y: auto; /* 垂直溢出时显示滚动条 */
}

.mc1{
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.juZhon{
  display: flex; /*开启弹性盒子*/
  align-items: center; /*垂直方向居中*/
  justify-content: center;  /*水平方向居中*/
}


</style>

