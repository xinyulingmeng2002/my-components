<template>
  <div class="carousel-item" :class="{ active: index === carousel.activeIndex }" :style="{ display: index === carousel.activeIndex ? 'block' : 'none' }">
    <slot />
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const carousel = inject('carousel')
const index = ref(-1)
const instance = {
  uid: Math.random().toString(36).slice(2)
}

onMounted(() => {
  carousel.registerItem(instance)
  index.value = carousel.items.indexOf(instance)
})

onUnmounted(() => {
  carousel.unregisterItem(instance)
})
</script>

<style scoped>
.carousel-item {
  flex: 0 0 100%;
}
</style>
