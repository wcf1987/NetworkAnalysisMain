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
      href: 'panelnode/4.svg'
    })
  }
}

class AppNodeModel extends BaseNode.model {
  initNodeData (data) {
    super.initNodeData(data)
    this.defaultFill = 'rgb(163,191,243)'
  }
}

export default {
  type: 'swich',
  model: AppNodeModel,
  view: AppNode
}
