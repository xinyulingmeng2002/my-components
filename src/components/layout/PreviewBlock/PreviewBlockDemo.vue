<script setup>
import PreviewBlock from './PreviewBlock.vue'
import CodeBlock from '../CodeBlock/CodeBlock.vue'
import Button from '../../common/Button/Button.vue'

defineOptions({
  name: 'PreviewBlockDemo'
})

const buttonCode = `
<Button type="primary">主要按钮</Button>
<Button type="secondary">次要按钮</Button>
`.trim()
</script>

<template>
  <div class="previewblock-demo">
    <PreviewBlock title="按钮示例">
      <template #demo>
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
      </template>
      <template #code>
        <CodeBlock :code="buttonCode" lang="html" />
      </template>
    </PreviewBlock>

    <PreviewBlock title="带图标的按钮">
      <template #demo>
        <Button>
          <template #icon>
            <span>📎</span>
          </template>
          带图标按钮
        </Button>
      </template>
      <template #code>
        <CodeBlock 
          :code="`<Button>
  <template #icon>
    <span>📎</span>
  </template>
  带图标按钮
</Button>`" 
          lang="html" 
        />
      </template>
    </PreviewBlock>
  </div>
</template>

<style scoped>
.previewblock-demo {
  padding: 20px;
}

.previewblock-demo button {
  margin-right: 10px;
}
</style>
