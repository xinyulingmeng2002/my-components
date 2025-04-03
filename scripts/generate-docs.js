// scripts/generate-docs.js
const fs = require('fs')
const path = require('path')
const { VuedocParser } = require('@vuedoc/parser')
const { md } = require('@vuedoc/md')

async function generateDoc(componentPath) {
  const content = fs.readFileSync(componentPath, 'utf8')
  
  const parsed = await VuedocParser.parse({
    filename: path.basename(componentPath),
    filecontent: content
  })

  const documentation = md(parsed)
  
  const outputPath = componentPath
    .replace('src/components', 'docs')
    .replace('.vue', '.md')
  
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, documentation)
  console.log(`📚 生成文档: ${outputPath}`)
}

// 遍历所有组件
const componentsDir = path.join(__dirname, '../src/components')
fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const compDir = path.join(componentsDir, dirent.name)
    const vueFile = path.join(compDir, `${dirent.name}.vue`)
    if (fs.existsSync(vueFile)) {
      generateDoc(vueFile)
    }
  })