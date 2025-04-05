import { createApp } from 'vue'
// import MyComponents from './index.js';
import App from './App.vue';
import install from './index.js'

const app = createApp(App);
(async() => {
    await install(app);
    app.mount('#app');
})();

// app.use(MyComponents)
// createApp().use(MyComponents)