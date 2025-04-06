// src/styles/theme/manager/theme-manager.js
import { ref, watch } from 'vue'

const STORAGE_KEY = 'mc-theme'
const THEME_ATTRIBUTE = 'data-theme'

// 主题配置
export const themes = {
    light: 'default',
    dark: 'dark'
}

// 创建响应式主题状态
const currentTheme = ref(localStorage.getItem(STORAGE_KEY) || 'light')
const themeListeners = new Set()

// 系统主题检测
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// 应用主题
export function applyTheme(themeName, skipStorage = false) {
    const theme = themes[themeName] || themes.light

    // 更新响应式状态
    currentTheme.value = themeName

    // 应用到DOM
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)

    // 持久化存储
    if (!skipStorage) {
        localStorage.setItem(STORAGE_KEY, themeName)
    }

    // 通知监听器
    themeListeners.forEach(listener => listener(themeName))
}

// 获取当前主题
export function getCurrentTheme() {
    return currentTheme.value
}

// 切换主题
export function toggleTheme() {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    applyTheme(newTheme)
}

// 添加主题变化监听器
export function addThemeChangeListener(listener) {
    themeListeners.add(listener)
    return () => themeListeners.delete(listener)
}

// 初始化主题系统
export function initThemeSystem() {
    // 设置初始主题
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    if (savedTheme) {
        applyTheme(savedTheme)
    } else {
        // 如果没有保存的主题，使用系统主题
        applyTheme(prefersDark.matches ? 'dark' : 'light', true)
    }

    // 监听系统主题变化
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light', true)
        }
    })

    // 监听主题变化并应用过渡效果
    watch(currentTheme, () => {
        document.documentElement.classList.add('theme-transition')
        requestAnimationFrame(() => {
            document.documentElement.classList.remove('theme-transition')
        })
    })
}