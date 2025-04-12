<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: String,
  description: String,
  itemType: {
    type: String,
    default: 'string'
  }
})

const emit = defineEmits(['update:modelValue'])

const items = ref([...props.modelValue])

watch(() => props.modelValue, (newVal) => {
  items.value = [...newVal]
})

const updateItems = () => {
  emit('update:modelValue', [...items.value])
}

const addItem = () => {
  items.value.push(
    props.itemType === 'number' ? 0 :
    props.itemType === 'boolean' ? false :
    ''
  )
  updateItems()
}

const removeItem = (index) => {
  items.value.splice(index, 1)
  updateItems()
}

const updateItem = (index, value) => {
  items.value[index] = value
  updateItems()
}
</script>

<template>
  <div class="input-array">
    <label>{{ label }}</label>
    <p v-if="description" class="description">{{ description }}</p>
    
    <div class="array-items">
      <div v-for="(item, index) in items" :key="index" class="array-item">
        <input
          v-if="itemType === 'string'"
          type="text"
          :value="item"
          @input="updateItem(index, $event.target.value)"
        >
        <input
          v-else-if="itemType === 'number'"
          type="number"
          :value="item"
          @input="updateItem(index, Number($event.target.value))"
        >
        <button 
          class="remove-btn"
          @click="removeItem(index)"
        >
          ×
        </button>
      </div>
    </div>
    
    <button class="add-btn" @click="addItem">
      + Add Item
    </button>
  </div>
</template>

<style scoped>
.input-array {
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

.array-items {
  margin-bottom: 0.5rem;
}

.array-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.array-item input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-btn {
  margin-left: 0.5rem;
  padding: 0 0.5rem;
  background: #ffebee;
  color: #c62828;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  padding: 0.5rem;
  background: #e3f2fd;
  color: #1565c0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
