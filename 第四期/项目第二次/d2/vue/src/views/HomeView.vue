<script setup>
import {ref,defineEmits,defineProps,onMounted} from "vue";
import SanV3 from "@/views/SanV3.vue";
console.log("如果想要一开始就执行就放在这里")


//mounted 生命周期  逻辑一
onMounted(()=>{
  console.log("onMounted")

})


//mounted 生命周期 逻辑二
onMounted(()=>{
  console.log("direge")

})
console.log("放在这里也比onMounted快")



//子父传递
let props=defineProps({
  cat:String,
  ziData:'',
})
console.log("内容",props.cat)
console.log("内容2:",props.ziData)

let data=ref({
    message:"我是子类的事件",
    xx:1
})


let emit=defineEmits(['fatcherEmit'])
//父类传递
let fatcherEmit=()=>{
  emit('fatcherEmit',data);
}

let refXuanrang=ref(null); //通过这个拿到ref元素 但是refXuanrang名字必须和下面的一样
onMounted(()=>{
  console.log("导入ref：:",refXuanrang.value)
})


// defineExpose({ //不知得为啥，传输不出去
//   data,fatcherEmit
// })

</script>

<template>
  <main>
    <div style="padding: 300px;border: 1px #f700ff ridge;width: 50vw">
     <router-view></router-view>
    </div>

    <div style="padding: 300px;border: 1px red ridge;width: 50vw">
      <SanV3></SanV3>

      <div ref="refXuanrang">我是动态渲染的东西</div>
      <div>我是子组件:{{props.cat}}</div>
      <div>我是子组件传对象:{{props.ziData}}</div>
      <button @click="fatcherEmit()">操作父类</button>
      <router-link to="/luyou">路由一</router-link>
      <router-link to="/luyou/c1">路由二</router-link>
    </div>


  </main>
</template>
