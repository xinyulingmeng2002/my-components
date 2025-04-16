<script setup>
import { ref } from 'vue'
import Button from './Button.vue'

defineOptions({
  name: 'ButtonDemo'
})

const alert = (message) => {
  window.alert(message) // 使用 window.alert 代替 this.$alert 避免报错
}
</script>

<template>
  <div class="button-demo">
    <h3>基本用法</h3>
    <Button>默认按钮</Button>
    
    <h3>不同类型</h3>
    <Button type="primary">主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    
    <h3>不同尺寸</h3>
    <Button size="small">小按钮</Button>
    <Button size="medium">中按钮</Button>
    <Button size="large">大按钮</Button>
    
    <h3>事件处理</h3>
    <Button @click="alert('按钮被点击')">点击我</Button>
  </div>
</template>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.button-demo h3 {
  margin: 8px 0;
}
</style>
