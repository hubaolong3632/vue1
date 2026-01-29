<template>
<div>

    <el-container>
      <el-aside width="350px" ><ImageOrdelZuo></ImageOrdelZuo></el-aside>
      <el-container>
        <el-main>
          <ImageCreateYou></ImageCreateYou>
        </el-main>
        <!--        <el-footer style="background-color: #47ff00">Footer</el-footer>-->
      </el-container>
    </el-container>



</div>
</template>

<script>
import ImageOrdelZuo from "@/components/alter/AI/AIImage/ImageOrdelZuo";
import ImageCreateYou from "@/components/alter/AI/AIImage/ImageCreateYou";
import LoginV2 from "@/components/login/LoginV2.vue";
export default {
  name: "AIImage",
  components: {LoginV2, ImageCreateYou, ImageOrdelZuo},
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