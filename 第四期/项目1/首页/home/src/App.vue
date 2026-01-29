<template>
  <router-view v-slot="{ Component }">
    <transition name="page-flip" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
/* 导入过渡动画样式 */
@import './assets/transitions.css';

/* 页面翻转动画 */
.page-flip-enter-active,
.page-flip-leave-active {
  transition: all 0.5s ease;
}

.page-flip-enter-from {
  opacity: 0;
  transform: perspective(1000px) rotateY(90deg);
}

.page-flip-leave-to {
  opacity: 0;
  transform: perspective(1000px) rotateY(-90deg);
}

/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #121212;
  color: #e0e0e0;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 3px;
}

::-webkit-scrollbar-track {
  background-color: #1e1e1e;
}
</style>