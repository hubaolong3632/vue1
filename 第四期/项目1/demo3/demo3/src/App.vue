<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <router-view/>
</template>

<style scoped>

@media screen and (orientation: portrait) {
  body {
    transform-origin: 0 0;
    transform: rotateZ(90deg) translateY(-100%);
  }
}
</style>
