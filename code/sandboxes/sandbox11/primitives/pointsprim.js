export class PointsPrimitive {
  static draw(context, x, y, col, radius = 5, redraw = false) {
    context.save();
    context.fillStyle = col;

    if (redraw === true) context.clearRect(0, 0, context.width, context.height);

    x.forEach((e, i) => {
      context.beginPath();
      context.arc(e, y[i], radius, 0, Math.PI * 2);
      context.fill();
    });

    context.restore();
  }
}
