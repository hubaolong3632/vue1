import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// 1 引入组件样式
import 'vant/lib/index.css';

//h5 rem适配
import 'amfe-flexible/index.js'
import { ConfigProvider } from 'vant';

// 2. 引入你需要的组件
import Vant from 'vant';



import { Notify } from 'vant';
const app = createApp(App);
app.use(Notify);

app.use(router)
app.use(Vant)
app.use(ConfigProvider);


app.mount('#app')

