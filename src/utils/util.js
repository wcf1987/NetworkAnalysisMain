const customElements = ['bpmn:StartEvent', 'bpmn:EndEvent'] // 自定义元素的类型
const STATICPATH = 'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/' // 静态文件路径
const customConfig = { // 自定义元素的配置
    'bpmn:StartEvent': {
        'field': 'start',
        'title': '起点',
        'url':require('@/assets/start.png'),
        'attr': { x: 0, y: 0, width: 40, height: 40 },

    },
    'bpmn:EndEvent': {
        'field': 'end',
        'title': '目的',
        'url':require('@/assets/end.png'),
        'attr': { x: 0, y: 0, width: 40, height: 40 },

    },

}
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent', 'bpmn:ExclusiveGateway', 'bpmn:DataObjectReference'] // 一开始就有label标签的元素类型

const flowAction = {
    type: 'global-connect-tool',
    action: ['bpmn:SequenceFlow', 'tools', 'icon-custom icon-custom-flow', '连接线']
}
const customShapeAction = [{
        type: 'create.start-event',
        action: ['bpmn:StartEvent', 'event', 'icon-custom icon-custom-start', '开始节点']
    },
    {
        type: 'create.end-event',
        action: ['bpmn:EndEvent', 'event', 'icon-custom icon-custom-end', '结束节点']
    },

]
const customFlowAction = [
        flowAction
    ]
    /**
     * 循环创建出一系列的元素
     * @param {Array} actions 元素集合
     * @param {Object} fn 处理的函数
     */
export function batchCreateCustom(actions, fn) {
    const customs = {}
    actions.forEach(item => {
        customs[item['type']] = fn(...item['action'])
    })
    return customs
}


export { customElements, customConfig, STATICPATH, hasLabelElements, customShapeAction, customFlowAction }