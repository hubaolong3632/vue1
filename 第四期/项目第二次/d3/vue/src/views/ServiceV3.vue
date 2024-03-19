<script  lang="ts" setup>
import {ref} from "vue";

import { ElMessage,UploadProps} from 'element-plus'
const xz = ref({
      leiXing:"服务类型",
      neiRong:"服务内容",
      start:"服务状态",
})
let xiala=ref([
  {value: 'Option1', label: 'Option1'},
  {value: 'Option1', label: 'Option1'},
  {value: 'Option1', label: 'Option1'},
  {value: 'Option1', label: 'Option1'},
])


const tableData =ref( [
  {
   id:1,
   bol:true,
   lx: '2016-05-03',
   nn: 'Tom',
   jj:"xx",
   dj:"xx",
   zt:"上架",
  }, {
    id:1,
    bol:true,
    lx: '2016-05-03',
    nn: 'Tom',
    jj:"xx",
    dj:"xx",
    zt:"上架",
  }, {
    id:1,
    bol:true,
    lx: '2016-05-03',
    nn: 'Tom',
    jj:"xx",
    dj:"xx",
    zt:"上架",
  },


])

const update = (index) => {
  console.log(index)
}
const SJ = (index) => {
  console.log(index)
}
const remove = (index) => {
  console.log(index)
  // tableData.value.splice(index, 1)
}





// http://127.0.0.1:8000/file

const imageUrl = ref({
    img1:"",
    img2:"",
})

const fileImageYi: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  console.log("拿到的链接:"+response)


  imageUrl.value.img1 = response
}


const fileImageEr: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  console.log("拿到的链接"+response)

  imageUrl.value.img2 = response
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile.type)
  if (rawFile.type !== 'image/jpeg'&&rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('Avatar picture size can not exceed 20MB!')
    return false
  }
  return true
}



let drawer = ref(true)
let yes=()=>{
  console.log("xxx")
  drawer.value=false;
}

let input=ref("");
let textarea=ref("");


</script>
<template>
  <div>

    <el-row :gutter="10">
      <el-col :span="4">
        <el-select v-model="xz.leiXing" placeholder="Select" >
          <el-option
              v-for="item in xiala"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select v-model="xz.neiRong" placeholder="Select">
          <el-option
              v-for="item in xiala"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select v-model="xz.start" placeholder="Select" >
          <el-option
              v-for="item in xiala"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-button type="success" plain>搜索</el-button>
      </el-col>
     <el-col :span="4">
        <el-button type="success"  plain @click="drawer=true">新增</el-button>
      </el-col>
     <el-col :span="4">
        <el-button type="success" plain>批量操作</el-button>
      </el-col>




    </el-row>
    <br>
    <br>

    <el-table :data="tableData" style="width: 100%;height: 50vh">
      <el-table-column fixed  type="selection" width="150">
        <template #default="s2">
          <input type="checkbox" v-model="s2.row.bol">
        </template>
      </el-table-column>
      <el-table-column prop="id" label="序号" width="120" />
      <el-table-column prop="lx" label="服务类型" width="120" />
      <el-table-column prop="nn" label="服务内容" width="120" />
      <el-table-column prop="jj" label="服务简介" width="120" />
      <el-table-column prop="dj" label="定价" width="600" />
      <el-table-column fixed="right" label="状态" width="300">
        <template #default="ss1">
          <el-button type="success" @click="update(ss1.row)">编辑</el-button>
          <el-button type="success" @click="SJ(ss1.row)" >{{ss1.row.zt}}</el-button>
          <el-button type="danger"  @click="remove(ss1.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>


  </div>

  <div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-row gutter="10">
        <el-col :span="24">
          <span>服务类型:</span>
          <el-select v-model="xz.leiXing" placeholder="Select" >
            <el-option
                v-for="item in xiala"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>


        <el-col :span="24" style="margin-top: 20px">
          <span>服务类型:</span>
          <el-select v-model="xz.leiXing" placeholder="Select" >
            <el-option
                v-for="item in xiala"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>




        <el-col :span="24" style="margin-top: 20px">
          <span>宣传图片:</span>
          <el-upload style="border: 1px red ridge"
              class="avatar-uploader"
              action="http://127.0.0.1:8000/file"
              :show-file-list="false"
              :on-success="fileImageYi"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl.img1" :src="imageUrl.img1" class="avatar"/>

            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <span>缩略图片:</span>
          <el-upload  style="border: 1px red ridge"
              class="avatar-uploader"
              action="http://127.0.0.1:8000/file"
              :show-file-list="false"
              :on-success="fileImageEr"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl.img2" :src="imageUrl.img2" class="avatar"/>

            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-col>



        <el-col :span="24" style="margin-top: 20px">
          <span>服务简介:</span>

          <el-input v-model="input" placeholder="请输入内容"     maxlength="30"></el-input>
        </el-col>


        <el-col :span="24" style="margin-top: 20px">
          <span>定价:</span>

          <el-input
              style="width: 40%"
              placeholder="定价"
              v-model="textarea"
          ></el-input>
          <el-tag type="danger">/次</el-tag>
        </el-col>


        <el-col :span="24" style="margin-top: 20px">
          <span>服务简介:</span>

          <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="30"
              show-word-limit
          />
        </el-col>

        <el-col :span="24" style="margin-top: 20px">
          <el-button type="success" @click="yes">确定</el-button>
        </el-col>


      </el-row>


    </el-drawer>
  </div>
</template>



<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>