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
import { defineOptions } from 'vue'
import { formatSize } from '../../../utils/helpers'
import { computed } from 'vue'

/**
 * 通用按钮组件
 * @displayName Button
 * @example
 * <Button type="primary" size="medium" @click="handleClick">
 *   点击我
 * </Button>
 */
defineOptions({
  name: 'Button'
})

defineProps({
  /**
   * 按钮类型
   * @type {'primary'|'secondary'}
   * @default 'primary'
   * @example 'primary' // 主要按钮
   * @example 'secondary' // 次要按钮
   */
  type: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value)
    }
  },
  /**
   * 按钮尺寸
   * @type {'small'|'medium'|'large'}
   * @default 'medium'
   * @example 'small' // 小尺寸
   * @example 'large' // 大尺寸
   */
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  }
})

/**
 * 点击事件
 * @event click
 * @type {Event}
 */
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