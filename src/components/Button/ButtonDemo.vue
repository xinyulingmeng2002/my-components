<!-- docs/components/ButtonDemo.vue -->
<template>
    <PreviewBlock title="按钮示例">
      <template #demo>
        <MyButton @click="count++">点击次数：{{ count }}</MyButton>
      </template>
      <template #code>
        <CodeBlock lang="html">
          {{ `
            <MyButton @click="handleClick">按钮</MyButton>
          ` }}
        </CodeBlock>
      </template>
    </PreviewBlock>
  </template>

<script setup>
import { ref } from 'vue'
import MyButton from './Button.vue'
import PreviewBlock from '../PreviewBlock/PreviewBlock.vue'
import CodeBlock from '../CodeBlock/CodeBlock.vue'
const count = ref(0)
</script>
<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>