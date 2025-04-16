<script setup>
import { ref } from 'vue'
import PreviewBlock from '../components/layout/PreviewBlock/PreviewBlock.vue'
import CodeBlock from '../components/layout/CodeBlock/CodeBlock.vue'
import Carousel from '../components/data-display/Carousel/Carousel.vue'
import CarouselItem from '../components/data-display/Carousel/CarouselItem.vue'
import SimpleCarousel from '../components/data-display/NewCarousel/SimpleCarousel.vue'
import '../components/data-display/Carousel/styles/base.css'
import '../components/data-display/Carousel/styles/transitions.css'

const images = ref([])
const count = ref(0)

// 模拟异步加载图片
setTimeout(() => {
  images.value = Array(30).fill('../../public/slides/0.avif')  // 30 张图片
}, 100)

const carouselCode = `
<!-- Slide 效果示例 -->
<Carousel 
  :interval="3000"
  indicator-position="bottom"
  transition="slide"
  :autoplay="true"
>
  <CarouselItem v-for="item in items" :key="item">
    <img :src="item" class="carousel-image" />
  </CarouselItem>
</Carousel>

<!-- Fade 效果示例 -->
<Carousel 
  :interval="3000"
  indicator-position="bottom"
  transition="fade"
  :autoplay="true"
>
  <CarouselItem v-for="item in items" :key="item">
    <img :src="item" class="carousel-image" />
  </CarouselItem>
</Carousel>

<!-- 可用的属性
:interval      - 自动播放间隔，默认 3000ms
:autoplay      - 是否自动播放，默认 true
:showArrows    - 是否显示箭头，默认 true
transition     - 过渡效果，可选 'slide' 或 'fade'
indicatorPosition - 指示器位置，可选 'top'、'bottom'、'left'、'right'
-->`.trim()
</script>

<template>
  <PreviewBlock title="轮播图组件示例">
    <div class="carousel-container">
      <h3>Slide 过渡效果</h3>
      <Carousel 
        :interval="3000"
        indicator-position="bottom"
        transition="slide"
        :autoplay="true"
      >
        <CarouselItem v-for="(image, index) in images" :key="index">
          <img :src="image" class="carousel-image" />
        </CarouselItem>
      </Carousel>
    </div>

    <div class="carousel-container">
      <h3>Fade 过渡效果</h3>
      <Carousel 
        :interval="3000"
        indicator-position="bottom"
        transition="fade"
        :autoplay="true"
      >
        <CarouselItem v-for="(image, index) in images" :key="index">
          <img :src="image" class="carousel-image" />
        </CarouselItem>
      </Carousel>
    </div>

    <div class="code-block-wrapper">
      <CodeBlock 
        :code="carouselCode" 
        language="html"
        class="carousel-code-block"
      />
    </div>
  </PreviewBlock>
</template>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  padding: 1.5rem;
}

.carousel-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.carousel-container h3 {
  text-align: center;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.code-block-wrapper {
  margin-top: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #ddd;
}

.carousel-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.carousel-code-block {
  --bg-color: #f8f9fa;
}
</style>
