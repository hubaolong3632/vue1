<template>
  <van-button type="primary">主要按钮</van-button>
  <van-button type="success">成功按钮</van-button>
  <van-button type="default">默认按钮</van-button>
  <van-button type="danger">危险按钮</van-button>
  <van-button type="warning">警告按钮</van-button>

  <van-button type="primary" text="组件调用" @click="no" />
  <van-notify v-show="show" type="success">
    <van-icon name="bell" style="margin-right: 4px;" />
    <span>通知内容</span>
  </van-notify>

</template>

<style scoped>

</style>

<script setup>
import {closeNotify, showNotify} from 'vant';
import {ref} from 'vue';
import { Button } from 'vant';

const show = ref(false);

const no = () => {
  showNotify('1');
};

</script>
