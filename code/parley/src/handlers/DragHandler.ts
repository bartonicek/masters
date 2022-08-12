import * as dtstr from "../datastructures.js";
import * as funs from "../functions.js";
import { Handler } from "./Handler.js";
import { StateHandler } from "./StateHandler.js";

export class DragHandler extends Handler {
  state: StateHandler;
  container: HTMLElement;
  empty: boolean;
  dragging: boolean;

  current: dtstr.Rect2Points;

  selectionCurrent: [[number, number], [number, number]];
  selectionLast: [[number, number], [number, number]];
  selectionArray: [[number, number], [number, number]][];

  constructor(container: HTMLElement) {
    super();
    this.container = container;
    this.empty = true;
    this.dragging = false;
    this.current = [
      [null, null],
      [null, null],
    ];
    this.selectionCurrent = [
      [null, null],
      [null, null],
    ];
    this.selectionLast = [
      [null, null],
      [null, null],
    ];
    this.selectionArray = [];
    this.actions = ["mousedown", "mousemove", "mouseup"];
    this.consequences = ["startDrag", "whileDrag", "endDrag"];

    // Register mouse behavior on the container, throttled to 50ms
    this.actions.forEach((action, i) => {
      this.container.addEventListener(
        action,
        funs.throttle(this[this.consequences[i]], 50)
      );
    });
  }

  get lastSelection() {
    return this.selectionLast;
  }

  get lastComplete() {
    return !this.selectionLast.flat().some((e) => e === null);
  }

  startDrag = (event: { offsetX: number; offsetY: number }) => {
    this.dragging = true;
    this.selectionCurrent[0] = [event.offsetX, event.offsetY];

    this.current[0] = [event.offsetX, event.offsetY];
    this.notifyAll("startDrag");

    if (!this.state.inMode("or")) this.clear();
    if (this.state.inMode("or") && this.lastComplete) {
      this.selectionArray.push([this.selectionLast[0], this.selectionLast[1]]);
    }
  };

  whileDrag = (event: { offsetX: number; offsetY: number }) => {
    const { dragging, selectionCurrent, selectionLast, current, notifyAll } =
      this;
    if (dragging) {
      selectionCurrent[1] = [event.offsetX, event.offsetY];
      this.selectionLast = selectionCurrent;
      this.empty = false;

      current[1] = [event.offsetX, event.offsetY];

      const dist =
        (current[0][0] - current[1][0]) ** 2 +
        (current[0][1] - current[1][1]) ** 2;
      if (dist > 50) notifyAll("whileDrag");
    }
  };

  endDrag = () => {
    const { dragging, selectionArray, selectionLast } = this;
    this.dragging = false;
    if (this.state.inMode("or") && this.lastComplete) {
      selectionArray.push([selectionLast[0], selectionLast[1]]);
    }
    this.notifyAll("endDrag");
  };

  clear = () => {
    this.empty = true;
    this.selectionArray = [];
    this.selectionLast = [
      [null, null],
      [null, null],
    ];
  };

  onDoubleClick = () => {
    this.clear();
  };
}
