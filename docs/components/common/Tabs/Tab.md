# Tab

标签页子组件

## 使用示例

```vue
<template>
  <Tab
      name="示例name"
      title="示例title"
      disabled="示例disabled"
  />
</template>

<script setup>
import { Tab } from 'xin_yu'
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
| name | string |  | 是 | 标签页唯一标识 |
| title | string | '''' | 否 | 标签页标题 |
| disabled | boolean | 'false' | 否 | 是否禁用标签页 |

## 事件说明

组件没有定义任何事件。

## 插槽说明

| 插槽名 | 参数 | 描述 |
|--------|------|------|
| default | - | - |

## 方法说明

组件没有定义任何公开方法。

## 贡献者

暂无贡献者信息

## 更新日志

暂无更新日志
