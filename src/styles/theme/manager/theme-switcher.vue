<script setup>
import { ref } from 'vue'
import { applyTheme, getCurrentTheme } from './theme-manager'

const currentTheme = ref(getCurrentTheme()) // 注释：当前主题

const switchTheme = () => { // 注释：切换主题
  // 注释：切换主题 逻辑处理部分
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark' // 注释：判断当前主题并切换
  // 注释：应用新主题
  applyTheme(newTheme)
  currentTheme.value = newTheme
}
</script>

<template>
  <button 
    class="theme-switcher"
    @click="switchTheme"
    :aria-label="`切换主题，当前主题：${currentTheme}`" 
    :title="`切换主题，当前主题：${currentTheme}`"  
  >
    {{ currentTheme === 'dark' ? '🌙' : '☀️' }}
  </button>
</template>

<style scoped>
.theme-switcher {
  padding: 8px;
  border-radius: var(--my-border-radius-base);
  background: var(--my-bg-color);
  border: 1px solid var(--my-border-color);
  cursor: pointer;
  transition: all var(--my-transition-duration);
}

.theme-switcher:hover {
  transform: scale(1.1);
}
</style>