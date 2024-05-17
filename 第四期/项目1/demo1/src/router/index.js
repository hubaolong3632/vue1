//vue的路由插件
import VueRouter from "vue-router";
import Vue from "vue";
import ChatGptZhonBu from "@/components/invariant/ZhonBu/ChatGptZhonBu";
//加快初始启动速度路由懒加载
const FIleZhonBu       =()=>import( "@/components/invariant/ZhonBu/FIleZhonBu");
const PhoneZhonBu      =()=>import( "@/components/invariant/ZhonBu/PhoneZhonBu");
const AIImage          =()=>import( "@/components/alter/AI/AIImage");
const VoiceChar        =()=>import( "@/components/alter/AI/VoiceChar");
const ImageFast        =()=>import( "@/components/alter/AI/AIImage/ImageOrdelZuo/ImageFast");
const ImageAdvanced    =()=>import( "@/components/alter/AI/AIImage/ImageOrdelZuo/ImageAdvanced");

const IndexZhonBu=()=>import("@/components/invariant/ZhonBu/IndexZhonBu");
Vue.use(VueRouter) //加vue的路由插件

const router=new VueRouter({
    routes:[
        //首页
        {name:"IndexZhonBu",path:"/IndexZhonBu",component:IndexZhonBu},
        //文件
        {name:"FIleZhonBu",path:"/FIleZhonBu",component:FIleZhonBu},
        //
        {name:"PhoneZhonBu",path:"/PhoneZhonBu",component:PhoneZhonBu},
        //购物
        {name:"ChatGptZhonBu",path:"/ChatGptZhonBu",component:ChatGptZhonBu},
        //ai画图
        {name:"AIImage",path:"/AIImage",component:AIImage,children:[
           // 快速画图
           {name:"ImageFast",path:"/AIImage/ImageFast",component:ImageFast},
           //高级画图
           {name:"ImageAdvanced",path:"/AIImage/ImageAdvanced",component:ImageAdvanced},
           // 默认显示高级画图
           {path:"/",redirect:"/AIImage/ImageAdvanced"},
       ]},

        //语音聊天
        {path:"/VoiceChar",component:VoiceChar},


    //     //如果上面都不满足就会执行这里的代码
        {path:"*",component:IndexZhonBu},
    ],
    //这两个用来高亮显示当前选中的
    linkActiveClass: "active",
    linkExactActiveClass:"exact-active",
    //加上这个可以去掉#号 使用hash是带#的
    mode:"history"
});


//带? 问好表示可传可不传递
// const router=new VueRouter({
//     routes:[
//         //重定向
//         // {path:"/",redirect:"/YiView"},
//         {
//             name:"yi",path:"/YiView",component:YiView,
//             children:[ //二级字路由
//                 // {path:"/",redirect:"/YiView/s3?"},
//                 {name:"er",path:"/ErView/:canshu?",component:ErView},
//                 {name:"san",path:"/YiView/s3",component:SanView},
//             ],
//         },
//         //带：可以指定用rs风格的代码并且？表示可以没有参数
//         {name:"er",path:"/ErView/:canshu?",component:ErView},
//         {name:"san",path:"/SanView",component:SanView},
//
//         //如果上面都不满足就会执行这里的代码
//         {path:"*",component:ErView},
//     ],
//     //这两个用来高亮显示当前选中的
//     linkActiveClass: "active",
//     linkExactActiveClass:"exact-active",
//     //加上这个可以去掉#号 使用hash是带#的
//     mode:"history"
//
//
// });

export  default router