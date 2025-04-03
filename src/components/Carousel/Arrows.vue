<template>
  <button class="carousel-arrow" :class="`carousel-arrow-${direction}`" :disabled="disabled" @click="onClick">
    {{ direction === 'prev' ? '←' : '→' }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  disabled: Boolean,
  direction: String
})

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>

<style scoped>
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 10;
}

.carousel-arrow-prev {
  left: 10px;
}

.carousel-arrow-next {
  right: 10px;
}

.carousel-arrow[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
