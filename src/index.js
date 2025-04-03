// src/index.js
import importComponentFiles from './components/auto-import.js';
import './styles/base.css';
import './styles/components.css';

// 初始化默认主题
import { applyTheme } from './styles/theme/theme-manager'; // 主题管理器
import { useGlobalConfig } from './config'; // 全局配置

applyTheme('light');

const install = async (app) => {
  const components = await importComponentFiles();
  components.forEach(component => {
    if (component.name) {
      app.component(component.name, component);
      app.provide('globalConfig', useGlobalConfig.globalConfig);
    }
  });
};

// 支持全局安装
export default install;