import { Handler } from "./Handler.js";
import * as funs from "../functions.js";

export class RectDragHandler extends Handler {
  dragging: boolean;
  modeOR: boolean;
  selectionPoints: [[number, number], [number, number]];
  selectionArray: [[number, number], [number, number]][];

  constructor() {
    super();
    this.dragging = false;
    this.modeOR = false;
    this.selectionPoints = [
      [0, 0],
      [0, 0],
    ];
    this.selectionArray = [];
    this.actions = ["mousedown", "mousemove", "mouseup"];
    this.consequences = ["startDrag", "whileDrag", "endDrag"];
  }

  startDrag = (event: { offsetX: number; offsetY: number }) => {
    const { modeOR, selectionPoints, selectionArray } = this;
    if (modeOR) selectionArray.push([selectionPoints[0], selectionPoints[1]]);
    this.dragging = true;
    selectionPoints[0] = [event.offsetX, event.offsetY];
  };

  whileDrag = (event: { offsetX: number; offsetY: number }) => {
    const { dragging, selectionPoints, notifyAll } = this;
    if (dragging) {
      selectionPoints[1] = [event.offsetX, event.offsetY];
      notifyAll("whileDrag");
    }
  };

  endDrag = () => {
    this.notifyAll("endDrag");
    this.dragging = false;
  };

  onKeyPress = (key: string) => {
    const { dragging, selectionArray, selectionPoints } = this;
    if (key === "ShiftLeft") {
      this.modeOR = true;
    }
  };

  onKeyRelease = (key: string) => {
    if (key === "ShiftLeft") {
      this.modeOR = false;
    }
  };

  onDoubleClick = () => {
    this.selectionArray = [];
    this.selectionPoints = [
      [0, 0],
      [0, 0],
    ];
  };
}
