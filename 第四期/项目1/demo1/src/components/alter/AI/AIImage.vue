<template>
<div>

<!--  <el-row :gutter="20" >-->
<!--    <el-col :span="6" style="margin-left: 10px"  >-->
<!--    <ImageOrdelZuo></ImageOrdelZuo>-->
<!--   </el-col>-->
<!--    <el-col :span="17" >-->
<!--    <ImageCreateYou></ImageCreateYou>-->
<!--    </el-col>-->
<!--  </el-row>-->
    <el-container>
      <el-aside width="350px" ><ImageOrdelZuo></ImageOrdelZuo></el-aside>
      <el-container>
        <el-main ><ImageCreateYou></ImageCreateYou></el-main>

        <!--        <el-footer style="background-color: #47ff00">Footer</el-footer>-->
      </el-container>
    </el-container>



</div>
</template>

<script>
import ImageOrdelZuo from "@/components/alter/AI/AIImage/ImageOrdelZuo";
import ImageCreateYou from "@/components/alter/AI/AIImage/ImageCreateYou";
export default {
  name: "AIImage",
  components: {ImageCreateYou, ImageOrdelZuo},
  data(){
    return {

    }
  }
}
</script>

<style hidden>

last-child {
   margin-bottom: 0;
 }

.bg-purple-dark {
  background: rgba(210, 219, 222, 0.16);
}
.rounded-image {
  border-radius: 10px; /* 设置圆角半径 */
  /*margin-top: 20px;*/
  /*margin-left: 20px;*/
}

</style>