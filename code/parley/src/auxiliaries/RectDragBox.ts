import * as funs from "../functions.js";
import { GraphicLayer } from "../plot/GraphicLayer.js";
import { Plot } from "../plot/Plot.js";
import { Auxiliary } from "./Auxiliary.js";

export class RectDragBox extends Auxiliary {
  bgDrawn: boolean;

  constructor(handlers: object) {
    super();
    this.handlers = handlers;
    this.bgDrawn = false;
  }

  draw = (
    context: GraphicLayer,
    points: [[number, number], [number, number]]
  ) => {
    context.drawWindow(
      [points[0][0], points[0][1]],
      [points[1][0], points[1][1]]
    );
  };

  drawUser = (context: GraphicLayer) => {
    const { dragging, selectionCurrent, selectionArray } = this.handlers.drag;

    if (dragging && Plot.globalModes.or) {
      context.drawClear();
      context.drawDim();
      selectionArray.forEach((points) => {
        this.draw(context, points);
      });
      this.draw(context, selectionCurrent);
    } else if (dragging) {
      context.drawClear();
      context.drawDim();
      this.draw(context, selectionCurrent);
    } else {
      context.drawClear();
    }
  };
}
