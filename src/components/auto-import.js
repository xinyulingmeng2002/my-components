// const requireComponent = import.meta.glob('./**/*.vue');
// const components = []

// Object.keys(requireComponent).forEach(keyName => {
//   const component = requireComponent[keyName]
//   const key = keyName.split('/').pop().replace(/\.\w+$/, '');
//   components.push({
//     name: 'Auto'+key,
//     component: component
//   })
// }) 


// console.log(components)

// export default components

//收集组件
const components = [];

const importComponentFiles = async () => {
  const files = import.meta.glob('./**/*.vue');
  for (const path in files) {
    // 动态导入组件文件
    const componentConfig = await files[path]();
    // 获取组件名，优先使用组件自身定义的 name
    const componentName = componentConfig.default?.name || path.replace(/^\.\//, '').replace(/\.\w+$/, '');

    components.push(componentConfig.default);
  }
  return components;
};

// 导出收集的组件数据
export default importComponentFiles;


