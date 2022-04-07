export class LinePrimitive {
  static draw(context, x, y, col = "black", width = 1) {
    context.save();
    context.strokeStyle = col;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(x[0], y[0]);
    x.shift();
    y.shift();
    x.forEach((e, i) => {
      context.lineTo(e, y[i]);
    });
    context.stroke();
    context.restore();
  }
}
