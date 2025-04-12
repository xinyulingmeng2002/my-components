<script setup>
import { ref, watch, computed } from 'vue'
import MonacoEditor from 'monaco-editor-vue3'
import InputText from './inputs/InputText.vue'
import InputNumber from './inputs/InputNumber.vue'
import InputCheckbox from './inputs/InputCheckbox.vue'
import InputSelect from './inputs/InputSelect.vue'
import InputArray from './inputs/InputArray.vue'
import InputObject from './inputs/InputObject.vue'

const props = defineProps({
  code: String,
  componentProps: Array,
  propsValues: Object
})

const emit = defineEmits(['update:code', 'update:prop'])

// 编辑器配置
const editorOptions = {
  language: 'html',
  minimap: { enabled: false },
  lineNumbers: 'off',
  theme: 'vs-dark'
}

// 根据类型获取输入控件
const getInputComponent = (prop) => {
  switch(prop.type) {
    case 'boolean':
      return InputCheckbox
    case 'number':
      return InputNumber
    case 'array':
      return InputArray
    case 'object':
      return InputObject
    case 'select':
      return InputSelect
    default:
      return InputText
  }
}

// 处理 Props 值变化
const handlePropChange = (key, value) => {
  emit('update:prop', { key, value })
}

// 获取类型提示文本
const getTypeHint = (prop) => {
  if (prop.type === 'array' && prop.itemType) {
    return `Array<${prop.itemType}>`
  }
  if (prop.type === 'object' && prop.properties) {
    return `Object {${Object.keys(prop.properties).join(', ')}}`
  }
  return prop.type
}
</script>

<template>
  <div class="code-editor">
    <MonacoEditor
      v-model:value="props.code"
      :options="editorOptions"
      @change="emit('update:code', $event)"
    />
    
    <div class="props-editor" v-if="componentProps">
      <div 
        v-for="prop in componentProps" 
        :key="prop.name"
        class="prop-item"
      >
        <div class="prop-header">
          <span class="prop-name">{{ prop.name }}</span>
          <span class="prop-type">{{ getTypeHint(prop) }}</span>
          <span v-if="prop.required" class="prop-required">*</span>
        </div>
        <p v-if="prop.description" class="prop-description">
          {{ prop.description }}
        </p>
        <component
          :is="getInputComponent(prop)"
          :modelValue="propsValues[prop.name]"
          @update:modelValue="val => handlePropChange(prop.name, val)"
          :label="prop.name"
          :description="prop.description"
          :options="prop.options"
          :required="prop.required"
          :itemType="prop.itemType"
          :properties="prop.properties"
          :validator="prop.validator"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-editor {
  display: flex;
  height: 100%;
}

.props-editor {
  width: 300px;
  padding: 1rem;
  border-left: 1px solid #eee;
  overflow-y: auto;
}

.prop-item {
  margin-bottom: 1.5rem;
}

.prop-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.prop-name {
  font-weight: 500;
}

.prop-type {
  font-size: 0.8em;
  color: #666;
  background: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

.prop-required {
  color: #f44336;
}

.prop-description {
  font-size: 0.9em;
  color: #666;
  margin: 0.25rem 0 0.5rem;
}
</style>