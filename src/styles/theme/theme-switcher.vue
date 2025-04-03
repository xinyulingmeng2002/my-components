<script setup>
import { ref } from 'vue'
import { applyTheme } from '../theme/theme-manager'

const currentTheme = ref('light')

const switchTheme = (theme) => {
  currentTheme.value = theme
  applyTheme(theme)
}
</script>

<template>
  <div class="theme-switcher">
    <button 
      v-for="(_, theme) in themes"
      :key="theme"
      @click="switchTheme(theme)"
      :class="{ active: currentTheme === theme }"
    >
      {{ theme }} 主题
    </button>
  </div>
</template>