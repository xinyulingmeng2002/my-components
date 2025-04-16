# PreviewBlock

预览区块组件，用于展示组件示例和代码
包含代码导出功能

## 使用示例

```vue
<template>
  <PreviewBlock
      title="示例title"
      lang="示例lang"
      code="示例code"
  />
</template>

<script setup>
import { PreviewBlock } from 'xin_yu'
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
| title | string |  | 是 | 预览区块标题 |
| lang | string | ''html'' | 否 | 代码语言类型 |
| code | string | '''' | 否 | 示例代码内容 |

## 事件说明

组件没有定义任何事件。

## 插槽说明

| 插槽名 | 参数 | 描述 |
|--------|------|------|
| demo | - | - |
| code | - | - |

## 方法说明

组件没有定义任何公开方法。

## 贡献者

暂无贡献者信息

## 更新日志

暂无更新日志
