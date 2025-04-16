# SideBar

侧边栏组件

## 使用示例

```vue
<template>
  <SideBar
      width="示例width"
      position="示例position"
      collapsible="示例collapsible"
  />
</template>

<script setup>
import { SideBar } from 'xin_yu'
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
| width | union | '250' | 否 | 侧边栏宽度 |
| position | string | ''left'' | 否 | 侧边栏位置 |
| collapsible | boolean | 'false' | 否 | 是否可折叠 |

## 事件说明

| 事件名 | 参数 | 描述 |
|--------|------|------|
| toggle | - | - |

## 插槽说明

组件没有定义任何插槽。

## 方法说明

组件没有定义任何公开方法。

## 贡献者

暂无贡献者信息

## 更新日志

暂无更新日志
