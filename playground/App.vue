<script setup>
import { onMounted } from 'vue'
import { usePlayground } from './store/usePlayground'
import CodeEditor from './components/CodeEditor.vue'
import PreviewFrame from './components/PreviewFrame.vue'

const { 
  code, 
  propInputs, 
  propsValues,
  loadComponent,
  updatePropValue 
} = usePlayground('NewCarousel')

// 加载组件并初始化
onMounted(async () => {
  await loadComponent()
})

// 处理 Props 更新
const handlePropUpdate = ({ key, value }) => {
  updatePropValue(key, value)
}
</script>

<template>
  <div class="playground">
    <CodeEditor 
      v-model:code="code"
      :componentProps="propInputs"
      :propsValues="propsValues"
      @update:prop="handlePropUpdate"
    />
    <PreviewFrame 
      :code="code"
      :componentProps="propInputs"
      :propsValues="propsValues"
    />
  </div>
</template>

<style scoped>
.playground {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.playground > * {
  flex: 1;
}
</style>