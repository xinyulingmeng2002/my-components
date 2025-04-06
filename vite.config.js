import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// 判断是否为组件库模式
const isLibMode = process.env.BUILD_MODE === 'lib';

console.log(`Building in ${isLibMode ? 'Library' : 'Development'} mode...`);

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000, // 指定一个未被占用的端口
    },
    test: {
        globals: true, // 允许使用全局的 describe 和 test 函数
        environment: 'jsdom', // 如果你在测试 Vue 组件，通常需要 jsdom 环境
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@styles': resolve(__dirname, 'src/styles')
        },
    },
    build: isLibMode ? {
        // 组件库模式配置
        lib: {
            entry: resolve(__dirname, 'src/index.js'), // 组件库入口文件
            name: 'MyComponentLibrary', // 库的全局名称
            fileName: (format) => `my-components.${format}.js`, // 输出文件名格式
        },
        rollupOptions: {
            external: ['vue'], // 不打包 Vue，作为外部依赖
            output: {
                globals: {
                    vue: 'Vue', // 在 UMD 模式下，Vue 会作为全局变量
                },
            },
        },
    } : {
        // 正常模式配置
        outDir: 'dist', // 输出目录
        rollupOptions: {
            input: resolve(__dirname, 'index.html'), // 指定入口 HTML 文件
        },
    },
});