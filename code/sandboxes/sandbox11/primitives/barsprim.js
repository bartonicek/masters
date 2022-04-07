export class BarsPrimitive {
  static draw(
    context,
    x,
    y,
    y0,
    col = "steelblue",
    width = 20,
    redraw = false
  ) {
    context.save();
    context.fillStyle = col;

    if (redraw === true) context.clearRect(0, 0, context.width, context.height);

    x.forEach((e, i) => {
      context.fillRect(e, y0 - y[i], width, y[i]);
    });

    context.restore();
  }
}
