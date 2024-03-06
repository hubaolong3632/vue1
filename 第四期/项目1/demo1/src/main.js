//导入核心包
import Vue from 'vue'

//导入app.vue根组件
import App from './App.vue'
import TouBu from './components/invariant/TouBu'
// import ZhonBu from './components/invariant/ZhonBu'



import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
import 'bootstrap/dist/js/bootstrap.min.js' //引用bootstrap的js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";





//引入高亮  不同的类型引入不同的对象
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/idea.css'
Vue.use(VueHighlightJS)






//告诉当前是什么环境如果是true代表生成生产环境 为false就是开发环境
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.component('TouBu',TouBu) //全局注册组件

//提供render方法 基于app。vue创建结构渲染index.html







//修改路由方法
// const originalPush = Vue.prototype.push
// Vue.prototype.push = function push (location) {
//     return originalPush.call(this, location).catch(err => err)
// }


//全局注册指令 v-f1_s  这样子使用
Vue.directive('f1_s',{
    //这个会在指令所在云速被插入到界面时候触发
    // el是当前这个组件 binding 代表的是我放入的内容
    inserted(el,binding){  //一开始就执行的方法
        console.log("元素：",el)
        el.style.color="red";
        console.log("全部内容：",binding)
        console.log("文本内容：",binding.value)
      // el.focus() //给注册当前指令的组件增加获取焦点功能
    },
    update(el,binding){ //当指令值被修改的时候触发，提供编号后，dom更新的逻辑
      // console.log("元素：",el)
      el.style.backgroundColor=binding.value;
    }
})


//执行滚动定位到当前元素
Vue.directive('focus_1',{
    inserted(el,binding){
        console.log(el)
            // let targetDivPosition = targetDiv.getBoundingClientRect().top-400;
            let targetDivPosition = el.getBoundingClientRect().top;
            // 自动滚动到目标元素的位置
            window.scrollTo(0, targetDivPosition);

    }
})



//执行滚动触发添加
Vue.directive('roll_1',{
    inserted(el, binding) {
        function scrollHandler() {
            if (isElementInViewport(el)) {
                // console.log("你好啊啊啊",binding.value)

                //将所有子属性的隐藏关掉
                for(let zi of el.children){
                    zi.style.removeProperty('display');
                }
                el.classList.add(binding.value); // 添加带动画效果的类
                window.removeEventListener('scroll', scrollHandler); // 移除当前滚动事件监听
            }
        }

        //查找到当前是否在此位置
        function isElementInViewport(el) {
            let rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        window.addEventListener('scroll', scrollHandler);
    }
})




new Vue({
  // el:"#app", 和下面哪个一样.$mount('#app')这个作用一致
  render: h => h(App), //基于app去创建 结构
  router, //注入到vue里面
  // render:(createElement) =>{ 更具上面进行渲染
  //   return createElement(App)
  // }
    ElementUI

}).$mount('#app')
