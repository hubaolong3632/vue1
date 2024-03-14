<template>
<div>
  <elementUI></elementUI>
  <LoginV1></LoginV1>
</div>
</template>

<script>
import LoginV1 from './components/LoginV1.vue';
import elementUI from './components/elementUI.vue';


export default {
  name: 'App',
  components: {
    LoginV1,elementUI
  }
}
</script>

<style>

</style>
