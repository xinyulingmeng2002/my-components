import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// 判断是否为组件库模式
const isLibMode = process.env.BUILD_MODE === 'lib';

console.log(`Building in ${isLibMode ? 'Library' : 'Development'} mode...`);

// 定义别名
const alias = {
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@styles': path.resolve(__dirname, 'src/styles')
};


// 组件库模式配置
const libBuildConfig = {
    lib: {
        entry: path.resolve(__dirname, 'src/index.js'), // 组件库入口文件
        name: 'xin_yu', // 库的全局名称
        fileName: (format) => `xin_yu.${format}.js` // 输出文件名格式
    },
    rollupOptions: {
        external: ['vue'], // 不打包 Vue，作为外部依赖
        output: {
            exports: 'named', // 修复导出警告   
            globals: {
                vue: 'Vue' // 在 UMD 模式下，Vue 会作为全局变量
            }
        }
    }
};

// 正常模式配置
const normalBuildConfig = {
    outDir: 'dist', // 输出目录
    rollupOptions: {
        input: path.resolve(__dirname, 'index.html') // 指定入口 HTML 文件
    }
};

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000, // 指定一个未被占用的端口
        fs: {
            strict: false // 允许访问node_modules
        }
    },
    assetsInclude: ['**/*.worker.js'], // 确保worker文件被正确处理
    test: {
        globals: true, // 允许使用全局的 describe 和 test 函数
        environment: 'jsdom' // 如果你在测试 Vue 组件，通常需要 jsdom 环境
    },
    resolve: {
        alias
    },
    build: isLibMode ? libBuildConfig : normalBuildConfig,
    chunkSizeWarningLimit: 1000 // 设置 chunk 大小警告的限制
});