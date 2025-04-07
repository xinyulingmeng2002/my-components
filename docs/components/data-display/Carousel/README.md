
# 轮播图组件说明

本项目提供了两种轮播图组件，分别适用于不同的使用场景：

## 1. Carousel 组件（完整版）

### 特点
- 功能完整的轮播图组件
- 支持箭头导航和指示器
- 支持键盘控制
- 支持触摸滑动
- 支持多种过渡效果（slide/fade）
- 完整的无障碍访问支持
- 支持自定义宽高比

### 使用场景
- 需要完整轮播功能的场景
- 需要良好的无障碍支持
- 需要键盘控制功能
- 需要多种过渡效果

```vue
<template>
  <Carousel
    :autoplay="true"
    :interval="3000"
    :showArrows="true"
    :showIndicators="true"
    transition="slide"
    :loop="true"
    height="300px"
    aspectRatio="16/9"
  >
    <CarouselItem v-for="(item, index) in items" :key="index">
      <img :src="item.src" :alt="item.alt" />
    </CarouselItem>
  </Carousel>
</template>
```

## 2. SimpleCarousel 组件（简单版）

### 特点
- 轻量级实现
- 简单的图片轮播功能
- 基础的指示器
- 自动循环播放
- 基础的无障碍支持

### 使用场景
- 只需要基础轮播功能的场景
- 追求轻量级实现
- 主要用于图片展示
- 不需要复杂交互的场景

```vue
<template>
  <SimpleCarousel
    :images="images"
    :autoPlay="true"
    :interval="3000"
  />
</template>

<script>
import { SimpleCarousel } from 'your-component-library'

export default {
  components: {
    SimpleCarousel
  },
  data() {
    return {
      images: [
        // 方式1：使用本地图片
        require('@/assets/image1.jpg'),
        // 方式2：使用在线图片URL
        'https://example.com/image2.jpg',
        // 方式3：使用Base64图片
        'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
      ]
    }
  }
}
</script>
```

## 图片引入说明

### 1. 本地图片引入
```js
// 方式1：使用require
const images = [
  require('@/assets/image1.jpg'),
  require('@/assets/image2.jpg')
]

// 方式2：使用import
import image1 from '@/assets/image1.jpg'
import image2 from '@/assets/image2.jpg'
const images = [image1, image2]
```

### 2. 在线图片URL
```js
const images = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
]
```

### 3. Base64图片
```js
const images = [
  'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  'data:image/jpeg;base64,/9j/4BBQSkZJRg...'
]
```

## 组件选择建议

1. 选择 Carousel（完整版）如果你：
   - 需要完整的轮播功能
   - 项目对无障碍访问有较高要求
   - 需要键盘控制支持
   - 需要自定义过渡效果

2. 选择 SimpleCarousel（简单版）如果你：
   - 只需要基础的图片轮播功能
   - 追求更轻量级的实现
   - 不需要复杂的交互功能
   - 主要用于简单的图片展示

## 注意事项

1. 图片资源处理：
   - 确保构建工具正确配置了图片加载器
   - 在线图片需要考虑跨域访问问题
   - 建议图片尺寸保持一致

2. 性能优化：
   - 使用适当大小的图片
   - 考虑使用图片懒加载
   - 适当压缩图片以提高加载速度

3. 无障碍访问：
   - 两个组件都支持基本的屏幕阅读器功能
   - 完整版提供更全面的无障碍支持