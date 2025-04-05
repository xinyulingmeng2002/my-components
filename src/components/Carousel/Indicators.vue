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
import { computed } from 'vue'

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
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
}

.indicators-top {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
}

.indicators-left {
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}

.indicators-right {
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}

.carousel-indicator {
  width: 8px;
  height: 8px;
  margin: 4px;
  border: none;
  border-radius: 50%;
  padding: 0;
  background-color: var(--indicator-color);
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.carousel-indicator:hover {
  opacity: 0.8;
  transform: scale(1.2);
}

.carousel-indicator.active {
  background-color: var(--indicator-active-color);
  opacity: 1;
  transform: scale(1.1);
}

/* 垂直方向的间距调整 */
.indicators-left .carousel-indicator,
.indicators-right .carousel-indicator {
  margin: 6px 4px;
}
</style>