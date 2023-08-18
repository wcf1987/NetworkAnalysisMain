import { h } from '@logicflow/core'
import BaseNode from "./BaseNode"

class AppNode extends BaseNode.view {
  getIcon () {
    const {
      width,
      height,
    } = this.props.model;
    return h('image', {
      width: 26,
      height: 26,
      x: - width / 2+2,
      y: - height / 2+2,
      href: 'panelnode/3.svg'
    })
  }
}

class AppNodeModel extends BaseNode.model {
  initNodeData (data) {
    super.initNodeData(data)
    this.defaultFill = 'rgb(239,172,243)'
  }
}

export default {
  type: 'package',
  model: AppNodeModel,
  view: AppNode
}
