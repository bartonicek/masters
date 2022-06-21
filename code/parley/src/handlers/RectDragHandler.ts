import { Handler } from "./Handler.js";
import * as funs from "../functions.js";

export class RectDragHandler extends Handler {
  dragging: boolean;
  selectionPoints: [[number, number], [number, number]];
  selectionArray: number[];

  constructor() {
    super();
    this.dragging = false;
    this.selectionPoints = [
      [0, 0],
      [0, 0],
    ];
    this.selectionArray = [];
    this.callbacks = [];
    this.actions = ["mousedown", "mousemove", "mouseup"];
    this.consequences = ["startDrag", "whileDrag", "endDrag"];
  }

  startDrag = (event: { offsetX: number; offsetY: number }) => {
    this.dragging = true;
    this.selectionPoints[0] = [event.offsetX, event.offsetY];
  };

  whileDrag = (event: { offsetX: number; offsetY: number }) => {
    if (this.dragging) {
      this.selectionPoints[1] = [event.offsetX, event.offsetY];
      this.notifyAll();
    }
  };

  endDrag = () => {
    this.dragging = false;
  };
}
