<template>
  <div>
    1.第一个界面 传递参数为:{{id}}直接拿到参数为：{{$route.query.id}}


    <router-link to="/YiView/s3?id=1">第三个</router-link>

<!--    二级路由-->
    <router-view>      </router-view>
  </div>
</template>

<script>

export default {
  name: "YiView",
  data(){
    return {
      id:"222"
    }

  },
 created() {
  this.id=  this.$route.query.id

  }, mounted() {
    // console.log(hm)
  },
}
</script>

<style scoped>

</style>