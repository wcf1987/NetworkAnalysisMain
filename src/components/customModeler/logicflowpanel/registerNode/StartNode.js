import { h } from '@logicflow/core'
import BaseNode from "./BaseNode"

class AppNode extends BaseNode.view {
  getIcon () {
    const {
      width,
      height,
    } = this.props.model;
    return h('image', {
      width: 24,
      height: 24,
      x: - width / 2+3,
      y: - height / 2+3,
      href: 'panelnode/7.svg'
    })
  }
}

class AppNodeModel extends BaseNode.model {
  initNodeData (data) {
    super.initNodeData(data)
    this.defaultFill = 'rgb(202,243,161)'
  }
}

export default {
  type: 'start',
  model: AppNodeModel,
  view: AppNode
}
