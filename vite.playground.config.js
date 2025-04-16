import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: 'playground', // 设置根目录为 playground 文件夹
  base: '/', // 基础路径
  plugins: [vue()],
  server: {
    port: 3001
  }
});