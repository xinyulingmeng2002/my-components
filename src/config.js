import { reactive } from 'vue';

// src/config.js
const globalConfig = reactive({
    size: 'medium',
    zIndex: 2000,
    theme: 'light'
})

export const useGlobalConfig = () => {
    return {
        config: globalConfig,
        setConfig: (key, value) => {
            globalConfig[key] = value
        }
    }
}