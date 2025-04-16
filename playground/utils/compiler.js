import { parse, compileTemplate } from 'vue/compiler-sfc'

export const compileVueCode = async (code) => {
  try {
    // 使用新的解析API
    const { descriptor, errors } = parse(code, {
      filename: 'Playground.vue',
      sourceMap: false
    })

    if (errors.length) {
      throw new Error(errors.map(e => e.message).join('\n'))
    }

    // 确保有模板内容
    if (!descriptor.template) {
      throw new Error('No template found in SFC')
    }

    // 编译模板
    const compiled = compileTemplate({
      id: 'playground-component',
      filename: 'Playground.vue',
      source: descriptor.template.content,
      compilerOptions: {
        mode: 'module'
      }
    })

    if (compiled.errors && compiled.errors.length) {
      throw new Error(compiled.errors.map(e => e.message).join('\n'))
    }
    
    // 处理script部分
    let scriptContent = descriptor.script?.content || ''
    const hasProps = scriptContent.includes('defineProps')
    
    // 确保有默认导出
    if (!scriptContent.includes('export default')) {
      scriptContent += '\nexport default {}'
    }
    
    // 处理样式
    const styles = descriptor.styles
      ?.map(style => `<style ${style.scoped ? 'scoped' : ''}>${style.content}</style>`)
      ?.join('\n') || ''
    
    return {
      template: compiled.code,
      script: scriptContent,
      styles,
      component: '__component',
      hasProps
    }
  } catch (error) {
    console.error('编译错误:', error)
    return {
      error: error.message,
      template: `<div class="error">${error.message}</div>`,
      script: 'const __component = {}',
      styles: '',
      component: '__component',
      hasProps: false
    }
  }
}