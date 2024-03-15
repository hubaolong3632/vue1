<script setup>

import { ref } from 'vue'
const drawer = ref(false)
</script>

<template>

  <div class="common-layout">
<!--    style="width: 100vw;height: 100vh"-->
    <el-container style="height: 100vh">
      <el-header style="background-color: rgba(255,0,0,0.27)">Header</el-header>
      <el-container style="background-color: rgba(0,255,51,0.35)">
        <el-aside width="200px"  style="background-color: rgba(255,0,213,0.24)">Aside</el-aside>
        <el-main style="background-color: rgba(255,47,0,0.3)">

          <el-alert title="Success alert" type="success" show-icon />

          <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
            open
          </el-button>

          <el-drawer v-model="drawer" title="I am the title" :with-header="false" style="background-color: red">
              <br>asdasd
              <br>
              <br>
            <div >sasdasdas</div>
              <br>
              <br>
          </el-drawer>

        </el-main>
      </el-container>
    </el-container>
  </div>
  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>


  <div style="margin-top: 100vh">
  </div>
</template>



<style scoped>

</style>