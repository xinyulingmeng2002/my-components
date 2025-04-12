// 使用浏览器内编译（生产环境建议使用服务端编译）
export const compileVueCode = async (code) => {
  try {
    const { compile } = await import('vue/compiler-sfc')
    const { descriptor } = compile(code, { 
      filename: 'Playground.vue',
      sourceMap: false,
      isProd: false
    })
    
    // 处理script部分
    let scriptContent = descriptor.script?.content || ''
    const hasProps = scriptContent.includes('defineProps')
    
    // 确保有默认导出
    if (!scriptContent.includes('export default')) {
      scriptContent += '\nexport default {}'
    }
    
    // 转换导出为变量
    scriptContent = scriptContent.replace('export default', 'const __component =')
    
    // 添加Props类型定义
    if (hasProps) {
      scriptContent = scriptContent.replace(
        'const __component =', 
        'const __componentProps = defineProps();\nconst __component ='
      )
    }
    
    // 处理样式
    const styles = descriptor.styles
      ?.map(style => `<style ${style.scoped ? 'scoped' : ''}>${style.content}</style>`)
      ?.join('\n') || ''
    
    return {
      template: descriptor.template?.content || '<div>No template</div>',
      script: scriptContent,
      styles,
      component: '__component',
      hasProps
    }
  } catch (error) {
    // 提取更友好的错误信息
    const message = error.message
      .replace(/at\s+\d+:\d+/g, '')
      .replace(/\n/g, ' ')
      .trim()
    
    console.error('编译错误:', error)
    return { 
      error: message,
      template: `<div class="error">${message}</div>`,
      script: 'const __component = {}',
      styles: '',
      component: '__component',
      hasProps: false
    }
  }
}