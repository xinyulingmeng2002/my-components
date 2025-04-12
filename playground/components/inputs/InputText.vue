<script setup>
defineProps({
  modelValue: String,
  label: String,
  description: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-text">
    <label>{{ label }}</label>
    <p v-if="description" class="description">{{ description }}</p>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<style scoped>
.input-text {
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

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
