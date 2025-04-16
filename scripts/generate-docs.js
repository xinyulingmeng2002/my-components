
import fs from 'fs'
import path from 'path'
import { parse } from 'vue-docgen-api'

// 格式化类型信息
const formatType = (type) => {
  if (!type) return 'any'
  if (typeof type === 'string') return type
  if (type.name) return type.name
  return JSON.stringify(type)
}

// 格式化默认值
const formatDefault = (value) => {
  if (value === undefined) return ''
  if (typeof value === 'string') return `'${value}'`
  return JSON.stringify(value)
}

// 生成示例代码
const generateExample = (componentName, props) => {
  const propsExample = props
    ? props
        .filter(prop => !prop.name.startsWith('_'))
        .map(prop => `      ${prop.name}="${prop.type?.name === 'Boolean' ? 'true' : `示例${prop.name}`}"`)
        .join('\n')
    : ''

  return `\`\`\`vue
<template>
  <${componentName}
${propsExample}
  />
</template>

<script setup>
import { ${componentName} } from 'xin_yu'
</script>
\`\`\``
}

// 生成属性表格
const generatePropsTable = (props) => {
  if (!props || props.length === 0) return '组件没有定义任何属性。'

  return `| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
${props
  .map(
    prop =>
      `| ${prop.name} | ${formatType(prop.type)} | ${formatDefault(prop.defaultValue?.value)} | ${
        prop.required ? '是' : '否'
      } | ${prop.description || '-'} |`
  )
  .join('\n')}`
}

// 生成事件表格
const generateEventsTable = (events) => {
  if (!events || events.length === 0) return '组件没有定义任何事件。'

  return `| 事件名 | 参数 | 描述 |
|--------|------|------|
${events
  .map(
    event =>
      `| ${event.name} | ${event.arguments?.map(arg => `${arg.name}: ${formatType(arg.type)}`).join(', ') || '-'} | ${
        event.description || '-'
      } |`
  )
  .join('\n')}`
}

// 生成插槽表格
const generateSlotsTable = (slots) => {
  if (!slots || slots.length === 0) return '组件没有定义任何插槽。'

  return `| 插槽名 | 参数 | 描述 |
|--------|------|------|
${slots
  .map(slot => `| ${slot.name || 'default'} | ${slot.bindings?.map(b => b.name).join(', ') || '-'} | ${slot.description || '-'} |`)
  .join('\n')}`
}

// 生成方法表格
const generateMethodsTable = (methods) => {
  if (!methods || methods.length === 0) return '组件没有定义任何公开方法。'

  return `| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
${methods
  .map(
    method =>
      `| ${method.name} | ${method.params?.map(p => `${p.name}: ${formatType(p.type)}`).join(', ') || '-'} | ${
        formatType(method.returns?.type) || 'void'
      } | ${method.description || '-'} |`
  )
  .join('\n')}`
}

// 生成单个组件的文档
const generateComponentDoc = async (componentPath) => {
  try {
    const parsed = await parse(componentPath)
    const componentName = parsed.displayName || path.basename(componentPath, '.vue')

    const documentation = `# ${componentName}

${parsed.description || '暂无组件描述'}

## 使用示例

${generateExample(componentName, parsed.props)}

## 属性说明

${generatePropsTable(parsed.props)}

## 事件说明

${generateEventsTable(parsed.events)}

## 插槽说明

${generateSlotsTable(parsed.slots)}

## 方法说明

${generateMethodsTable(parsed.methods)}

## 贡献者

${parsed.tags?.author?.map(author => `- ${author.description}`).join('\n') || '暂无贡献者信息'}

## 更新日志

${parsed.tags?.version?.map(version => `- ${version.description}`).join('\n') || '暂无更新日志'}
`

    // 修改输出路径逻辑
    const relativePath = path.relative(path.join(process.cwd(), 'src/components'), componentPath)
    const outputPath = path.join(process.cwd(), 'docs/components', relativePath).replace('.vue', '.md')
    
    // 确保输出目录存在
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, documentation, 'utf-8')
    
    // 获取相对于docs目录的路径，用于生成索引
    const docRelativePath = path.relative(path.join(process.cwd(), 'docs'), outputPath)
    
    console.log(`✅ 成功生成文档: ${outputPath}`)
    return { name: componentName, path: docRelativePath }
  } catch (error) {
    console.error(`❌ 生成文档失败 ${componentPath}:`, error)
    return null
  }
}

// 递归获取所有 Vue 组件文件
const getVueFiles = (dir) => {
  let results = []
  const list = fs.readdirSync(dir, { withFileTypes: true })
  
  list.forEach((dirent) => {
    const fullPath = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      results = results.concat(getVueFiles(fullPath))
    } else if (dirent.name.endsWith('.vue')) {
      results.push(fullPath)
    }
  })
  
  return results
}

// 生成目录索引
const generateIndex = (components) => {
  const validComponents = components.filter(Boolean)
  const index = `# 组件文档索引

本文档包含了所有可用组件的详细说明。

## 组件列表

${validComponents.map(comp => `- [${comp.name}](./${comp.path})`).join('\n')}

## 快速开始

1. 安装组件库：
\`\`\`bash
npm install xin_yu
\`\`\`

2. 在你的项目中引入组件：
\`\`\`js
import { createApp } from 'vue'
import MyComponents from 'xin_yu'
import 'xin_yu/dist/style.css'

const app = createApp(App)
app.use(MyComponents)
app.mount('#app')
\`\`\`

## 贡献指南

如果你想为组件库贡献代码，请参考我们的[贡献指南](../CONTRIBUTING.md)。

## 版本历史

详细的版本历史请查看[更新日志](../CHANGELOG.md)。
`

  fs.writeFileSync('docs/index.md', index, 'utf-8')
  console.log('✅ 成功生成文档索引')
}

// 主函数
const main = async () => {
  console.log('📚 开始生成组件文档...')
  
  // 确保文档目录存在
  fs.mkdirSync('docs/components', { recursive: true })
  
  // 获取所有组件文件
  const componentsDir = path.join(process.cwd(), 'src/components')
  const componentFiles = getVueFiles(componentsDir)
  
  // 生成所有组件的文档
  const results = await Promise.all(componentFiles.map(file => generateComponentDoc(file)))
  
  // 生成索引
  generateIndex(results)
  
  console.log('✨ 文档生成完成！')
}

main().catch(error => {
  console.error('❌ 文档生成失败:', error)
  process.exit(1)
})