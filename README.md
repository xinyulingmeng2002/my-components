my-components/
├── src/
│   ├── components/         
│   │   ├── Button/
│   │   │   ├── Button.vue  
│   │   │   └── index.js    
│   ├── styles/            
│   └── index.js           # 库入口文件
├── vite.config.js
└── package.json

一、 组件开发规范

1. 命名规范：

    组件文件名：PascalCase（如 DatePicker.vue）

    组件注册名：统一前缀（如 MyDatePicker）

2. Props 设计原则：

    使用对象形式定义 prop 验证

    为数值类型提供默认值

    使用 validator 进行枚举验证

3. 事件管理：

    使用 kebab-case 事件名（如 update:model-value）

    在 emits 选项中明确声明事件

4. 插槽规范：

    命名插槽使用 kebab-case

    提供插槽使用示例

5. 文档注释：

<script setup>
/**
 * 按钮组件
 * @displayName MyButton
 * @requires 需要依赖外部样式表
 */
defineProps({
  /** 按钮类型 */
  type: { /* ... */ }
})
</script>


二、 组件库更新策略
1. 版本管理：
bash

    npm version patch  # 小版本更新
    npm version minor  # 功能更新
    npm version major  # 重大更新

2. 更新日志：

    创建 CHANGELOG.md，记录重要变更

3. 本地更新流程：
bash

# 在组件库目录
    npm run build
    npm version patch
    npm link

# 在使用项目目录
    npm unlink my-component-library
    npm link my-component-library


三、 组件中Tab组件使用示例：
<MyTabs>
  <template #header>
    <button @click="activeTab = 'tab1'">Tab 1</button>  # 自定义 Tab 标题
    <button @click="activeTab = 'tab2'">Tab 2</button>  
  </template>
  
  <MyTab name="tab1">内容1</MyTab>  # 自定义 Tab 内容
  <MyTab name="tab2">内容2</MyTab>
</MyTabs>

四、按需加载：
1. // vite.config.js
export default defineConfig({  
  build: {  
    rollupOptions: {    // 通过 rollupOptions 配置手动分块
      output: {          // 手动分块
        manualChunks(id) {  // 自定义分块
          if (id.includes('node_modules')) return 'vendor'  // 第三方库
          if (id.includes('components/')) {  // 组件库
            const match = id.match(/components\/(\w+)/)  // 匹配组件名
            return match ? `chunk-${match[1]}` : null  // 生成 chunk-组件名
          }
        }
      }
    }
  }
})
2. 动态导入示例：
// 使用场景：路由级懒加载
const AsyncComponent = defineAsyncComponent(() =>  // 通过 defineAsyncComponent 定义异步组件
  import('./components/HeavyComponent.vue')  // 通过异步组件实现懒加载
)

3. 按需加载组件：
// 使用场景：按需加载组件
import { defineAsyncComponent } from 'vue'
import { Button } from 'my-component-library'

export default {
  components: {
    Button,
    AsyncComponent: defineAsyncComponent(() => import('my-component-library/AsyncComponent'))  //详细注释：按需加载组件，通过defineAsyncComponent函数实现异步组件的按需加载，并返回一个Promise对象，该Promise对象在组件加载完成后被resolve，并返回加载的组件。 具体实现是通过import()函数来动态导入组件，并通过then方法来处理加载后的组件。
  }
}

五、无障碍访问增强：
1. 键盘导航支持示例：
<script setup>
import { onMounted } from 'vue'

const listItems = ref([])

onMounted(() => {
  const handleKeydown = (e) => {
    // 实现方向键导航
  }
  listItems.value.forEach(item => {
    item.addEventListener('keydown', handleKeydown)
  })
})
</script>

<template>
  <ul role="menu">
    <li 
      v-for="(item, index) in items"
      :key="index"
      role="menuitem"
      tabindex="0"
      :ref="el => listItems[index] = el"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

2. ARIA 属性规范：
ARIA（Accessible Rich Internet Applications）是一个用于增强网页和应用程序的可访问性的标准。它提供了一套用于描述网页内容、控件和交互的属性和角色。
<template>
  <div 
    role="dialog"
    aria-labelledby="dialogTitle"
    aria-describedby="dialogDesc"
  >
    <h2 id="dialogTitle">标题</h2>
    <p id="dialogDesc">描述内容</p>
  </div>
</template>
