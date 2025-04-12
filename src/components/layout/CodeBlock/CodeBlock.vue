<template>
  <div class="code-block" :class="{ 'theme-dark': isDarkTheme }">
    <pre ref="codePre" :class="`language-${lang}`">
      <code ref="codeElement" :class="`language-${lang}`">{{ code }}</code>
    </pre>
    <button @click="copyCode" class="code-block__copy-button">
      复制代码
    </button>
  </div>
</template>

<script setup>
import { defineOptions, ref, computed, onMounted, watch } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import 'highlight.js/styles/atom-one-dark.css';
import { getCurrentTheme } from '../../../styles/theme/manager/theme-manager';

/**
 * 代码块组件，支持语法高亮和代码复制
 * @displayName CodeBlock
 * @example
 * <CodeBlock 
 *   code="const message = 'Hello World'"
 *   lang="javascript"
 * />
 */
defineOptions({
  name: 'CodeBlock'
})

const props = defineProps({
  /**
   * 需要显示的代码内容
   * @type {string}
   * @default ''
   */
  code: {
    type: String,
    default: ''
  },
  
  /**
   * 代码语言类型
   * @type {string}
   * @default 'html'
   * @example 'javascript' // JavaScript代码
   * @example 'html' // HTML代码
   * @example 'css' // CSS代码
   */
  lang: {
    type: String,
    default: 'html'
  }
});

const codePre = ref(null);
const codeElement = ref(null);
const isDarkTheme = computed(() => getCurrentTheme() === 'dark');

const highlightCode = () => {
  if (codeElement.value) {
    hljs.highlightElement(codeElement.value);
  }
};

onMounted(() => {
  highlightCode();
});

// 监听主题变化
watch(() => getCurrentTheme(), () => {
  // 在下一个 tick 重新应用高亮
  setTimeout(highlightCode, 0);
});

// 监听代码变化
watch(() => props.code, () => {
  setTimeout(highlightCode, 0);
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

<style>
/* 亮色主题样式 */
.code-block pre {
  background-color: var(--mc-bg-color-page);
  color: var(--mc-text-primary);
}

/* 暗色主题样式 */
.code-block.theme-dark pre {
  background-color: #282c34;
  color: #abb2bf;
}

.code-block.theme-dark .hljs {
  color: #abb2bf;
  background: #282c34;
}

.code-block.theme-dark .hljs-comment,
.code-block.theme-dark .hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.code-block.theme-dark .hljs-doctag,
.code-block.theme-dark .hljs-keyword,
.code-block.theme-dark .hljs-formula {
  color: #c678dd;
}

.code-block.theme-dark .hljs-section,
.code-block.theme-dark .hljs-name,
.code-block.theme-dark .hljs-selector-tag,
.code-block.theme-dark .hljs-deletion,
.code-block.theme-dark .hljs-subst {
  color: #e06c75;
}

.code-block.theme-dark .hljs-literal {
  color: #56b6c2;
}

.code-block.theme-dark .hljs-string,
.code-block.theme-dark .hljs-regexp,
.code-block.theme-dark .hljs-addition,
.code-block.theme-dark .hljs-attribute,
.code-block.theme-dark .hljs-meta .hljs-string {
  color: #98c379;
}

.code-block.theme-dark .hljs-attr,
.code-block.theme-dark .hljs-variable,
.code-block.theme-dark .hljs-template-variable,
.code-block.theme-dark .hljs-type,
.code-block.theme-dark .hljs-selector-class,
.code-block.theme-dark .hljs-selector-attr,
.code-block.theme-dark .hljs-selector-pseudo,
.code-block.theme-dark .hljs-number {
  color: #d19a66;
}
</style>

<style scoped>
.code-block {
  position: relative;
  margin: var(--mc-spacing-md) 0;
  border-radius: var(--mc-border-radius-base);
  overflow: hidden;
}

.code-block__copy-button {
  position: absolute;
  top: var(--mc-spacing-sm);
  right: var(--mc-spacing-sm);
  background-color: var(--mc-bg-color);
  border: 1px solid var(--mc-border-color);
  border-radius: var(--mc-border-radius-base);
  padding: var(--mc-spacing-xs) var(--mc-spacing-sm);
  font-size: var(--mc-font-size-sm);
  cursor: pointer;
  color: var(--mc-text-regular);
  transition: all var(--mc-transition-duration) ease;
}

.code-block__copy-button:hover {
  background-color: var(--mc-primary-color);
  color: white;
  border-color: var(--mc-primary-color);
}

pre {
  margin: 0;
  padding: var(--mc-spacing-md);
  overflow-x: auto;
  border: 1px solid var(--mc-border-color);
}

code {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: var(--mc-font-size-sm);
  line-height: 1.5;
}

/* 暗色主题按钮样式 */
.theme-dark .code-block__copy-button {
  background-color: #353b45;
  border-color: #181a1f;
  color: #abb2bf;
}

.theme-dark .code-block__copy-button:hover {
  background-color: var(--mc-primary-color);
  color: white;
  border-color: var(--mc-primary-color);
}
</style>