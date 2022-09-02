import { mapActions, createNamespacedHelpers } from 'vuex'
import { useActionsMapper } from './useMapper'
import checkType from './checkType.js'

export default (moduleName, mapper) => {
  let mapperFn = mapActions
  if (checkType(moduleName) === '[object String]' && moduleName.length > 0) {
    // createNamespacedHelpers 创建基于某个命名空间辅助函数。
    // 它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  }

  return useActionsMapper(mapper, mapperFn)
}
