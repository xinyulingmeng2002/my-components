# Carousel

轮播组件，用于循环播放图片、文字等内容。支持自动播放、手动切换、指示器显示等功能。

## 使用示例

### 基础用法
```vue
<template>
  <Carousel
    :interval="3000"
    :autoplay="true"
    :showArrows="true"
    indicatorPosition="bottom"
    transition="slide"
    :loop="true"
  >
    <CarouselItem v-for="(image, index) in images" :key="index">
      <img :src="image.url" :alt="image.alt" style="width: 100%; height: 100%; object-fit: contain;">
    </CarouselItem>
  </Carousel>
</template>

<script setup>
import { Carousel, CarouselItem } from 'my-components'

// 在你的项目中定义图片数组
const images = [
  {
    url: '/path/to/your/image1.jpg',
    alt: '图片1描述'
  },
  {
    url: '/path/to/your/image2.jpg',
    alt: '图片2描述'
  },
  {
    url: 'https://example.com/image3.jpg', // 也可以使用在线图片
    alt: '图片3描述'
  }
]
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 300px;
}
</style>
```

### 自定义内容
```vue
<template>
  <Carousel>
    <CarouselItem>
      <div class="custom-slide">
        <h2>标题1</h2>
        <p>自定义内容1</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="custom-slide">
        <h2>标题2</h2>
        <p>自定义内容2</p>
      </div>
    </CarouselItem>
  </Carousel>
</template>

<style scoped>
.custom-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f5f5f5;
}
</style>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 是否必填 | 描述 |
|--------|------|--------|----------|------|
| interval | number | 3000 | 否 | 轮播间隔时间（毫秒） |
| autoplay | boolean | true | 否 | 是否自动播放 |
| showArrows | boolean | true | 否 | 是否显示箭头按钮 |
| indicatorPosition | string | bottom | 否 | 指示器位置，可选值：top/bottom/left/right |
| transition | string | slide | 否 | 过渡效果，可选值：slide/fade |
| loop | boolean | true | 否 | 是否循环播放 |

## 事件说明

| 事件名 | 参数 | 描述 |
|--------|------|------|
| change | index: number | 轮播项改变时触发，返回当前项的索引 |
| update:active | index: number | 当前激活项改变时触发，返回当前项的索引 |

## 插槽说明

| 插槽名 | 参数 | 描述 |
|--------|------|------|
| default | - | 默认插槽，用于放置 CarouselItem 组件 |

## 方法说明

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| prev | - | void | 切换到上一项 |
| next | - | void | 切换到下一项 |
| setActiveIndex | index: number | void | 设置当前激活项的索引 |
| startAutoPlay | - | void | 开始自动播放 |
| pause | - | void | 暂停自动播放 |

## 图片资源使用说明

由于组件库不包含图片资源，你需要在使用轮播图组件时提供自己的图片。以下是几种推荐的图片使用方式：

### 1. 本地图片
```vue
<script setup>
import localImage1 from '@/assets/images/slide1.jpg'
import localImage2 from '@/assets/images/slide2.jpg'

const images = [
  { url: localImage1, alt: '图片1' },
  { url: localImage2, alt: '图片2' }
]
</script>
```

### 2. 公共目录图片
```vue
<script setup>
const images = [
  { url: '/images/slide1.jpg', alt: '图片1' }, // 存放在 public/images 目录
  { url: '/images/slide2.jpg', alt: '图片2' }
]
</script>
```

### 3. 在线图片
```vue
<script setup>
const images = [
  { url: 'https://your-cdn.com/images/slide1.jpg', alt: '图片1' },
  { url: 'https://your-cdn.com/images/slide2.jpg', alt: '图片2' }
]
</script>
```

### 4. 动态加载图片
```vue
<script setup>
import { ref, onMounted } from 'vue'

const images = ref([])

onMounted(async () => {
  // 从API获取图片列表
  const response = await fetch('your-api-endpoint')
  images.value = await response.json()
})
</script>
```

## 注意事项

1. 确保设置合适的容器高度，否则可能导致显示异常
2. 在移动端使用时，建议将 `showArrows` 设置为 false
3. 当内容较多时，建议将 `interval` 设置得更长一些
4. 支持键盘方向键控制切换
5. 图片资源建议进行适当的压缩和优化，以提高加载性能
6. 建议为图片设置合适的 alt 属性，提高可访问性
7. 使用本地图片时，确保图片路径正确且图片已正确打包
8. 使用在线图片时，建议使用可靠的CDN服务

## 贡献者

暂无贡献者信息

## 更新日志

暂无更新日志