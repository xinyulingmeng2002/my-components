import SimpleCarousel from './SimpleCarousel.vue'

// // 为组件添加安装方法
// SimpleCarousel.install = function(app) { // app是createApp()创建的Vue实例
//     app.component(SimpleCarousel.name, SimpleCarousel) // 注册组件
// }

export default SimpleCarousel  // 导出方式一：默认导出
export { SimpleCarousel }  // 导出方式二：命名导出