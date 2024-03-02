<template>
 <div>
   <!--
    name   设置文件的上传名称
   headers 设置 上传的 请求头
   action  设置上传的地址

   on-preview 点击文件 上传的 钩子
   on-remove 移除文件上传的钩子
   -->
   <el-upload
       class="upload-demo"
       name="cca"
       slot="trigger"
       :headers="headersData"
       action="https://jsonplaceholder.typicode.com/posts/"
       :on-preview="handlePreview"
       :on-remove="handleRemove"
       :on-success="success"
       :file-list="fileList"
       list-type="picture">
     <el-button size="small" type="primary">点击上传</el-button>
     <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
   </el-upload>
<!--   <el-upload-->
<!--       class="upload-demo"-->
<!--       ref="upload"-->
<!--       action="https://jsonplaceholder.typicode.com/posts/"-->
<!--       :headers="da1"-->
<!--       :on-preview="handlePreview"-->
<!--       :on-remove="handleRemove"-->
<!--       :file-list="fileList"-->
<!--       :auto-upload="false">-->
<!--     <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
<!--     <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
<!--     <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--   </el-upload>-->
 </div>
<!--  <el-upload-->
<!--      class="upload-demo"-->
<!--      drag-->
<!--      action="https://jsonplaceholder.typicode.com/posts/"-->
<!--      :data="uploadData"-->
<!--      multiple>-->
<!--    <i class="el-icon-upload"></i>-->
<!--    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--  </el-upload>-->
</template>

<!--文件上传组件-->
<script>
export default {
  name: "UploaDing",
  data() {
    return {
      headersData:{'Authorization':"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLmma7pgJrnlKjmiLciLCJleHAiOjE3MDMzMDU4MjQsImlzcyI6IlNLLTAwMDAwLndvcmsiLCJqd3Rtb2RlbCI6IntcIm5pY2tuYW1lXCI6XCI5MTE0MTI2NjdAcXEuY29tXCIsXCJ0eXBlXCI6XCJkZWZhdWx0XCIsXCJ1aWRcIjpcIjYyZTljMGI5YzkzNzQ3ZDhhN2UwXCJ9In0.dEiQAonv6ekzCiD2QzR430dwtFtzWH88xinBixWANh1i8xAsUxar9_ldmFjxKsrjt5i294B5n8OvA79usfGO5A"},
      fileList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log("删除");

      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("添加 ");
      console.log(file);
    },
    success(response, file, fileList){
      console.log(response)
      console.log(file)
      console.log(fileList)

    }
  }


}
</script>

<style scoped>

</style>