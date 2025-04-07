// playground/main.js
import { createApp } from 'vue';
import App from './App.vue';
import MyComponents from '../src';
import '../src/styles/components/base.css'; // 引入全局基础样式
import '../src/styles/theme/variables.css'; // 引入主题变量

const app = createApp(App);
app.use(MyComponents);
app.mount('#app');