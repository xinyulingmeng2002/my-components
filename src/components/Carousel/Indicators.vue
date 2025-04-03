<template>
  <div class="carousel-indicators" :class="positionClass">
    <button v-for="i in count" :key="i" :class="{ active: i - 1 === activeIndex }" @click="onChange(i - 1)">
      {{ i }}
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  count: Number,
  activeIndex: Number,
  position: String
})

const emit = defineEmits(['change'])

const positionClass = computed(() => `carousel-indicators-${props.position}`)

const onChange = (index) => {
  emit('change', index)
}
</script>

<style scoped>
.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.carousel-indicators button {
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  cursor: pointer;
}

.carousel-indicators button.active {
  background-color: black;
}
</style>
