<template>
  <div 
    class="carousel-item" 
    :class="[
      { active: isActive },
      carousel.transition
    ]"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
const { items, activeIndex } = inject('carousel')  // 注释：注册 CarouselItem 到 Carousel 中
const carousel = inject('carousel')  //注释：注入 Carousel 组件实例
const index = ref(-1)  // 注释：索引值，初始值为 -1，表示未注册
const instance = {
  uid: Math.random().toString(36).slice(2)  // 注释：生成唯一标识符
}


// 改用 watch 明确追踪 activeIndex 变化
watch(() => carousel?.activeIndex?.value, (newVal) => {
  console.log('ActiveIndex updated:', newVal) // 调试日志
})

const isActive = computed(() => {
  console.log('Checking active:', index.value, carousel.activeIndex)
  // return index.value === carousel?.activeIndex
  return index.value === carousel?.activeIndex?.value
})  // 注释：计算属性，判断当前项是否为活动项

const itemStyle = computed(() => {  // 注释：计算属性，动态计算样式
  if (!carousel) return {}
  // 注释：如果过渡效果为滑动
  if (carousel.transition === 'slide') {  // 注释：如果过渡效果为滑动
    // 注释：计算当前项的位移
    return {  
      transform: `translateX(${(index.value - carousel.activeIndex) * 100}%)`  // 注释：设置位移
      //${(index.value - carousel.activeIndex) * 100}：小白教学：当前项的索引与当前激活项的索引之差乘以100%，表示当前项的位移
    }
  }
  return {}
})

onMounted(() => {  // 注释：组件挂载后注册当前项
  if (!carousel) {
    console.error('必须在 Carousel 组件内使用')
    return
  }
  // 同步注册和索引计算
  carousel.registerItem(instance)
  index.value = carousel.items.findIndex(item => item.uid === instance.uid)
  
  // 调试日志
  console.log('Item registered:', {
    uid: instance.uid,
    index: index.value,
    activeIndex: carousel.activeIndex.value
  })
})

onUnmounted(() => {
  carousel?.unregisterItem(instance)  // 注释：组件卸载后注销当前项
  console.log('CarouselItem unmounted:', instance); // 调试日志
  console.log('Item mounted with uid:', instance.uid) // 确认每个项的唯一标识
})
</script>

<style scoped>
.carousel-item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
}

/* Slide transition */
.carousel-item.slide {
  /* position: relative;
  flex: 0 0 4%;  */
  pointer-events: none;
  opacity: 0.5;
  transform: translateX(100%);
}

.carousel-item.slide.active {
  transform: translateX(0);
  opacity: 1;
}

/* Fade transition */
.carousel-item.fade {
  opacity: 0;
  pointer-events: none;
}

.carousel-item.fade.active {
  opacity: 1;
  pointer-events: auto;
}

/* Common active state */
.carousel-item.active {
  opacity: 1;
  z-index: 1;
}
</style>