<template>
  <div 
    class="carousel" 
    @mouseenter="pause" 
    @mouseleave="startAutoPlay"
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
import { ref, reactive, onMounted, onUnmounted, watch, provide } from 'vue'
import CarouselItem from './CarouselItem.vue'
import Arrows from './Arrows.vue'
import Indicators from './Indicators.vue'

const props = defineProps({
  interval: {
    type: Number,
    default: 3000
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
    default: 'bottom'
  },
  transition: {
    type: String,
    default: 'slide'
  }
})

const activeIndex = ref(0)
const items = reactive([])
const timer = ref(null)

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
  setActiveIndex((activeIndex.value - 1 + items.length) % items.length)
}

const next = () => {
  setActiveIndex((activeIndex.value + 1) % items.length)
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
}

.carousel-inner {
  display: flex;
  /* transition: transform 0.5s ease; */
}
</style>
