<template>
  <button 
    class="carousel-arrow" 
    :class="[`carousel-arrow-${direction}`, { disabled }]" 
    :disabled="disabled" 
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <svg 
      class="arrow-icon" 
      viewBox="0 0 24 24" 
      :style="{ transform: direction === 'next' ? 'rotate(180deg)' : 'none' }"
    >
      <path 
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"  
        fill="currentColor"
      />
    </svg>
  </button>
</template>

<script setup>
import { defineOptions, computed } from 'vue'

defineOptions({
  name: 'CarouselArrows'
})

const props = defineProps({
  disabled: {  // 注释：禁用属性，默认为 false
    type: Boolean,
    default: false
  },
  direction: {  // 注释：方向属性，prev 表示上一张，next 表示下一张
    type: String,
    required: true,
    validator: (value) => ['prev', 'next'].includes(value)
  }
})

const emit = defineEmits(['click']) // 注释：定义点击事件

const ariaLabel = computed(() =>  // 注释：计算属性，动态设置 aria-label 属性
  props.direction === 'prev' ? '上一张' : '下一张'
)

const onClick = () => {
  if (!props.disabled) {  // 注释：如果未禁用，则触发点击事件
    emit('click')
  }
}
</script>

<style scoped>
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--mc-carousel-arrow-bg);
  color: var(--mc-carousel-arrow-color);
  border: 1px solid var(--mc-border-light);
  border-radius: 50%;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 10;
  transition: all var(--mc-transition-duration) ease;
  outline: none;
  box-shadow: var(--mc-shadow-sm);
}

.carousel-arrow:hover:not(.disabled) {
  transform: translateY(-50%) scale(1.1);
  background-color: var(--mc-primary-color);
  color: white;
  box-shadow: var(--mc-shadow-md);
}

.carousel-arrow:active:not(.disabled) {
  transform: translateY(-50%) scale(0.95);
}

.carousel-arrow-prev {
  left: 16px;
}

.carousel-arrow-next {
  right: 16px;
}

.carousel-arrow.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: var(--mc-bg-color);
  pointer-events: none;
}

.arrow-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

/* 焦点状态 */
.carousel-arrow:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

/* 触摸设备优化 */
@media (hover: none) {
  .carousel-arrow {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>