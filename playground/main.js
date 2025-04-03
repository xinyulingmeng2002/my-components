// playground/main.js
import { createApp } from 'vue'
import App from './App.vue'
import MyComponents from '../src/index.js'

const app = createApp(App)
app.use(MyComponents)
app.mount('#app')