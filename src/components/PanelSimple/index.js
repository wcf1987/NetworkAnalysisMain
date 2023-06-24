// 省略 modeler 部分引入


// 引入自定义属性编辑组件的构造函数
import MagicPropertiesProvider from './MagicPropertiesProvider'

// 组成符合 ModuleDefinition 格式的对应 (可以像官方实例那样放到一个 index 文件内部)
export default {
    __init__: ['magicPropertiesProvider'],
    magicPropertiesProvider: ['type', MagicPropertiesProvider]
}

