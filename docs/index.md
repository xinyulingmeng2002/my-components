# 组件文档索引

本文档包含了所有可用组件的详细说明。

## 组件列表

- [Button](./components\common\Button\Button.md)
- [ButtonDemo](./components\common\Button\ButtonDemo.md)
- [Tab](./components\common\Tabs\Tab.md)
- [Tabs](./components\common\Tabs\Tabs.md)
- [TabsDemo](./components\common\Tabs\TabsDemo.md)
- [Arrows](./components\data-display\Carousel\Arrows.md)
- [Carousel](./components\data-display\Carousel\Carousel.md)
- [CarouselDemo](./components\data-display\Carousel\CarouselDemo.md)
- [CarouselItem](./components\data-display\Carousel\CarouselItem.md)
- [Indicators](./components\data-display\Carousel\Indicators.md)
- [MultiItemCarousel](./components\data-display\NewCarousel\SimpleCarousel.md)
- [SideBar](./components\data-display\SideBar\SideBar.md)
- [SideBarDemo](./components\data-display\SideBar\SideBarDemo.md)
- [CodeBlock](./components\layout\CodeBlock\CodeBlock.md)
- [CodeBlockDemo](./components\layout\CodeBlock\CodeBlockDemo.md)
- [PreviewBlock](./components\layout\PreviewBlock\PreviewBlock.md)
- [PreviewBlockDemo](./components\layout\PreviewBlock\PreviewBlockDemo.md)
- [SiderBar](./components\layout\SiderBar\SiderBar.md)
- [Test-1](./components\Test-1\Test-1.md)

## 快速开始

1. 安装组件库：
```bash
npm install xin_yu
```

2. 在你的项目中引入组件：
```js
import { createApp } from 'vue'
import MyComponents from 'xin_yu'
import 'xin_yu/dist/style.css'

const app = createApp(App)
app.use(MyComponents)
app.mount('#app')
```

## 贡献指南

如果你想为组件库贡献代码，请参考我们的[贡献指南](../CONTRIBUTING.md)。

## 版本历史

详细的版本历史请查看[更新日志](../CHANGELOG.md)。
