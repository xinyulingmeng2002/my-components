// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import componentLibrary from './index.js' // 组件库入口
import { applyTheme } from './styles/theme/index.js'; // Correct relative path

// 创建应用实例
const app = createApp(App)

// 初始化默认主题
applyTheme('light')

// 安装组件库

// (async() => {
//     try {
//         // 异步加载组件库
//         await componentLibrary.install(app)

//         // 挂载应用
//         app.mount('#app')
//     } catch (error) {
//         console.error('组件库初始化失败:', error)
//             // 可添加错误上报逻辑
//     }
// })()
componentLibrary.install(app)
app.mount('#app')