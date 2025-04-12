<!-- components/Tabs/Tabs.vue -->
<script setup>
import { defineOptions, provide, ref } from 'vue'

/**
 * 标签页容器组件
 * @displayName Tabs
 * @example
 * <Tabs v-model:active="activeTab">
 *   <Tab name="tab1" title="标签1">内容1</Tab>
 *   <Tab name="tab2" title="标签2">内容2</Tab>
 * </Tabs>
 */
defineOptions({
  name: 'Tabs'
})

/**
 * 当前激活的标签页名称
 * @type {string}
 */
const activeTab = ref(null)

/**
 * 提供给子组件的上下文
 */
provide('tabsContext', { activeTab })

/**
 * 暴露给父组件的属性
 */
defineExpose({ activeTab })

/**
 * 标签页切换事件
 * @event change
 * @param {string} tabName - 切换到的标签页名称
 */
</script>

<template>
  <div class="tabs">
    <div class="tabs-header">
      <slot name="header"></slot>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>