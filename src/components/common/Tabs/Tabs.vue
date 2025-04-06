<!-- components/Tabs/Tabs.vue -->
<script setup>
import { defineOptions, provide, ref } from 'vue'

defineOptions({
  name: 'Tabs'
})

const activeTab = ref(null)
provide('tabsContext', { activeTab })

defineExpose({ activeTab })
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