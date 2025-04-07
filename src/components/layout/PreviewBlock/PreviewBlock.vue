<template>
    <div class="preview-block">
      <h2 class="preview-block__title">{{ title }}</h2>
      <div class="preview-block__demo">
        <slot name="demo"></slot>
      </div>
      <div class="preview-block__code">
        <slot name="code"></slot>
        <!-- <pre>
          <code :class="`language-${lang}`">{{ code }}</code>
        </pre>
        <button @click="copyCode" class="preview-block__copy-button">复制代码</button> -->
      </div>
    </div>
</template>

<script setup>
import { defineOptions, ref } from 'vue';

defineOptions({
  name: 'PreviewBlock'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    default: 'html'
  },
  code: {
    type: String,
    default: '' // 添加默认值
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