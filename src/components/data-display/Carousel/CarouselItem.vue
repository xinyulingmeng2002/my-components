<template>
  <div 
    class="mc-carousel__item" 
    :class="[
      { 'is-active': isActive },
      `mc-carousel__item--${carousel.transition}`
    ]"
    :style="itemStyle"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <div 
      class="mc-carousel__item-inner"
      :style="{
        aspectRatio: carousel.aspectRatio,
        height: carousel.height
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineOptions, ref, inject, computed, onMounted, onUnmounted } from 'vue'

/**
 * 轮播图子项组件
 * @displayName CarouselItem
 * @example
 * <CarouselItem>
 *   <img src="image.jpg" alt="轮播图片">
 * </CarouselItem>
 */
defineOptions({
  name: 'CarouselItem'
})

const props = defineProps({
  /**
   * 是否启用图片懒加载
   * @type {boolean}
   * @default true
   */
  lazyLoad: {
    type: Boolean,
    default: true
  },
  
  /**
   * 自定义宽度
   * @type {string}
   * @default null
   */
  width: {
    type: String,
    default: null
  },
  
  /**
   * 自定义高度
   * @type {string}
   * @default null
   */
  height: {
    type: String,
    default: null
  }
})

const carousel = inject('carousel')

if (!carousel) {
  throw new Error('CarouselItem 必须在 Carousel 组件内使用')
}

const index = ref(-1)
const instance = {
  uid: `${Date.now()}-${Math.random().toString(36).slice(2)}` // 唯一标识
}

const isActive = computed(() => {
  return index.value === carousel.activeIndex.value
})

const itemStyle = computed(() => {  // 计算当前项的样式
  if (carousel.transition === 'slide') {
    const offset = (index.value - carousel.activeIndex.value) * 100  // 计算偏移量
    return {
      transform: `translateX(${offset}%)`,
      // 添加硬件加速
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden'
    }
  }
  return {
    willChange: 'opacity',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
  }
})

// 处理图片懒加载
const handleImageLoad = (event) => {
  const img = event.target
  if (img.hasAttribute('data-src')) {
    img.src = img.getAttribute('data-src')
    img.removeAttribute('data-src')
  }
}

// 观察图片是否进入视口
const observeImages = () => {
  if (!props.lazyLoad) return

  const images = Array.from(document.querySelectorAll('.mc-carousel__item img[data-src]'))
  
  const observer = new IntersectionObserver((entries) => {  // 监听图片进入视口
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.getAttribute('data-src') // 设置图片 src 属性
        img.removeAttribute('data-src') // 移除 data-src 属性
        observer.unobserve(img) // 停止观察该图片
      }
    })
  }, {
    root: document.querySelector('.mc-carousel'),
    threshold: 0.1
  })

  images.forEach(img => observer.observe(img))
}

onMounted(() => {
  carousel.registerItem(instance)
  index.value = carousel.items.findIndex(item => item.uid === instance.uid)
  
  // 初始化图片懒加载
  if (props.lazyLoad) {
    observeImages()
  }
})

onUnmounted(() => {
  carousel.unregisterItem(instance)
})
</script>

<style>
.mc-carousel__item {
  /* position: relative !important; */
  width: 100%;
  height: 100%;
  flex: 0 0 20% ;
  top: 0;
  left: 0;
  overflow: hidden;
}

.mc-carousel__item-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 图片样式 */
.mc-carousel__item img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

/* 支持响应式图片 */
.mc-carousel__item picture {
  width: 100%;
  height: 100%;
}

.mc-carousel__item picture img {
  width: 100%;
  height: 100%;
}

/* Slide transition */
.mc-carousel__item--slide {
  transition: transform var(--mc-transition-duration, 0.3s) var(--mc-transition-timing, ease-in-out);
  opacity: 0.5;
  pointer-events: none;
  transform: translateX(100%);
}

.mc-carousel__item--slide.is-active {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
}

/* Fade transition */
.mc-carousel__item--fade {
  transition: opacity var(--mc-transition-duration, 0.3s) var(--mc-transition-timing, ease-in-out);
  opacity: 0;
  pointer-events: none;
}

.mc-carousel__item--fade.is-active {
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
}

/* 图片加载动画 */
.mc-carousel__item img {
  transition: opacity 0.3s ease;
}

.mc-carousel__item img[data-src] {
  opacity: 0;
}

.mc-carousel__item img:not([data-src]) {
  opacity: 1;
}

/* 移动端优化 */
@media (hover: none) {
  .mc-carousel__item {
    touch-action: pan-y pinch-zoom;
    user-select: none;
    -webkit-user-select: none;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .mc-carousel__item {
    background-color: var(--mc-bg-color-dark, #141414);
  }
}

/* 响应式布局支持 */
@media screen and (max-width: 768px) {
  .mc-carousel__item {
    /* 移动端可能需要调整的样式 */
    width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transform: scale(0.8);
    transition: transform 0.3s ease;
  }
}
</style>