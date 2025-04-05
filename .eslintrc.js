export default {
    env: {
        browser: true, // 支持浏览器环境
        es2021: true, // 支持 ES2021 语法（包括可选链操作符）
    },
    extends: [
        'plugin:vue/vue3-recommended', // 使用 Vue 3 的推荐规则
        'eslint:recommended', // 使用 ESLint 的推荐规则
    ],
    parserOptions: {
        ecmaVersion: 2021, // 支持 ES2021 语法
        sourceType: 'module', // 支持 ES 模块
    },
    rules: {
        'vue/multi-word-component-names': 'off', // 关闭多单词组件名称的限制
    },
};