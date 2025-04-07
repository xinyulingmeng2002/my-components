// src/utils/auto-import.js
const importComponentFiles = () => {
    const componentMap =
        import.meta.glob(
            // 匹配新的组件目录结构
            [
                '../components/**/*.vue', // 主组件
                '!../components/**/__tests__/*.vue', // 排除测试文件
                '!../components/**/examples/*.vue' // 排除示例文件
            ], {
                eager: true, // 同步加载提升性能
                import: 'default' // 直接获取默认导出
            }
        )

    return Object.entries(componentMap)
        .map(([filePath, component]) => {
            // 生成规范化的组件名
            const name = generateComponentName(filePath, component)

            // 跳过无效组件
            if (!validateComponent(component, filePath)) return null

            return {
                ...component,
                name: component.name || name
            }
        })
        .filter(Boolean)
}

// 生成符合组件库规范的名称
const generateComponentName = (filePath, component) => {
    const pathSegments = filePath
        .replace('../components/', '')
        .replace(/\.vue$/, '')
        .split('/')

    // 转换命名格式 MyComponent/MyComponent.vue → MyComponent
    const baseName = pathSegments
        .pop()
        .replace(/(\.vue|\.js)$/, '')

    // 添加命名空间（目录名）防止冲突
    const namespace = pathSegments
        .map(seg => seg.replace(/^\w/, c => c.toUpperCase()))
        .join('')

    return namespace ?
        `${namespace}${baseName}` :
        baseName
}

// 组件验证逻辑
const validateComponent = (component, filePath) => {
    if (!component) {
        console.warn(`[auto-import] 无效组件: ${filePath}`);
        return false;
    }

    if (!component.name) {
        // 自动生成组件名
        const generatedName = generateComponentName(filePath, component);
        component.name = generatedName;
        console.warn(`[auto-import] 缺失组件名: ${filePath}，已生成组件名: ${generatedName}`);
    }

    return true;
}

export { importComponentFiles }