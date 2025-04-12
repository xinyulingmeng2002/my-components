<template>
  <div 
    class="mc-carousel"
    tabindex="0"
    role="region" 
    aria-label="图片轮播"
    aria-roledescription="carousel"
    :aria-busy="isTransitioning"
    @mouseenter="pause" 
    @mouseleave="startAutoPlay"
    @keydown="handleKeyDown"
    @focus="hasFocus = true"
    @blur="hasFocus = false"
  >
    <div 
      class="mc-carousel__inner" 
      :class="[
        `mc-carousel__inner--${transition}`,
        { 'is-dragging': isDragging }
      ]"
    >
      <slot></slot>
    </div>
    <Arrows 
      v-if="showArrows" 
      :disabled="!loop && activeIndex === 0" 
      direction="prev" 
      @click="prev" 
    />
    <Arrows 
      v-if="showArrows" 
      :disabled="!loop && activeIndex === items.length - 1" 
      direction="next" 
      @click="next" 
    />
    <Indicators 
      v-if="showIndicators"
      :count="items.length" 
      :activeIndex="activeIndex" 
      :position="indicatorPosition" 
      @change="setActiveIndex" 
    />
  </div>
</template>

<script setup>
import { defineOptions, ref, reactive, onMounted, onUnmounted, watch, provide } from 'vue'
import CarouselItem from './CarouselItem.vue'
import Arrows from './Arrows.vue'
import Indicators from './Indicators.vue'

/**
 * 轮播图组件
 * @displayName Carousel
 * @example
 * <Carousel :interval="3000" transition="slide">
 *   <CarouselItem v-for="item in items" :key="item.id">
 *     <img :src="item.image" />
 *   </CarouselItem>
 * </Carousel>
 */
defineOptions({
  name: 'Carousel'
})

const props = defineProps({
  /**
   * 自动播放间隔时间(毫秒)
   * @type {number}
   * @default 3000
   * @validator 必须大于等于0
   */
  interval: {
    type: Number,
    default: 3000,
    validator: (value) => value >= 0
  },
  
  /**
   * 是否自动播放
   * @type {boolean}
   * @default true
   */
  autoplay: {
    type: Boolean,
    default: true
  },
  
  /**
   * 是否显示导航箭头
   * @type {boolean}
   * @default true
   */
  showArrows: {
    type: Boolean,
    default: true
  },
  
  /**
   * 是否显示指示器
   * @type {boolean}
   * @default true
   */
  showIndicators: {
    type: Boolean,
    default: true
  },
  
  /**
   * 指示器位置
   * @type {'top'|'bottom'|'left'|'right'}
   * @default 'bottom'
   */
  indicatorPosition: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  
  /**
   * 过渡效果
   * @type {'slide'|'fade'}
   * @default 'slide'
   */
  transition: {
    type: String,
    default: 'slide',
    validator: (value) => ['slide', 'fade'].includes(value)
  },
  
  /**
   * 是否循环播放
   * @type {boolean}
   * @default true
   */
  loop: {
    type: Boolean,
    default: true
  },
  
  /**
   * 自定义高度
   * @type {string}
   * @default '300px'
   */
  height: {
    type: String,
    default: '300px'
  },
  
  /**
   * 宽高比(格式: "16/9")
   * @type {string}
   * @default '16/9'
   */
  aspectRatio: {
    type: String,
    default: '16/9'
  }
})

// 定义事件
const emit = defineEmits(['change', 'update:active']) // 定义组件实例

const activeIndex = ref(0)
const items = reactive([])
const timer = ref(null)
const hasFocus = ref(false)
const isTransitioning = ref(false)
const isDragging = ref(false)

// 触摸相关状态
const touchStart = ref(0)
const touchDelta = ref(0)

// 屏幕阅读器提示
const announce = (index) => { // 通知屏幕阅读器
  const liveRegion = document.getElementById('mc-carousel-live-region')
  if (liveRegion) {
    liveRegion.textContent = `当前显示第 ${index + 1} 张图片，共 ${items.length} 张`
  }
}

