export class RectDragHandler {
  dragging: boolean;
  dragNodes: { start: [number, number]; end: [number, number] };
  callbacks: (() => void)[];

  constructor() {
    this.dragging = false;
    this.dragNodes = { start: [0, 0], end: [0, 0] };
    this.callbacks = [];
  }

  startDrag = (event: { offsetX: number; offsetY: number }) => {
    this.dragging = true;
    this.dragNodes.start = [event.offsetX, event.offsetY];
  };

  whileDrag = (event: { offsetX: number; offsetY: number }) => {
    if (this.dragging) {
      this.dragNodes.end = [event.offsetX, event.offsetY];
      this.notifyAll();
    }
  };

  endDrag = () => {
    this.dragging = false;
  };

  registerCallback = (callback: () => void) => {
    this.callbacks.push(callback);
    return this;
  };

  notifyAll = () => {
    this.callbacks.forEach((e) => e());
  };
}
