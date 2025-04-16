<script setup>
import { ref } from 'vue'
import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'

defineOptions({
  name: 'CarouselDemo'
})

const images = [
  '../../../../public/slides/0.avif',
  '../../../../public/slides/1.avif', // 1024 x 768
  '../../../../public/slides/2.avif', // 1024 x 768
  '../../../../public/slides/3.avif', // 1024 x 768
  '../../../../public/slides/4.avif', // 1024 x 768
  '../../../../public/slides/5.avif', // 1024 x 768
  '../../../../public/slides/6.avif', // 1024 x 768
]

const activeTransition = ref('slide') // 默认为 slide
const activeIndicatorPos = ref('bottom') // 默认为 bottom
</script>

<template>
  <div class="carousel-demo">
    <h3>基础轮播</h3>
    <Carousel :interval="3000">
      <CarouselItem v-for="(img, index) in images" :key="index">
        <img :src="img" :alt="`轮播图 ${index + 1}`">
      </CarouselItem>
    </Carousel>

    <h3>不同过渡效果</h3>
    <div class="controls">
      <label>
        <input type="radio" v-model="activeTransition" value="slide"> Slide
      </label>
      <label>
        <input type="radio" v-model="activeTransition" value="fade"> Fade
      </label>
    </div>
    <Carousel :transition="activeTransition">
      <CarouselItem v-for="(img, index) in images" :key="index">
        <img :src="img" :alt="`轮播图 ${index + 1}`">
      </CarouselItem>
    </Carousel>

    <h3>不同指示器位置</h3>
    <div class="controls">
      <label>
        <input type="radio" v-model="activeIndicatorPos" value="top"> Top
      </label>
      <label>
        <input type="radio" v-model="activeIndicatorPos" value="bottom"> Bottom
      </label>
      <label>
        <input type="radio" v-model="activeIndicatorPos" value="left"> Left
      </label>
      <label>
        <input type="radio" v-model="activeIndicatorPos" value="right"> Right
      </label>
    </div>
    <Carousel :indicator-position="activeIndicatorPos">
      <CarouselItem v-for="(img, index) in images" :key="index">
        <img :src="img" :alt="`轮播图 ${index + 1}`">
      </CarouselItem>
    </Carousel>
  </div>
</template>

<style scoped>
.carousel-demo {
  padding: 20px;
}

.carousel-demo h3 {
  margin: 20px 0 10px;
  color: #333;
}

.controls {
  margin: 10px 0;
  display: flex;
  gap: 15px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
}

img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
