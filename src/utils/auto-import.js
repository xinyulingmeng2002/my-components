// src/utils/auto-import.js
const importComponentFiles = () => {
    // 主组件导入
    const mainComponents = import.meta.glob(
        [
            '../components/**/[A-Z]*.vue', // 匹配大驼峰命名的组件
            '!../components/**/*Demo.vue', // 排除Demo组件
            '!../components/**/__tests__/*.vue', // 排除测试文件
            '!../components/**/examples/*.vue' // 排除示例文件
        ], {
            eager: true, // 立即导入
            import: 'default' // 导入默认导出
        }
    )

    // Demo组件单独导入
    const demoComponents = import.meta.glob(
        '../components/**/*Demo.vue', // 匹配所有Demo组件
        {
            eager: true, // 立即导入
            import: 'default' // 导入默认导出
        }
    )

    // 处理主组件
    const mainComponentList = Object.entries(mainComponents)
        .map(([filePath, component]) => {
            // 生成组件名称
            const name = generateComponentName(filePath, component, false)
            // 验证组件
            if (!validateComponent(component, filePath, name)) return null
            
            return {
                ...component, // 展开组件对象
                name: component.name || name // 使用组件默认名称或生成的名称
            }
        })
        .filter(Boolean) // 过滤掉无效的组件

    // 处理Demo组件
    const demoComponentList = Object.entries(demoComponents)
        .map(([filePath, component]) => {
            // 生成组件名称
            const name = generateComponentName(filePath, component, true)
            // 验证组件
            if (!validateComponent(component, filePath, name)) return null
            
            return {
                ...component, // 展开组件对象
                name: component.name || name, // 使用组件默认名称或生成的名称
                __isDemo: true // 标记为Demo组件
            }
        })
        .filter(Boolean) // 过滤掉无效的组件

    // 打印已导入的主组件和Demo组件名称
    // console.log('[auto-import] 已导入组件:', mainComponentList.map(c => c.name))
    // console.log('[auto-import] 已导入Demo组件:', demoComponentList.map(c => c.name))
    // 返回所有组件列表
    return [...mainComponentList, ...demoComponentList]
}

// 生成组件名
// 定义一个函数 generateComponentName，用于生成组件名称
const generateComponentName = (filePath, component, isDemo) => {
    // 将文件路径中的 '../components/' 替换为空字符串，并移除文件扩展名 '.vue'
    const pathSegments = filePath
        .replace('../components/', '')
        .replace(/\.vue$/, '')
        .split('/') // 将路径分割成多个部分

    // 获取路径的最后一部分作为基础名称
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
// 定义一个函数 validateComponent 用于验证组件的有效性
const validateComponent = (component, filePath, generatedName) => {
    // 检查组件是否存在，如果不存在则输出警告并返回false
    if (!component) {
        console.warn(`[auto-import] 无效组件: ${filePath}`)
        return false
    }

    // 确保组件有name选项，如果没有则使用生成的名称，并输出警告
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