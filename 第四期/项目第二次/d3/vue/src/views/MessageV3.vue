<script setup>

</script>

<template>
  <div>

    <el-drawer v-model="drawer" title="操作：" :with-header="drawer">
      <div>
        <p>服务类型:</p>
        <el-select
            v-model="xuanze.service_content_id"
            placeholder="Select"
            size="large"
            style="width: 240px"
            :change="Onchange()"
        >
          <el-option
              v-for="item in leixing"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </div>

      <br>


      <br>
      <div>
        <p>服务内容:</p>
        <el-select
            v-model="xuanze.service_type_id"
            placeholder="Select"
            size="large"
            style="width: 240px"
        >
          <el-option
              v-for="item in neiron"
              :key="item.service_content_id"
              :label="item.service_content_name"
              :value="item.service_content_id"
          />


        </el-select>
      </div>


      <br>
      <br>

      <!--    上传  -->
      <div>
        <p>宣传图片</p>
        <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8080/file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl1" :src="imageUrl1" class="avatar" style="border: red 1px ridge;width: 200px;height: 200px"/>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

      </div>


      <br>
      <!--    上传  -->
      <div >
        <p>缩略图片</p>


        <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8080/file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl2" :src="imageUrl2" class="avatar"  style="border: red 1px ridge;width: 200px;height: 200px" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>




      </div>



      <!--      服务简介绍-->
      <br>
      <div>
        <p>服务简介:</p>
        <el-input v-model="xuanze.introduction" style="width: 240px" :rows="2" placeholder="Please input"/>
      </div>


      <br>
      <div>
        <p>定价:</p>
        <el-input v-model="xuanze.price" style="width: 240px" :rows="2" placeholder="Please input"/>
      </div>


      <br>
      <div>
        <p>服务详细:</p>
        <el-input v-model="xuanze.introduction" style="width: 240px" :rows="2" type="textarea" placeholder="Please input"/>
      </div>

      <br>
      <br>
      <el-button type="success">添加</el-button>

    </el-drawer>
  </div>
</template>



<style scoped>

</style>