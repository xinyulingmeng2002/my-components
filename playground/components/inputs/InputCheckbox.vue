<script setup>
defineProps({
  modelValue: Boolean,
  label: String,
  description: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-checkbox">
    <label>
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      <span class="label-text">{{ label }}</span>
    </label>
    <p v-if="description" class="description">{{ description }}</p>
  </div>
</template>

<style scoped>
.input-checkbox {
  margin-bottom: 1rem;
}

label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.25rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
}

.label-text {
  font-weight: bold;
}

.description {
  color: #666;
  font-size: 0.875rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
}
</style>
