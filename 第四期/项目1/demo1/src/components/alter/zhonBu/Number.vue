<template>
  <div>
    <el-card shadow="always">
    <el-row :gutter="20">
      <el-col :span="8">
        <div>
          <el-statistic
              group-separator=","
              :precision="2"
              :value="value2"
              :title="title"
          ></el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-statistic title="今日访问量">
            <template slot="formatter">
              456/90
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-statistic
              group-separator=","
              :precision="2"
              decimal-separator="."
              :value="value1"
              :title="title2"
          >
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NumBer",
    data() {
      return {
        like: true,
        value1: 4154,
        value2: 1504,
        title: "累计访问",
        title2: "累计增长",
      };
    },
}
</script>

<style scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>