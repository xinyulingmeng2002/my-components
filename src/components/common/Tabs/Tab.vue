<!-- components/Tabs/Tab.vue -->
<script setup>
import { defineOptions, inject, computed } from 'vue'

/**
 * 标签页子组件
 * @displayName Tab
 * @example
 * <Tab name="tab1" title="标签1">
 *   这里是标签1的内容
 * </Tab>
 */
defineOptions({
  name: 'Tab'
})

const props = defineProps({
  /**
   * 标签页唯一标识
   * @type {string}
   * @required
   */
  name: {
    type: String,
    required: true
  },
  
  /**
   * 标签页标题
   * @type {string}
   * @default ''
   */
  title: {
    type: String,
    default: ''
  },
  
  /**
   * 是否禁用标签页
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  }
})

const { activeTab } = inject('tabsContext')
const isActive = computed(() => activeTab.value === props.name)

/**
 * 标签页激活事件
 * @event activate
 */
</script>

<template>
  <div v-show="isActive" class="tab-pane">
    <slot></slot>
  </div>
</template>