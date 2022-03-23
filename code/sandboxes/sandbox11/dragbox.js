export class DragBox {
  drawUser(context, handler) {
    if (handler.dragging) {
      context.clearRect(0, 0, 400, 400);
      const { a0, a1, b0, b1 } = handler.points;
      context.lineWidth = 0.5;
      context.strokeStyle = "rgba(0, 0, 0, 0.5)";
      context.setLineDash([5, 5]);
      context.strokeRect(a0, b0, a1 - a0, b1 - b0);
    } else if (!handler.dragging) {
      context.clearRect(0, 0, 400, 400);
    }
  }
}
