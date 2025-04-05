// 收集组件
const components = [];

const importComponentFiles = async () => {
    const files =
        import.meta.glob('./**/*.vue'); // 动态导入所有 .vue 文件
    for (const path in files) {
        // 动态导入组件文件
        const componentConfig = await files[path]();
        // 获取组件名，优先使用组件自身定义的 name
        const componentName = componentConfig.default?.name || path.replace(/^\.\//, '').replace(/\.\w+$/, '');
        if (componentName) {
            componentConfig.default.name = componentName; // 确保组件有 name 属性
            components.push(componentConfig.default);
        }
    }
    return components;
};

// 导出收集的组件数据
export default importComponentFiles;