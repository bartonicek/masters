import { Handler } from "./Handler.js";
import * as funs from "../functions.js";

export class RectDragHandler extends Handler {
  dragging: boolean;

  constructor() {
    super();
    this.dragging = false;
    this.selectionPoints = [0, 0, 0, 0];
    this.callbacks = [];
    this.actions = ["mousedown", "mousemove", "mouseup"];
    this.consequences = ["startDrag", "whileDrag", "endDrag"];
  }

  startDrag = (event: { offsetX: number; offsetY: number }) => {
    this.dragging = true;
    this.selectionPoints[0] = event.offsetX;
    this.selectionPoints[2] = event.offsetY;
  };

  whileDrag = (event: { offsetX: number; offsetY: number }) => {
    if (this.dragging) {
      this.selectionPoints[1] = event.offsetX;
      this.selectionPoints[3] = event.offsetY;
      this.notifyAll();
    }
  };

  endDrag = () => {
    this.dragging = false;
  };
}
