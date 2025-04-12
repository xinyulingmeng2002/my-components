<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  description: String,
  options: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-select">
    <label>{{ label }}</label>
    <p v-if="description" class="description">{{ description }}</p>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label || option.value }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.input-select {
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

select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}
</style>
