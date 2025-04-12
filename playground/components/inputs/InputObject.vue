<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  label: String,
  description: String,
  properties: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const objectData = ref({ ...props.modelValue })

watch(() => props.modelValue, (newVal) => {
  objectData.value = { ...newVal }
})

const updateObject = () => {
  emit('update:modelValue', { ...objectData.value })
}

const updateProperty = (key, value) => {
  objectData.value[key] = value
  updateObject()
}

const addProperty = () => {
  const newKey = prompt('Enter property name:')
  if (newKey && !objectData.value.hasOwnProperty(newKey)) {
    objectData.value[newKey] = ''
    updateObject()
  }
}

const removeProperty = (key) => {
  delete objectData.value[key]
  updateObject()
}
</script>

<template>
  <div class="input-object">
    <label>{{ label }}</label>
    <p v-if="description" class="description">{{ description }}</p>
    
    <div class="object-properties">
      <div 
        v-for="(value, key) in objectData" 
        :key="key" 
        class="property-item"
      >
        <label class="property-key">{{ key }}</label>
        
        <input
          v-if="!properties[key] || properties[key].type === 'string'"
          type="text"
          :value="value"
          @input="updateProperty(key, $event.target.value)"
        >
        
        <input
          v-else-if="properties[key].type === 'number'"
          type="number"
          :value="value"
          @input="updateProperty(key, Number($event.target.value))"
        >
        
        <button 
          class="remove-btn"
          @click="removeProperty(key)"
        >
          ×
        </button>
      </div>
    </div>
    
    <button class="add-btn" @click="addProperty">
      + Add Property
    </button>
  </div>
</template>

<style scoped>
.input-object {
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

.object-properties {
  margin-bottom: 0.5rem;
}

.property-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.property-key {
  min-width: 100px;
  margin-right: 0.5rem;
  font-weight: normal;
}

.property-item input {
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
