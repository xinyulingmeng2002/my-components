<script setup>
import { ref, watch, onMounted } from 'vue'
import { compileVueCode } from '../utils/compiler'
import { debounce } from '../../utils/helpers'

const props = defineProps({
  code: String,
  propsValues: Object
})

const iframeRef = ref(null)
const error = ref(null)
const isLoading = ref(false)

const updatePreview = debounce(async () => {
  try {
    error.value = null
    isLoading.value = true
    
    const compiled = await compileVueCode(props.code)
    if (compiled.error) {
      throw new Error(`编译错误: ${compiled.error}`)
    }

    // 安全处理Props序列化
    const propsInjection = Object.entries(props.propsValues)
      .map(([key, value]) => {
        try {
          if (typeof value === 'function') {
            return `'${key}': ${value.toString()}`
          }
          return `'${key}': ${JSON.stringify(value)}`
        } catch (err) {
          console.warn(`Props序列化失败 [${key}]:`, err)
          return `'${key}': undefined`
        }
      })
      .filter(Boolean)
      .join(',\n    ')
    
    const iframe = iframeRef.value.contentWindow
    iframe.document.open()
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/src/styles/theme/variables.css">
          <style>
            #app {
              padding: 1rem;
              min-height: 100%;
            }
            .error-boundary {
              padding: 1rem;
              background: #fff8e1;
              border: 1px solid #ffd54f;
              border-radius: 4px;
              margin: 1rem;
            }
          </style>
        </head>
        <body>
          <div id="app">
            <div id="error-boundary"></div>
            <div id="component-root"></div>
          </div>
          <script type="module">
            try {
              const template = decodeURIComponent('${encodeURIComponent(compiled.template)}')
              document.getElementById('component-root').innerHTML = template
              
              ${compiled.script}
              
              const app = createApp({
                ...${compiled.component},
                props: {
                  ${propsInjection}
                }
              })
              
              app.config.errorHandler = (err) => {
                const errorBoundary = document.getElementById('error-boundary')
                errorBoundary.innerHTML = \`
                  <div class="error-boundary">
                    <h4>运行时错误</h4>
                    <pre>\${err.message}</pre>
                  </div>
                \`
                window.parent.postMessage({
                  type: 'PREVIEW_ERROR',
                  message: err.message
                }, '*')
              }
              
              app.mount('#component-root')
            } catch (err) {
              const errorBoundary = document.getElementById('error-boundary')
              errorBoundary.innerHTML = \`
                <div class="error-boundary">
                  <h4>初始化错误</h4>
                  <pre>\${err.message}</pre>
                </div>
              \`
              window.parent.postMessage({
                type: 'PREVIEW_ERROR',
                message: err.message
              }, '*')
            }
          <\/script>
        </body>
      </html>
    `
    
    iframe.document.write(htmlContent)
    iframe.document.close()
    
    iframeRef.value.onload = () => {
      const iframeWindow = iframeRef.value.contentWindow
      
      iframeWindow.addEventListener('error', (event) => {
        error.value = `运行时错误: ${event.message}`
      })
      
      iframeWindow.addEventListener('unhandledrejection', (event) => {
        error.value = `异步错误: ${event.reason?.message || '未处理的Promise拒绝'}`
      })
    }
  } catch (err) {
    error.value = `预览错误: ${err.message}`
    console.error('预览更新失败:', err)
  } finally {
    isLoading.value = false
  }
}, 500)

const retryPreview = () => {
  updatePreview()
}

watch(() => [props.code, props.propsValues], updatePreview, { 
  immediate: true,
  deep: true
})

onMounted(() => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'PREVIEW_ERROR') {
      error.value = event.data.message
    }
  })
})
</script>

<template>
  <div class="preview-container">
    <div v-if="isLoading" class="preview-loading">
      加载中...
    </div>
    <iframe 
      ref="iframeRef"
      class="preview-frame"
      sandbox="allow-scripts allow-same-origin"
    />
    <div v-if="error" class="preview-error">
      <div class="error-header">预览错误</div>
      <pre class="error-message">{{ error }}</pre>
      <button @click="retryPreview" class="retry-button">重试</button>
    </div>
  </div>
</template>

<style scoped>
.preview-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.preview-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.preview-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  max-height: 50%;
  overflow: auto;
  background: #ffebee;
  color: #c62828;
  font-family: monospace;
  border-bottom: 1px solid #ef9a9a;
}

.error-header {
  padding: 0.5rem 1rem;
  font-weight: bold;
  background: #ef9a9a;
  color: white;
}

.error-message {
  margin: 0;
  padding: 1rem;
  white-space: pre-wrap;
  line-height: 1.5;
}

.retry-button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
