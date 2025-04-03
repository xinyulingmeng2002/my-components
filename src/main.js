import { createApp } from 'vue'
// import MyComponents from './index.js';
import App from './App.vue';
import  install  from './index.js'

const app = createApp(App);
await install(app);

// app.use(MyComponents)

app.mount('#app')
// createApp().use(MyComponents)