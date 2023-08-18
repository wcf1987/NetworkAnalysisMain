
import { PolylineEdgeModel, PolylineEdge, h } from "@logicflow/core"
//import { BezierEdgeModel, BezierEdge, h } from "@logicflow/core"
class CustomLine extends PolylineEdge {
    // 官网指示：由于边的编辑复杂度问题，绝大多数情况下，自定义边时不推荐自定义view
}


 class CustomLineModel extends PolylineEdgeModel {
      constructor (data, graphModel) {
        super(data, graphModel)
      }
      setHovered (isHovered) {
        super.setHovered(isHovered);
        this.isAnimation = isHovered;
      }
      setAttributes() {
        //  this.isAnimation = true;
      }

     getEdgeAnimationStyle() {
        const style = super.getEdgeAnimationStyle();
        style.strokeDasharray = "5 5";
        style.animationDuration = "10s";
        return style;
      }
    }

export default {
  type: 'line',
  model: CustomLineModel,
  view: CustomLine
}
