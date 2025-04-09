# 组件文档索引

本文档包含了所有可用组件的详细说明。

## 组件列表

- [Button](./components\common\Button\Button.md)
- [ButtonDemo](./components\common\Button\ButtonDemo.md)
- [Tab](./components\common\Tabs\Tab.md)
- [Tabs](./components\common\Tabs\Tabs.md)
- [Arrows](./components\data-display\Carousel\Arrows.md)
- [Carousel](./components\data-display\Carousel\Carousel.md)
- [CarouselItem](./components\data-display\Carousel\CarouselItem.md)
- [Indicators](./components\data-display\Carousel\Indicators.md)
- [MultiItemCarousel](./components\data-display\NewCarousel\SimpleCarousel.md)
- [SideBar](./components\data-display\SideBar\SideBar.md)
- [CodeBlock](./components\layout\CodeBlock\CodeBlock.md)
- [PreviewBlock](./components\layout\PreviewBlock\PreviewBlock.md)
- [SiderBar](./components\layout\SiderBar\SiderBar.md)
- [Test-1](./components\Test-1\Test-1.md)

## 快速开始

1. 安装组件库：
```bash
npm install my-components
```

2. 在你的项目中引入组件：
```js
import { createApp } from 'vue'
import MyComponents from 'my-components'
import 'my-components/dist/style.css'

const app = createApp(App)
app.use(MyComponents)
app.mount('#app')
```

## 贡献指南

如果你想为组件库贡献代码，请参考我们的[贡献指南](../CONTRIBUTING.md)。

## 版本历史

详细的版本历史请查看[更新日志](../CHANGELOG.md)。
