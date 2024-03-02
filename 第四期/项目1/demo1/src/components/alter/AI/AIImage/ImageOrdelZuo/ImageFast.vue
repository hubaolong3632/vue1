<template>
<div class="el-row">
  <el-card shadow="always" class="el-row">
    <div style="margin-top: 20px">
      <p >创造词</p>
      <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
    </div>
  </el-card>


  <el-card shadow="always" class="el-row">
  </el-card>

</div>
</template>

<script>
//快速创造
export default {
  name: "ImageFast",
  data(){
    return{
      textarea: '',
    }
  },
}
</script>

<style scoped>

</style>