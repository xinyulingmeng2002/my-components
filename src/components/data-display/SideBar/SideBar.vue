<script setup>
import { defineOptions } from 'vue';

/**
 * 侧边栏组件
 * @displayName SideBar
 * @example
 * <SideBar :width="250" position="left">
 *   <template #header>标题</template>
 *   <div>内容区域</div>
 * </SideBar>
 */
defineOptions({
  name: 'SideBar'
})

const props = defineProps({
  /**
   * 侧边栏宽度
   * @type {number|string}
   * @default 250
   */
  width: {
    type: [Number, String],
    default: 250
  },
  
  /**
   * 侧边栏位置
   * @type {'left'|'right'}
   * @default 'left'
   */
  position: {
    type: String,
    default: 'left',
    validator: value => ['left', 'right'].includes(value)
  },
  
  /**
   * 是否可折叠
   * @type {boolean}
   * @default false
   */
  collapsible: {
    type: Boolean,
    default: false
  }
})

/**
 * 折叠状态变化事件
 * @event toggle
 * @param {boolean} collapsed - 是否折叠
 */
defineEmits(['toggle'])
</script>

<template>
  <div class="sidebar">
    <!-- 组件内容 -->
  </div>
</template>

<style scoped>
.sidebar {
  /* 基础样式 */
}
</style>
