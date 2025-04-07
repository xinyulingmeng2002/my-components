<template>
  <div class="playground">
    <h1>组件沙盒</h1>
    <div class="controls">
      <label for="component-selector">选择组件：</label>
      <select id="component-selector" v-model="currentComponent">
        <option v-for="comp in componentList" :value="comp" :key="comp">
          {{ comp }}
        </option>
      </select>
    </div>

    <div class="props-editor">
      <h2>属性编辑</h2>
      <div v-for="(value, key) in props" :key="key" class="prop-item">
        <label :for="key">{{ key }}:</label>
        <input :id="key" v-model="props[key]" />
      </div>
    </div>

    <div class="component-preview">
      <h2>组件预览</h2>
      <component :is="currentComponent" v-bind="props" @click="handleEvent" />
      <PreviewBlock title="示例标题" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'; // 使用 reactive 替代 ref 以确保 props 是响应式对象
import { importComponentFiles } from '../src/utils/auto-import.js'; // 导入自动注册组件的工具

const componentList = ref([]); // 动态获取组件列表
const currentComponent = ref(null);
const props = reactive({}); // 修改为 reactive 确保 props 是响应式的

const handleEvent = (event) => {
  console.log('事件触发:', event);
};

// 动态获取组件列表
componentList.value = importComponentFiles().map((component) => component.name);
currentComponent.value = componentList.value[0];
</script>

<style scoped>
.playground {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.props-editor {
  margin-bottom: 20px;
}

.prop-item {
  margin-bottom: 10px;
}

.component-preview {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
