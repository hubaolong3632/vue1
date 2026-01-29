import { createApp } from 'vue';
import { Notify } from 'vant';
import Vant from 'vant';
import App from './App.vue';
// 1 引入组件样式
import 'vant/lib/index.css';
const app = createApp(App);
app.use(Notify);
app.use(Vant);

app.mount('#root');
