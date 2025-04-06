<script setup>
import { defineOptions, inject, computed } from 'vue'

defineOptions({
  name: 'Test1'
})

const globalConfig = inject('globalConfig')

const componentSize = computed(() => props.size || globalConfig.size)
</script>

<template>
  <div :class="[`size-${componentSize}`]">
    <!-- 组件内容 -->
     <p>这里是测试组件（测试全局配置注入系统）</p>
  </div>
</template>