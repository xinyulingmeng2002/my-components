# Carousel

轮播图组件

## 使用示例

```vue
<template>
  <Carousel
      interval="示例interval"
      autoplay="示例autoplay"
      showArrows="示例showArrows"
      showIndicators="示例showIndicators"
      indicatorPosition="示例indicatorPosition"
      transition="示例transition"
      loop="示例loop"
      height="示例height"
      aspectRatio="示例aspectRatio"
  />
</template>

<script setup>
import { Carousel } from 'xin_yu'
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
| interval | number | '3000' | 否 | 自动播放间隔时间(毫秒) |
| autoplay | boolean | 'true' | 否 | 是否自动播放 |
| showArrows | boolean | 'true' | 否 | 是否显示导航箭头 |
| showIndicators | boolean | 'true' | 否 | 是否显示指示器 |
| indicatorPosition | string | ''bottom'' | 否 | 指示器位置 |
| transition | string | ''slide'' | 否 | 过渡效果 |
| loop | boolean | 'true' | 否 | 是否循环播放 |
| height | string | ''300px'' | 否 | 自定义高度 |
| aspectRatio | string | ''16/9'' | 否 | 宽高比(格式: "16/9") |

## 事件说明

| 事件名 | 参数 | 描述 |
|--------|------|------|
| change | - | - |
| update:active | - | - |

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
