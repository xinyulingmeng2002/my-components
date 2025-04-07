# CarouselItem

轮播项组件，作为 Carousel 组件的子组件，用于包装轮播内容。

## 使用示例

### 基础用法
```vue
<template>
  <Carousel>
    <!-- 图片轮播 -->
    <CarouselItem v-for="(image, index) in images" :key="index">
      <img 
        :src="image.url" 
        :alt="image.alt"
        class="carousel-image"
      >
    </CarouselItem>
  </Carousel>
</template>

<script setup>
import { Carousel, CarouselItem } from 'my-components'

const images = [
  {
    url: '/images/slide1.jpg',
    alt: '第一张图片'
  },
  {
    url: '/images/slide2.jpg',
    alt: '第二张图片'
  }
]
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片比例并填充容器 */
}
</style>
```

### 自定义内容
```vue
<template>
  <Carousel>
    <!-- 自定义内容轮播 -->
    <CarouselItem>
      <div class="custom-content">
        <h2>标题1</h2>
        <p>这是第一页的内容</p>
        <button @click="handleClick">点击按钮</button>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="custom-content">
        <h2>标题2</h2>
        <p>这是第二页的内容</p>
        <img src="/images/icon.png" alt="图标">
      </div>
    </CarouselItem>
  </Carousel>
</template>

<style scoped>
.custom-content {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
}
</style>
```

## 插槽说明

| 插槽名 | 参数 | 描述 |
|--------|------|------|
| default | - | 默认插槽，用于放置轮播项的内容 |

## 注意事项

1. 图片资源处理：
   - 确保图片资源在项目中可访问
   - 建议使用 `object-fit: cover` 处理图片填充方式
   - 可以使用 `loading="lazy"` 属性实现图片懒加载

2. 样式设置：
   ```css
   /* 推荐的图片样式设置 */
   .carousel-image {
     width: 100%;
     height: 100%;
     object-fit: cover;
     /* 可选：添加过渡效果 */
     transition: transform 0.3s ease;
   }

   /* 自定义内容容器样式 */
   .custom-content {
     height: 100%;
     padding: 20px;
     box-sizing: border-box;
   }
   ```

3. 性能优化：
   - 图片建议进行压缩和优化
   - 可以使用现代图片格式如 WebP
   - 考虑使用响应式图片
   ```html
   <img 
     srcset="small.jpg 300w, medium.jpg 600w, large.jpg 900w"
     sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, 900px"
     src="fallback.jpg"
     alt="响应式图片示例"
   >
   ```

4. 最佳实践：
   ```vue
   <CarouselItem>
     <picture>
       <source srcset="/images/slide.webp" type="image/webp">
       <source srcset="/images/slide.jpg" type="image/jpeg">
       <img 
         src="/images/slide.jpg"
         alt="图片描述"
         loading="lazy"
         class="carousel-image"
       >
     </picture>
   </CarouselItem>
   ```

## 与父组件的关系

CarouselItem 必须作为 Carousel 的直接子组件使用。父组件 Carousel 会自动管理：
- 轮播项的切换
- 过渡动画效果
- 自动播放控制
- 键盘导航支持

## 贡献者

暂无贡献者信息

## 更新日志

暂无更新日志