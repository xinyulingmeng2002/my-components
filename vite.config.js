import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // 指定一个未被占用的端口
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // build: {
  //   lib: {
  //     entry: resolve(__dirname, 'src/index.js'),
  //     name: 'MyComponents',
  //     fileName: (format) => `my-components.${format}.js`
  //   },
  //   rollupOptions: { // 新增rollup配置
  //     external: ['vue'],
  //     output: {
  //       globals: {
  //         vue: 'Vue'
  //       },
  //       // 新增手动分割配置
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) return 'vendor'
  //         if (id.includes('components/')) {
  //           const match = id.match(/components\/(\w+)/)
  //           return match ? `chunk-${match[1]}` : null
  //         }
  //       }
  //     }
  //   }
  // },
  // // 新增开发配置
  // root: './playground',
  // publicDir: '../public'
})