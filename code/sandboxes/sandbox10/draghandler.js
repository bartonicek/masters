export class DragHandler {
  constructor(plotContainer, boundingRects, marker) {
    this.plotContainer = plotContainer;
    this.boundingRects = boundingRects;
    this.marker = marker;
    this.n = this.boundingRects.x0.length;

    this.dragging = false;
    this.a0 = 0;
    this.a1 = 0;
    this.b0 = 0;
    this.b1 = 0;

    this.initialize();
  }

  pointIn(x, y, a0, a1, b0, b1) {
    return (x - a0) * (x - a1) < 0 && (y - b0) * (y - b1) < 0;
  }

  boundingRectsSelected() {
    const { a0, a1, b0, b1 } = this;
    const { x0, y0, x1, y1 } = this.boundingRects;
    let arr = Array.from(Array(this.n), (e, i) => i);

    const pointInAB = (x, y) => this.pointIn(x, y, a0, a1, b0, b1);

    // Check if at least one of the points of the
    // bounding rectangle is within the selection
    arr = arr.filter((e) => {
      return (
        pointInAB(x0[e], y0[e]) ||
        pointInAB(x1[e], y0[e]) ||
        pointInAB(x0[e], y1[e]) ||
        pointInAB(x1[e], y1[e])
      );
    });

    return arr;
  }

  startDrag(event) {
    this.dragging = true;
    this.a0 = event.offsetX;
    this.b0 = event.offsetY;
  }

  whileDrag(event) {
    if (this.dragging === true) {
      this.a1 = event.offsetX;
      this.b1 = event.offsetY;

      this.marker.receive(this.boundingRectsSelected());
    }
  }

  endDrag(event) {
    this.dragging = false;
  }

  initialize() {
    const actions = ["mousedown", "mousemove", "mouseup"];
    const consequences = ["startDrag", "whileDrag", "endDrag"];

    actions.forEach((action, index) => {
      this.plotContainer.addEventListener(action, (event) => {
        this[consequences[index]](event);
      });
    });
  }
}
