<template>
  <div 
    class="mc-carousel__item" 
    :class="[
      { 'is-active': isActive },
      `mc-carousel__item--${carousel.transition}`
    ]"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<script setup>
import { defineOptions, ref, inject, computed, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'CarouselItem'
})

const carousel = inject('carousel')

if (!carousel) {
  throw new Error('CarouselItem 必须在 Carousel 组件内使用')
}

const index = ref(-1)
const instance = {
  uid: `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const isActive = computed(() => {
  return index.value === carousel.activeIndex.value
})

const itemStyle = computed(() => {
  if (carousel.transition === 'slide') {
    const offset = (index.value - carousel.activeIndex.value) * 100
    return {
      transform: `translateX(${offset}%)`
    }
  }
  return {}
})

onMounted(() => {
  carousel.registerItem(instance)
  index.value = carousel.items.findIndex(item => item.uid === instance.uid)
})

onUnmounted(() => {
  carousel.unregisterItem(instance)
})
</script>

<style scoped>
.mc-carousel__item {
  /* 可以改变每一个item的大小，实现不同尺寸的轮播效果，实现自定义每次轮播的图片个数 */
  /* flex: 0 0 25%;
  width: 25%; */
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--mc-bg-color-page);
  transition: all var(--mc-carousel-transition-duration, 0.5s) var(--mc-carousel-transition-timing, ease-in-out);
  pointer-events: none;
}

/* Slide transition */
.mc-carousel__item--slide {
  position: absolute;
  /* 这里可以通过设置不同的宽度来实现不同的图片个数 */
  width: 100%;
  opacity: 0.5;
  pointer-events: none;
  transform: translateX(100%);
}

.mc-carousel__item--slide.is-active {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}

/* Fade transition */
.mc-carousel__item--fade {
  /* position: absolute; */
  opacity: 0;
}

.mc-carousel__item--fade.is-active {
  opacity: 1;
  pointer-events: auto;
}

/* Common active state */
.mc-carousel__item.is-active {
  z-index: 1;
}
</style>