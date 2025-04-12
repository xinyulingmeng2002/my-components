<script setup>
import { ref } from 'vue'
import { useTheme } from '../../src/styles/theme/manager/theme-manager'

const theme = useTheme()
const currentTheme = ref(theme.currentTheme)

const themes = [
  { name: '浅色', value: 'light' },
  { name: '深色', value: 'dark' },
  { name: '系统', value: 'system' }
]

const changeTheme = (newTheme) => {
  theme.setTheme(newTheme)
  currentTheme.value = newTheme
}
</script>

<template>
  <div class="theme-switcher">
    <label v-for="t in themes" :key="t.value" class="theme-option">
      <input 
        type="radio" 
        :value="t.value" 
        v-model="currentTheme"
        @change="changeTheme(t.value)"
      >
      {{ t.name }}
    </label>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

input[type="radio"] {
  margin: 0;
}
</style>
