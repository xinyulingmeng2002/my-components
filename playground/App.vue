<script setup>
import { onMounted, getCurrentInstance } from 'vue'
import { usePlayground } from './store/usePlayground.js'
import PreviewFrame from './components/PreviewFrame.vue'

const { 
  code, 
  propInputs, 
  propsValues,
  loadComponent,
  updatePropValue 
} = usePlayground('Carousel')

// 使用getCurrentInstance获取组件实例
const instance = getCurrentInstance()

// 检查组件是否注册
const isComponentRegistered = (componentName) => {
  return !!instance.appContext.components[componentName]
}

onMounted(async () => {
  await loadComponent()
  // 验证组件注册
  console.log('Carousel组件注册状态:', isComponentRegistered('Carousel'))
})
// 处理 Props 更新
const handlePropUpdate = ({ key, value }) => {
  updatePropValue(key, value)
}
</script>

<template>
  <div class="playground">
    <PreviewFrame 
      :code="code"
      :componentProps="propInputs"
      :propsValues="propsValues"
    />
  </div>
</template>

<style scoped>
.playground {
  height: 100vh;
  width: 100vw;
}
</style>