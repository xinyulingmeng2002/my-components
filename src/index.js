// src/index.js
import { importComponentFiles } from './utils/auto-import.js'
import { applyTheme, ThemeSwitcher } from './styles/theme/index.js'
import { useGlobalConfig } from './config.js'

// 导入全局样式
import './styles/components/base.css'
import './styles/components/carousel.css'

let isInstalled = false // 是否安装
let globalConfigProvided = false // 全局配置是否提供

// 安装方法
const install = async(app) => {
    if (isInstalled) return
    isInstalled = true

    // 1. 自动注册组件
    const components = importComponentFiles()
    components.forEach(component => {
        if (component.name) {
            app.component(component.name, component)
            // console.log(`✅ 注册组件: ${component.name}`)
        }
    })

    // 2. 注册主题切换组件
    app.component('ThemeSwitcher', ThemeSwitcher)
    // console.log(app._context.components['ThemeSwitcher'] ? '已注册' : '未注册');
    // console.log('ThemeSwitcher 注册成功');

    
    // 3. 提供全局配置
    if (!globalConfigProvided) {
        app.provide('globalConfig', useGlobalConfig())
        globalConfigProvided = true
    }
}

// 导出安装方法和工具
export {
    applyTheme,
    ThemeSwitcher,
    install
}

// 默认导出安装方法
export default { install }