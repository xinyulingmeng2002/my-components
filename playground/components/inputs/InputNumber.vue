<script setup>
defineProps({
  modelValue: Number,
  label: String,
  description: String,
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
  },
  unit: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-number">
    <label>{{ label }}</label>
    <p v-if="description" class="description">{{ description }}</p>
    <div class="input-wrapper">
      <input
        type="number"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        @input="$emit('update:modelValue', Number($event.target.value))"
      >
      <span v-if="unit" class="unit">{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.input-number {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.description {
  color: #666;
  font-size: 0.875rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.unit {
  position: absolute;
  right: 0.5rem;
  color: #666;
}
</style>
