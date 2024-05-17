//导入核心包
import Vue from 'vue'

//导入app.vue根组件
import App from './App.vue'
import TouBu from './components/invariant/TouBu'

import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
// import 'bootstrap/dist/js/bootstrap.min.js' //引用bootstrap的js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";

//引入高亮  不同的类型引入不同的对象
import VueHighlightJS from 'vue-highlightjs'

// import 'highlight.js/styles/androidstudio.css'
import 'highlight.js/styles/atom-one-dark.css'


Vue.use(VueHighlightJS)

//导入函数
import hljs from 'highlight.js';

//全局注册指令 hljs
Vue.directive('hljs', {
    // inserted 钩子在绑定元素插入到父节点时调用
    inserted: function(el) {
        let blocks = el.querySelectorAll('pre code');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
        console.log("xxxxxxxxxxxxxxx")
    }
});

//告诉当前是什么环境如果是true代表生成生产环境 为false就是开发环境
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.component('TouBu',TouBu) //全局注册组件

//全局注册指令 v-f1_s
Vue.directive('f1_s',{
    inserted(el,binding){
        el.style.color="red";
    },
    update(el,binding){
        el.style.backgroundColor=binding.value;
    }
})

//执行滚动定位到当前元素
Vue.directive('focus_1',{
    inserted(el,binding){
        let targetDivPosition = el.getBoundingClientRect().top;
        window.scrollTo(0, targetDivPosition);
    }
})

//执行滚动触发添加
Vue.directive('roll_1',{
    inserted(el, binding) {
        function scrollHandler() {
            if (isElementInViewport(el)) {
                for(let zi of el.children){
                    zi.style.removeProperty('display');
                }
                el.classList.add(binding.value);
                window.removeEventListener('scroll', scrollHandler);
            }
        }

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
    render: h => h(App),
    router,
    ElementUI
}).$mount('#app')