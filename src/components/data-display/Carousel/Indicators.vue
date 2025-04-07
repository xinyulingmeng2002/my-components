<template>
  <div class="carousel-indicators" :class="positionClass">
    <button 
      v-for="i in count" 
      :key="i" 
      class="carousel-indicator"
      :class="{ active: i - 1 === activeIndex }" 
      :aria-label="`Slide ${i}`"
      @click="onChange(i - 1)"
    />
  </div>
</template>

<script setup>
import { defineOptions, computed } from 'vue'

defineOptions({
  name: 'CarouselIndicators'
})

const props = defineProps({
  count: {
    type: Number,
    required: true
  },
  activeIndex: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  }
})

const emit = defineEmits(['change'])

const positionClass = computed(() => {
  const positions = {
    top: 'indicators-top',
    bottom: 'indicators-bottom',
    left: 'indicators-left',
    right: 'indicators-right'
  }
  return positions[props.position] || positions.bottom
})

const onChange = (index) => {
  emit('change', index)
}
</script>

<style scoped>
.carousel-indicators {
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.indicators-bottom {
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
  padding: 5px 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

.indicators-top {
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

.indicators-left {
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
  padding: 12px 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

.indicators-right {
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
  padding: 12px 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

.carousel-indicator {
  width: 6px;
  height: 6px;
  margin: 0px 5px;
  border: 1px solid transparent;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all var(--mc-transition-duration) ease;
}

.carousel-indicator:hover {
  background-color: var(--mc-carousel-indicator-color);
  transform: scale(1.2);
}

.carousel-indicator.active {
  background-color: var(--mc-carousel-indicator-active-color);
  transform: scale(1.3);
  box-shadow: 0 0 0 2px var(--mc-primary-color);
}

/* 垂直方向的间距调整 */
.indicators-left .carousel-indicator,
.indicators-right .carousel-indicator {
  margin: 6px 4px;
}
</style>