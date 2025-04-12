# Playground 集成指南

## 如何将交互式 Playground 与组件库集成

### 1. 组件文档要求

所有组件必须包含完整的 JSDoc 注释，特别是 Props 定义：

```javascript
props: {
  /**
   * 组件标题
   * @type {string}
   * @default '默认标题'
   */
  title: {
    type: String,
    default: '默认标题'
  }
}
```

### 2. 目录结构

```
src/
  playground/            # Playground 实现
    components/         # Playground 专用组件
    store/             # 状态管理
    utils/             # 工具函数
docs/
  playground/          # Playground 文档
  components/         # 组件文档
```

### 3. 启用 Playground

1. 在组件库入口文件中注册 Playground 组件：

```javascript
import Playground from './playground/Playground.vue'

export default {
  install(app) {
    app.component('ComponentPlayground', Playground)
  }
}
```

### 4. 使用示例

在文档中嵌入 Playground：

```markdown
## 示例

<ComponentPlayground component="Button" />
```

### 5. 配置选项

通过 `usePlayground` 配置默认组件：

```javascript
const { code, propInputs } = usePlayground('Button', {
  defaultCode: '<template><Button>点击我</Button></template>'
})
```

### 最佳实践

1. 为每个组件提供默认示例代码
2. 确保 Props 类型定义完整
3. 添加详细的描述和示例
4. 定期更新 Playground 示例
