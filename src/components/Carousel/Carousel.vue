<template>
  <div class="carousel" @mouseenter="pause" @mouseleave="startAutoPlay">
    <div class="carousel-inner">
      <CarouselItem v-for="(item, index) in items" :key="item.uid" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
        <slot :name="`item-${index}`"></slot>
      </CarouselItem>
    </div>
    <Arrows v-if="showArrows" :disabled="activeIndex === 0" direction="prev" @click="prev" />
    <Arrows v-if="showArrows" :disabled="activeIndex === items.length - 1" direction="next" @click="next" />
    <Indicators :count="items.length" :activeIndex="activeIndex" :position="indicatorPosition" @change="setActiveIndex" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
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
  items.push(item)
}

const unregisterItem = (item) => {
  const index = items.indexOf(item)
  if (index !== -1) {
    items.splice(index, 1)
  }
}

const setActiveIndex = (index) => {
  activeIndex.value = index
}

const startAutoPlay = () => {
  if (props.autoplay) {
    timer.value = setInterval(() => {
      setActiveIndex((activeIndex.value + 1) % items.length)
    }, props.interval)
  }
}

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
  items,
  transition: props.transition
})
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}
</style>
