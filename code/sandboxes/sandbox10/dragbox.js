export class DragBox {
  constructor(plotContainer, dragHandler) {
    this.dragHandler = dragHandler;
  }

  drawUser(context) {
    if (this.dragHandler.dragging) {
      context.clearRect(0, 0, 400, 400);
      const { a0, a1, b0, b1 } = this.dragHandler;
      context.fillStyle = "rgba(100, 100, 100, 0.1)";
      context.strokeStyle = "rgba(100, 100, 100, 0.25)";
      context.fillRect(a0, b0, a1 - a0, b1 - b0);
      context.strokeRect(a0, b0, a1 - a0, b1 - b0);
    } else if (!this.dragHandler.dragging) {
      context.clearRect(0, 0, 400, 400);
    }
  }
}
