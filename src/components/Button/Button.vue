<template>
  <button 
    :class="['button', `type-${type}`, `size-${size}`]"
    @click="$emit('click', $event)"
    class="component"
    :style="{ fontSize ,backgroundColor: 'var(--bg-color)'}"
  >
    <slot></slot>
    <!-- 组件内容 -->
  </button>
</template>


<script setup>
import { formatSize } from '@/utils/helpers'
import { computed } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  }
})

defineEmits(['click'])

const fontSize = formatSize(13)  // 获取字体大小
</script>

<style scoped>
.button {
  font-size: var(--base-font-size);
  padding: var(--space-sm) var(--space-md);
  border-radius: 4px;
  background-color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s;
}

.button:hover {
  opacity: 0.8;
}

.component {
  color: var(--primary-color);
  transition: background-color 0.3s;
}

.type-primary {
  background-color: #409eff;
  color: white;
}

.size-medium {
  padding: 8px 16px;
  font-size: 14px;
}
</style>