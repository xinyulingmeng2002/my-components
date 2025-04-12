<script setup>
import CodeBlock from './CodeBlock.vue'

defineOptions({
  name: 'CodeBlockDemo'
})

const htmlCode = `
<div class="container">
  <h1>Hello World</h1>
  <p>This is a demo</p>
</div>
`.trim()

const jsCode = `
function greet(name) {
  console.log(\`Hello, \${name}!\`)
}

greet('World')
`.trim()

const cssCode = `
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #42b983;
}
`.trim()
</script>

<template>
  <div class="codeblock-demo">
    <h3>HTML 示例</h3>
    <CodeBlock 
      :code="htmlCode" 
      lang="html"
    />
    
    <h3>JavaScript 示例</h3>
    <CodeBlock 
      :code="jsCode" 
      lang="javascript"
    />
    
    <h3>CSS 示例</h3>
    <CodeBlock 
      :code="cssCode" 
      lang="css"
    />
  </div>
</template>

<style scoped>
.codeblock-demo {
  padding: 20px;
}

.codeblock-demo h3 {
  margin: 20px 0 10px;
  color: #333;
}
</style>
