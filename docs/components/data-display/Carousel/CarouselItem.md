# CarouselItem

轮播图子项组件

## 使用示例

```vue
<template>
  <CarouselItem
      lazyLoad="示例lazyLoad"
      width="示例width"
      height="示例height"
  />
</template>

<script setup>
import { CarouselItem } from 'xin_yu'
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
| lazyLoad | boolean | 'true' | 否 | 是否启用图片懒加载 |
| width | string | 'null' | 否 | 自定义宽度 |
| height | string | 'null' | 否 | 自定义高度 |

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
