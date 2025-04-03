1. 2021-09-29 16:50:00 修复了组件库打包后，组件库中引入的组件样式丢失的问题
2. ## Carousel 轮播图

### 功能特性
- 支持自动播放/手动切换
- 移动端触摸滑动
- 多种过渡动画
- 可定制的指示器和导航
- 响应式布局

### 使用示例
```vue
<template>
  <Carousel 
    :interval="5000"
    indicator-position="bottom"
    transition="fade"
  >
    <CarouselItem v-for="item in 3" :key="item">
      <img :src="`/slides/${item}.jpg`">
    </CarouselItem>
  </Carousel>
</template>

API
Props
参数	说明	类型	默认值
interval	自动切换时间(ms)	Number	3000
autoplay	是否自动播放	Boolean	true
showArrows	是否显示导航箭头	Boolean	true
indicatorPosition	指示器位置	String	'bottom'
transition	过渡动画类型	String	'slide'

自定义配置项：
// 支持的 props
{
  interval: 3000,       // 自动切换时间
  autoplay: true,       // 自动播放
  showArrows: true,     // 显示导航箭头
  indicatorPosition: 'bottom', // 指示器位置
  transition: 'slide'   // 过渡动画类型
}

Events
事件名	说明	参数
change	切换时触发	(newIndex, oldIndex)

3. 