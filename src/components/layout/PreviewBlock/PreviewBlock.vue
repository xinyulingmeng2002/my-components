<template>
    <div class="preview-block">
      <h2 class="preview-block__title">{{ title }}</h2>
      <div class="preview-block__demo">
        <slot name="demo"></slot>
      </div>
      <div class="preview-block__code">
        <slot name="code"></slot>
        <CodeExporter 
          v-if="code"
          :code="code"
          :fileName="title.toLowerCase().replace(/\s+/g, '-')"
          class="preview-block__export-button"
        />
      </div>
    </div>
</template>

<script setup>
import { defineOptions, ref } from 'vue'
import CodeExporter from '../../../../playground/components/CodeExporter.vue'

/**
 * 预览区块组件，用于展示组件示例和代码
 * 包含代码导出功能
 * @displayName PreviewBlock
 * @example
 * <PreviewBlock title="按钮示例">
 *   <template #demo>
 *     <Button>点击我</Button>
 *   </template>
 *   <template #code>
 *     <CodeBlock code="<Button>点击我</Button>" />
 *   </template>
 * </PreviewBlock>
 */
defineOptions({
  name: 'PreviewBlock'
})

const props = defineProps({
  /**
   * 预览区块标题
   * @type {string}
   * @required
   */
  title: {
    type: String,
    required: true
  },
  
  /**
   * 代码语言类型
   * @type {string}
   * @default 'html'
   */
  lang: {
    type: String,
    default: 'html'
  },
  
  /**
   * 示例代码内容
   * @type {string}
   * @default ''
   */
  code: {
    type: String,
    default: ''
  }
});

// const copyCode = async () => { // 获取当前组件的props：props.code
//   try {
//     await navigator.clipboard.writeText(toRaw(props.code));
//     alert('代码已复制到剪贴板');
//   } catch (error) {
//     console.error('复制代码时出错:', error);
//   }
// };
</script>

<style scoped>
.preview-block {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.preview-block__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.preview-block__demo {
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.preview-block__code {
  position: relative;
  padding-top: 2.5rem;
}

.preview-block__export-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}

.preview-block__copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.preview-block__copy-button:hover {
  background-color: #f3f4f6;
}

pre {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', Courier, monospace;
}
</style>