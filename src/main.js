// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import componentLibrary from './index.js'
import { applyTheme } from './styles/theme/index.js'

async function initializeApp() {
  try {
    // 创建应用实例
    const app = createApp(App)
    
    // 初始化默认主题
    applyTheme('light')
    
    // 安装路由
    app.use(router)
    
    // 安装组件库
    await componentLibrary.install(app)
    
    // 挂载应用
    app.mount('#app')
    
  } catch (error) {
    console.error('应用初始化失败:', error)
    // 可以添加错误上报或用户提示
    document.getElementById('app').innerHTML = `
      <div style="padding: 20px; color: red;">
        <h2>应用初始化失败</h2>
        <p>${error.message}</p>
        <p>请刷新页面或联系管理员</p>
      </div>
    `
  }
}

// 启动应用
initializeApp()