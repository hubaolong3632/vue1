
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import persist from "pinia-plugin-persistedstate"


import TDesign from 'tdesign-vue-next';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';


const app = createApp(App)


// 导入的时候顺便导入持久化插件
app.use(createPinia().use(persist))
app.use(router)
app.use(TDesign)

app.mount('#app')
