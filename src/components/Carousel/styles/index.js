import './base.css'
import './transitions.css'

// 导出样式变量配置
export const themeVariables = {
  arrowColor: 'var(--arrow-color)',
  indicatorColor: 'var(--indicator-color)',
  indicatorActiveColor: 'var(--indicator-active-color)'
}

// 可选：提供修改主题的方法
export function setThemeVariables(variables) {
  const root = document.documentElement
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })
}