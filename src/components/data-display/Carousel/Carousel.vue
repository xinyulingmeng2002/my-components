<template>
  <div 
    class="carousel"
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
    <div class="carousel-inner" :class="props.transition">
      <slot></slot>
    </div>
    <Arrows 
      v-if="showArrows" 
      :disabled="false" 
      direction="prev" 
      @click="prev" 
    />
    <Arrows 
      v-if="showArrows" 
      :disabled="false" 
      direction="next" 
      @click="next" 
    />
    <Indicators 
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

defineOptions({
  name: 'Carousel'
})

const props = defineProps({
  interval: {
    type: Number,
    default: 3000,
    validator: (value) => value >= 0
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  showArrows: {
    type: Boolean,
    default: true
  },
  indicatorPosition: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  transition: {
    type: String,
    default: 'slide',
    validator: (value) => ['slide', 'fade'].includes(value)
  },
  loop: {
    type: Boolean,
    default: true
  }
})

// 定义事件
const emit = defineEmits(['change', 'update:active'])

const activeIndex = ref(0)
const items = reactive([])
const timer = ref(null)
const hasFocus = ref(false)
const isTransitioning = ref(false)

// 屏幕阅读器提示
const announce = (index) => {
  const liveRegion = document.getElementById('a11y-live-region')
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
  // 移除 .value 直接操作 reactive 数组
  if (!items.includes(item)) {
    items.push(item)
    // 触发响应式更新
    activeIndex.value = activeIndex.value
    console.log('Registered item:', item) // 调试日志
  }
}


const unregisterItem = (item) => {
  const index = items.indexOf(item);
  if (index !== -1) {
    items.splice(index, 1);
    console.log('Item unregistered:', item); // 调试日志
  }
};

const setActiveIndex = (index) => {
  console.log('Setting active index:', index, 'Total items:', items.length);
  activeIndex.value = index;
};

const startAutoPlay = () => {
  if (props.autoplay) {
    timer.value = setInterval(() => {
      setActiveIndex((activeIndex.value + 1) % items.length);
      console.log('AutoPlay: Active index is now', activeIndex.value); // 调试日志
    }, props.interval);
  }
};

const pause = () => {
  clearInterval(timer.value)
}

const prev = () => {
  isTransitioning.value = true
  const newIndex = (activeIndex.value - 1 + items.length) % items.length
  setActiveIndex(newIndex)
  announce(newIndex)
  setTimeout(() => isTransitioning.value = false, 300)
}

const next = () => {
  isTransitioning.value = true
  const newIndex = (activeIndex.value + 1) % items.length
  setActiveIndex(newIndex)
  announce(newIndex)
  setTimeout(() => isTransitioning.value = false, 300)
}

watch(() => props.autoplay, (newValue) => {
  if (newValue) {
    startAutoPlay()
  } else {
    pause()
  }
})

watch(activeIndex, (newVal) => {
  console.log('[父组件] activeIndex 更新:', newVal)
})

// 在 Carousel.vue 中添加
watch(items, (newItems) => {
  console.log('当前注册项:', newItems.map(i => i.uid))
}, { deep: true })

onMounted(() => {
  startAutoPlay()
  // 添加屏幕阅读器实时区域
  if (!document.getElementById('a11y-live-region')) {
    const liveRegion = document.createElement('div')
    liveRegion.id = 'a11y-live-region'
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.style.position = 'absolute'
    liveRegion.style.left = '-9999px'
    document.body.appendChild(liveRegion)
  }
  // 初始聚焦
  document.querySelector('.carousel')?.focus()
})

onUnmounted(() => {
  pause()
})

provide('carousel', {
  registerItem,
  unregisterItem,
  setActiveIndex,
  activeIndex,
  items: reactive(items),
  transition: props.transition // 注释：将过渡效果传递给 CarouselItem
  // transition: ref('slide') // 注释：将过渡效果传递给 CarouselItem
})
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  outline: none;
}

.carousel:focus-visible {
  box-shadow: 0 0 0 2px var(--mc-primary-color);
}

.carousel-inner {
  display: flex;
  /* transition: transform 0.5s ease; */
}
</style>