import SimpleCarousel from './SimpleCarousel.vue'

// 为组件添加安装方法
SimpleCarousel.install = function(app) {
    app.component(SimpleCarousel.name, SimpleCarousel)
}

export default SimpleCarousel
export { SimpleCarousel }