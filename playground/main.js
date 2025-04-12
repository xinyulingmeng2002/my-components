import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import componentLibrary from '../src'
import { applyTheme } from '../src/styles/theme/index.js'
import '../src/styles/components/base.css'
import '../src/styles/theme/variables.css'

async function initializePlayground() {
  try {
    const app = createApp(App)
    
    // 初始化默认主题
    applyTheme('light')
    
    // 安装路由
    app.use(router)
    
    // 安装组件库
    await componentLibrary.install(app)
    
    // 挂载应用到playground容器
    app.mount('#playground')
    
  } catch (error) {
    console.error('Playground初始化失败:', error)
    document.getElementById('playground').innerHTML = `
      <div style="padding: 20px; color: red;">
        <h2>Playground初始化失败</h2>
        <p>${error.message}</p>
      </div>
    `
  }
}

initializePlayground()