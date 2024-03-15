<!--setup 加这个允许直接在script中编写组合式API-->
<script setup>
import {computed, onMounted, provide, reactive, ref, watch} from "vue";
import HomeView from '@/views/HomeView.vue'
import ElemtUI from "@/views/ElemtUI.vue";

// let c1=ref(0); //如果是普通类型需要响应
let c1=ref({
  count:100
}); //如果是普通类型需要响应

let state=reactive({ //当然推荐用上门的
   count:100
})

let list=ref([1,2,3,4,5,6])
let cs3=ref({
  name:"张三",age:14
})


let message="this is nameasdasd"
let logMessage=()=>{
  state.count++;
  c1.value.count++;
  list.value[0]=111;
}




watch([c1.value,list],(xing,jiu)=>{
      console.log("新的为：",xing,"    旧的为",jiu)
},{
    immediate:true,//一进界面立即执行
    deep:true //深度监视只要数据发生改变就箭头  尤其是ref如果不加这个只可以监听简单类型

})

watch( //与是相当于深度监听
    ()=>cs3.value.name,
    ()=>{
        console.log("姓名进行了修改")
    }
)


let c1List=computed(()=>{ //计算属性
  return list.value.filter(item=>item>2)

})




let ziData=ref({
  name:"张三",
  password:'123456'
})

let data1=ref();
let fatcherEmit=(time)=>{
  data1.value=time.value
      console.log("接收到子类数据:",time.value)
}

let homeV3=ref();
onMounted(()=>{

})
let cs=()=>{
  console.log("子组件的ref输出内容:",homeV3)
}

//选项式

//三级传输 给子类的子类接收

let sanji=ref({
  name:"第三级传递",
  password:'我是传递的内容'
})
provide("sanji",sanji); //传递动态数据在这里就得传输,



let cs4=()=>{
  sanji.value.name="第三级传递:数据修改"
  provide("sanji",sanji); //传递动态数据在这里就得传输,

}


onMounted(()=>{
  console.log("渲染之后的数据：",sanji.value)
  // provide("sanji",sanji); //传递动态数据在这里就得传输,

})



</script>

<template>
<ElemtUI></ElemtUI>
  <HomeView ref="homeV3" cat="宝马车" :ziData="ziData" @fatcherEmit="fatcherEmit"></HomeView>

  <div>
    <div>{{c1.count}}</div>
    <br>
    <div>{{list}}</div>
    <div>{{c1List}}</div>
    <div>子类数据{{data1}}</div>

    <br>
    <br>
    <button @click="logMessage()">修改测试</button>
    <button @click="cs()">子内容测试</button>
    <button @click="cs4()">子类的子类传输数据内容测试</button>

  </div>

</template>

<style scoped>

</style>
