import { reactive } from 'vue';

// src/config.js
const globalConfig = reactive({ // 默认主题
    size: 'medium',
    zIndex: 2000,
    theme: 'light'
})

export const useGlobalConfig = () => { // 提供全局配置
    return {
        config: globalConfig, // 响应式配置对象
        setConfig: (key, value) => { // 设置配置项 
            globalConfig[key] = value // 更新配置项
        }
    }
}