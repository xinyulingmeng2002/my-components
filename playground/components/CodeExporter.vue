<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    default: 'component-code'
  }
})

const exportCode = () => {
  const blob = new Blob([props.code], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.fileName}.vue`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <button @click="exportCode" class="export-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    导出代码
  </button>
</template>

<style scoped>
.export-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.export-button:hover {
  background-color: #e0e0e0;
}

.export-button svg {
  width: 16px;
  height: 16px;
}
</style>
