// src/utils/auto-import.js
const importComponentFiles = () => {
    // 主组件导入
    const mainComponents = import.meta.glob(
        [
            '../components/**/[A-Z]*.vue', // 匹配大驼峰命名的组件
            '!../components/**/*Demo.vue', // 排除Demo组件
            '!../components/**/__tests__/*.vue',
            '!../components/**/examples/*.vue'
        ], {
            eager: true,
            import: 'default'
        }
    )

    // Demo组件单独导入
    const demoComponents = import.meta.glob(
        '../components/**/*Demo.vue',
        {
            eager: true,
            import: 'default'
        }
    )

    // 处理主组件
    const mainComponentList = Object.entries(mainComponents)
        .map(([filePath, component]) => {
            const name = generateComponentName(filePath, component, false)
            if (!validateComponent(component, filePath, name)) return null
            
            return {
                ...component,
                name: component.name || name
            }
        })
        .filter(Boolean)

    // 处理Demo组件
    const demoComponentList = Object.entries(demoComponents)
        .map(([filePath, component]) => {
            const name = generateComponentName(filePath, component, true)
            if (!validateComponent(component, filePath, name)) return null
            
            return {
                ...component,
                name: component.name || name,
                __isDemo: true // 标记为Demo组件
            }
        })
        .filter(Boolean)

    return [...mainComponentList, ...demoComponentList]
}

// 生成组件名
const generateComponentName = (filePath, component, isDemo) => {
    const pathSegments = filePath
        .replace('../components/', '')
        .replace(/\.vue$/, '')
        .split('/')

    const baseName = pathSegments.pop()
    
    // Demo组件特殊处理
    if (isDemo) {
        const parentDir = pathSegments[pathSegments.length - 1]
        return `${parentDir}Demo` // 例如: ButtonDemo
    }

    // 主组件处理
    const namespace = pathSegments
        .map(seg => seg.replace(/^\w/, c => c.toUpperCase()))
        .join('')

    return namespace ? `${namespace}${baseName}` : baseName
}

// 加强验证逻辑
const validateComponent = (component, filePath, generatedName) => {
    if (!component) {
        console.warn(`[auto-import] 无效组件: ${filePath}`)
        return false
    }

    // 确保组件有name选项
    if (!component.name) {
        component.name = generatedName
        console.warn(`[auto-import] 缺失组件名: ${filePath}，已使用: ${generatedName}`)
    }

    // 检查命名冲突
    if (component.name.includes('_') || component.name.includes('-')) {
        console.error(`[auto-import] 无效组件名: ${component.name} (${filePath})`)
        return false
    }

    return true
}

export { importComponentFiles }