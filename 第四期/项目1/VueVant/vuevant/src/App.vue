<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {Button} from 'vant';
import {ref} from "vue";
import { showNotify  } from 'vant';
import 'vant/es/notify/style';

// Notify('通知内容');
const show = ref(false);

showNotify ({ type: 'success', message: '通知内容' });

const showNotify = () => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 2000);
};

const username = ref('');
const password = ref('');



const VanNotify = Notify.Component;
const onSubmit = (values) => {
  console.log('submit', values);
};

const ss2 = () => {
};

</script>

<template>

  <van-button type="primary" text="组件调用" @click="showNotify" />
  <VanNotify v-model:show="show" type="success">
  <van-icon name="bell" style="margin-right: 4px;" />
  <span>111</span>
  </VanNotify>




  <van-button square type="primary" @click="ss2()">方形按钮</van-button>
  <van-button round type="sucess">圆形按钮</van-button>
  <br>

  <van-button type="danger">危险按钮</van-button>

  <br>


  <van-row>
    <van-col span="8"><van-button type="primary">主要按钮</van-button></van-col>
    <van-col span="8"> <van-button type="success">成功按钮</van-button></van-col>
    <van-col span="8"><van-button type="default">默认按钮</van-button></van-col>
  </van-row>


  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>





<!--  <RouterView />-->
</template>

<style scoped>


</style>
