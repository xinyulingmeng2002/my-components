// scripts/create-component.js
import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];
if (!componentName) {
  console.error('请提供组件名称，例如: npm run create-component Button');
  process.exit(1);
}

const componentDir = path.join('src/components', componentName);
const files = {
  'index.js': `import ${componentName} from './${componentName}.vue'\n\nexport default ${componentName}\n`,
  [`${componentName}.vue`]: `<script setup>
defineProps({
  // 添加你的 props
})

defineEmits([''])
</script>

<template>
  <div class="${componentName.toLowerCase()}">
    <!-- 组件内容 -->
  </div>
</template>

<style scoped>
.${componentName.toLowerCase()} {
  /* 基础样式 */
}
</style>
`
};

// 创建目录和文件
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

Object.entries(files).forEach(([fileName, content]) => {
  const filePath = path.join(componentDir, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ 创建文件: ${filePath}`);
  } else {
    console.log(`⏩ 跳过已存在文件: ${filePath}`);
  }
});