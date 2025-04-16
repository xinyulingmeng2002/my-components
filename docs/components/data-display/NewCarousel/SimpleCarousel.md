# MultiItemCarousel

暂无组件描述

## 使用示例

```vue
<template>
  <MultiItemCarousel
      imageIds="示例imageIds"
      images="示例images"
      visibleItems="示例visibleItems"
      autoPlay="示例autoPlay"
      interval="示例interval"
  />
</template>

<script setup>
import { MultiItemCarousel } from 'xin_yu'
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
| imageIds | Array<string> | '[]' | 是 | 图片ID数组，用于标识每张图片 |
| images | Array<string> | '[]' | 是 | 图片URL数组，用于显示轮播图片 |
| visibleItems | number | '3' | 否 | 同时可见的项目数量 |
| autoPlay | boolean | 'true' | 否 | 是否自动播放 |
| interval | number | '3000' | 否 | 自动播放间隔时间(毫秒) |

## 事件说明

| 事件名 | 参数 | 描述 |
|--------|------|------|
| image-click | - | - |

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
