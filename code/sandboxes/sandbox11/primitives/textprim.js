export class TextPrimitive {
  static draw(
    context,
    x,
    y,
    text,
    col = "black",
    just = "centre",
    font = "10px Arial"
  ) {
    context.save();
    context.font = font;
    const m =
      text.length > 1
        ? text.map((e) => context.measureText(e))
        : context.measureText(text);

    context.restore();
  }
}
