import { GraphicLayer } from "../plot/GraphicLayer.js";
import { Auxiliary } from "./Auxiliary.js";

export class RectDragBox extends Auxiliary {
  drawUser = (context: GraphicLayer) => {
    if (this.handler.dragging) {
      context.drawClear();
      const { start, end } = this.handler.dragNodes;
      context.drawWindow(start, end);
    } else {
      context.drawClear();
    }
  };
}
