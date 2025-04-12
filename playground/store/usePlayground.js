import { ref, computed } from 'vue'
import { getComponentProps } from '../../utils/component-utils'

export const usePlayground = (componentName) => {
  const code = ref('<template><MyComponent /></template>')
  const propsConfig = ref({})
  const propsValues = ref({})
  const error = ref(null)
  
  // 动态加载目标组件
  const loadComponent = async () => {
    try {
      error.value = null
      const component = await import(`@components/${componentName}/index.js`)
      propsConfig.value = getComponentProps(component.default)
      
      // 初始化默认值
      propsValues.value = Object.fromEntries(
        Object.entries(propsConfig.value).map(([key, config]) => [
          key, 
          config.default !== undefined ? config.default : 
            config.type === Boolean ? false :
            config.type === Number ? 0 :
            config.type === Array ? [] :
            config.type === Object ? {} :
            ''
        ])
      )
    } catch (err) {
      error.value = `组件加载失败: ${err.message}`
      console.error('加载组件失败:', err)
    }
  }
  
  // 生成 Props 编辑界面配置
  const propInputs = computed(() => {
    return Object.entries(propsConfig.value).map(([key, config]) => ({
      name: key,
      type: config.type?.name.toLowerCase() || 'string',
      defaultValue: config.default,
      description: config.description || '',
      options: config.options,
      required: config.required || false,
      validator: config.validator,
      itemType: config.itemType,
      properties: config.properties
    }))
  })
  
  // 更新 Props 值
  const updatePropValue = (key, value) => {
    const config = propsConfig.value[key]
    
    // 类型验证
    if (config.validator && !config.validator(value)) {
      console.warn(`Invalid value for prop ${key}:`, value)
      return
    }
    
    propsValues.value[key] = value
  }
  
  return { 
    code, 
    propInputs, 
    propsValues,
    error,
    loadComponent,
    updatePropValue
  }
}