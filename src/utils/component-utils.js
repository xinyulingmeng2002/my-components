/**
 * 从 Vue 组件中提取 Props 定义
 * @param {Object} component - Vue 组件选项
 * @returns {Object} Props 配置对象
 */
export const getComponentProps = (component) => {
  if (!component.props) {
    return {}
  }

  // 处理 Options API 和 Composition API 的不同格式
  const props = typeof component.props === 'function' 
    ? component.props() 
    : component.props

  const result = {}

  for (const [key, config] of Object.entries(props)) {
    // 标准化 Props 配置
    result[key] = {
      type: getPropType(config),
      default: getPropDefaultValue(config),
      required: config.required || false,
      validator: config.validator,
      description: getPropDescription(component, key)
    }
  }

  return result
}

/**
 * 获取 Props 类型信息
 */
const getPropType = (config) => {
  if (Array.isArray(config)) {
    return { name: 'Array' }
  }
  
  if (config && config.type) {
    return {
      name: Array.isArray(config.type) 
        ? config.type.map(t => t?.name).join('|') 
        : config.type.name
    }
  }

  return { name: 'String' } // 默认类型
}

/**
 * 获取 Props 默认值
 */
const getPropDefaultValue = (config) => {
  if (typeof config === 'function') {
    return config()
  }

  if (config && typeof config.default !== 'undefined') {
    return typeof config.default === 'function'
      ? config.default()
      : config.default
  }

  return undefined
}

/**
 * 从组件注释中提取 Props 描述
 */
const getPropDescription = (component, propName) => {
  const prop = component.props[propName]
  if (!prop) return ''
  
  // 从 JSDoc 注释中提取描述
  if (prop.__jsdoc) {
    return prop.__jsdoc.description || ''
  }
  
  // 从组件注释中提取
  const scriptContent = component.__fileContent || ''
  const propRegex = new RegExp(`\\s*${propName}:\\s*{[^}]*__jsdoc[^}]*}`)
  const match = scriptContent.match(propRegex)
  
  if (match) {
    const jsdocMatch = match[0].match(/\/\*\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//)
    if (jsdocMatch) {
      return jsdocMatch[0]
        .replace(/^\s*\/\*\*\s*/, '')
        .replace(/\s*\*+\/\s*$/, '')
        .replace(/^\s*\*\s*/gm, '')
        .trim()
    }
  }
  
  return ''
}
