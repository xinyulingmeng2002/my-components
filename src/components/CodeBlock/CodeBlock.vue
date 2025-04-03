<template>
    <div class="code-block">
      <pre ref="codePre" :class="`language-${lang}`">
        <code ref="codeElement" :class="`language-${lang}`">{{ code }}</code>
      </pre>
      <button @click="copyCode" class="code-block__copy-button">复制代码</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  // import hljs from 'highlight.js';
  // import 'highlight.js/styles/default.css';
  
  const props = defineProps({
    code: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      default: 'html'
    }
  });
  
  const codePre = ref(null);
  const codeElement = ref(null);
  
  onMounted(() => {
    if (codeElement.value) {
      hljs.highlightElement(codeElement.value);
    }
  });
  
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(props.code);
      alert('代码已复制到剪贴板');
    } catch (error) {
      console.error('复制代码时出错:', error);
    }
  };
  </script>
  
  <style scoped>
  .code-block {
    position: relative;
    margin: 1rem 0;
  }
  
  .code-block__copy-button {
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
  
  .code-block__copy-button:hover {
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