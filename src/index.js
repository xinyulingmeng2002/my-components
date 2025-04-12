// src/index.js
import { importComponentFiles } from './utils/auto-import.js'
import { applyTheme, ThemeSwitcher } from './styles/theme/index.js'
import { useGlobalConfig } from './config'

// 导入全局样式
import './styles/components/base.css'
import './styles/components/carousel.css'

let isInstalled = false
let globalConfigProvided = false

const install = async(app) => {
    if (isInstalled) return
    isInstalled = true

    // 1. 自动注册组件
    const components = importComponentFiles()
    components.forEach(component => {
        if (component.name) {
            app.component(component.name, component)
        }
    })

    // 2. 注册主题切换组件
    app.component('ThemeSwitcher', ThemeSwitcher)

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