const handleKeyDown = (e) => {
  if (items.length === 0) return
  
  switch(e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      prev()
      break
    case 'ArrowRight':
      e.preventDefault()
      next()
      break
    case 'Home':
      e.preventDefault()
      setActiveIndex(0)
      announce(0)
      break
    case 'End':
      e.preventDefault()
      setActiveIndex(items.length - 1)
      announce(items.length - 1)
      break
  }
}

const registerItem = (item) => {
  if (!items.includes(item)) {
    items.push(item)
    activeIndex.value = activeIndex.value
  }
}

const unregisterItem = (item) => {
  const index = items.indexOf(item)
  if (index !== -1) {
    items.splice(index, 1)
  }
}

const setActiveIndex = (index) => {
  if (!props.loop && (index < 0 || index >= items.length)) {
    return
  }
  
  isTransitioning.value = true
  activeIndex.value = index
  emit('change', index)
  emit('update:active', index)
  announce(index)
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}

const startAutoPlay = () => {
  if (props.autoplay && items.length > 1) {
    pause()
    timer.value = setInterval(() => {
      if (activeIndex.value === items.length - 1 && !props.loop) {
        setActiveIndex(0)
      } else {
        next()
      }
    }, props.interval)
  }
}

const pause = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const prev = () => {
  if (activeIndex.value === 0) {
    if (props.loop) {
      setActiveIndex(items.length - 1)
    }
  } else {
    setActiveIndex(activeIndex.value - 1)
  }
}

const next = () => {
  if (activeIndex.value === items.length - 1) {
    if (props.loop) {
      setActiveIndex(0)
    }
  } else {
    setActiveIndex(activeIndex.value + 1)
  }
}

// 触摸事件处理
const handleTouchStart = (e) => {
  touchStart.value = e.touches[0].clientX
  isDragging.value = true
  pause()
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  touchDelta.value = e.touches[0].clientX - touchStart.value
}

const handleTouchEnd = () => { // 触摸结束
  isDragging.value = false
  const threshold = 50 // 滑动阈值

  if (Math.abs(touchDelta.value) > threshold) {
    if (touchDelta.value > 0) {
      prev()
    } else {
      next()
    }
  }

  touchDelta.value = 0
  startAutoPlay()
}

watch(() => props.autoplay, (newValue) => {
  if (newValue) {
    startAutoPlay()
  } else {
    pause()
  }
})

onMounted(() => {
  startAutoPlay()
  // 添加屏幕阅读器实时区域
  if (!document.getElementById('mc-carousel-live-region')) {
    const liveRegion = document.createElement('div')
    liveRegion.id = 'mc-carousel-live-region'
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.style.position = 'absolute'
    liveRegion.style.left = '-9999px'
    document.body.appendChild(liveRegion)
  }
})

onUnmounted(() => {
  pause()
  const liveRegion = document.getElementById('mc-carousel-live-region')
  if (liveRegion) {
    liveRegion.remove()
  }
})

provide('carousel', {
  registerItem,
  unregisterItem,
  setActiveIndex,
  activeIndex,
  items: reactive(items),
  transition: props.transition,
  aspectRatio: props.aspectRatio,
  height: props.height
})
</script>

<style>
.mc-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  outline: none;
  touch-action: pan-y pinch-zoom;
}

.mc-carousel:focus-visible {
  box-shadow: 0 0 0 2px var(--mc-primary-color, #1890ff);
}

.mc-carousel__inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

/* 响应式容器 */
.mc-carousel__inner {
  position: relative;
  width: 100%;
}

/* 支持固定高度或宽高比 */
.mc-carousel__inner[style*="aspect-ratio"] {
  height: auto;
}

.mc-carousel__inner--slide {
  transition: transform 0.3s ease-in-out;
}

.mc-carousel__inner--fade {
  transition: opacity 0.3s ease-in-out;
}

.mc-carousel__inner.is-dragging {
  transition: none;
}

/* 移动端优化 */
@media (hover: none) {
  .mc-carousel__inner {
    cursor: grab;
  }
  
  .mc-carousel__inner.is-dragging {
    cursor: grabbing;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .mc-carousel {
    --mc-primary-color: #177ddc;
  }
}
</style>