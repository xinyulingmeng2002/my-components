// src/theme/theme-manager.js
export const themes = {
    light: {
      '--primary-color': '#409eff',
      '--bg-color': '#b85454'
    },
    dark: {
      '--primary-color': '#3375b9',
      '--bg-color': '#1a1a1a'
    }
  }
  
  export function applyTheme(themeName) {
    const theme = themes[themeName] || themes.light
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }
  
