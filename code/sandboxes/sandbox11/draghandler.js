export class DragHandler {
  constructor() {
    this.dragging = false;
    this.points = { a0: 0, a1: 0, b0: 0, b1: 0 };
    this.callbacks = [];
  }

  startDrag(event) {
    this.dragging = true;
    this.points.a0 = event.offsetX;
    this.points.b0 = event.offsetY;
  }

  whileDrag(event) {
    if (this.dragging === true) {
      this.points.a1 = event.offsetX;
      this.points.b1 = event.offsetY;
      this.notifyAll(this.points);
    }
  }

  endDrag(event) {
    this.dragging = false;
  }

  registerCallback(callback) {
    this.callbacks.push(callback);
  }

  notifyAll() {
    const self = this;
    this.callbacks.forEach((e) => e(self));
  }
}
