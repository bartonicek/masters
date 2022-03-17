import { Axis } from "./axis.js";
import { ClickHandler } from "./clickhandler.js";
import { DragBox } from "./dragbox.js";
import { DragHandler } from "./draghandler.js";
import { PlotContainer } from "./plotcontainer.js";
import { Points } from "./points.js";
import { XYScale } from "./scales.js";

export class Plot extends PlotContainer {
  constructor(data, mapping, marker) {
    super();
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;

    this.scales = {
      x: new XYScale(
        Math.min(...this.data[this.mapping.get("x")]),
        Math.max(...this.data[this.mapping.get("x")]),
        this.width
      ),
      y: new XYScale(
        Math.min(...this.data[this.mapping.get("y")]),
        Math.max(...this.data[this.mapping.get("y")]),
        this.height,
        -1
      ),
    };

    this.objects = {
      points1: new Points(this.data, this.mapping, this.scales),
      axis1: new Axis(this.scales),
    };

    this.dragHandler = new DragHandler(
      this.plotContainer,
      this.objects.points1.boundingRects,
      this.marker
    );
    this.clickHandler = new ClickHandler(this.plotContainer, this.marker);

    this.initialize();
  }

  drawBase(base) {
    Object.keys(this.objects).forEach((e) => {
      this.objects[e]?.drawBase?.call(this.objects[e], base);
    });
  }

  drawHighlight(highlight, selected) {
    Object.keys(this.objects).forEach((e) => {
      this.objects[e]?.drawHighlight?.call(
        this.objects[e],
        highlight,
        selected
      );
    });
  }

  drawUser(user) {
    Object.keys(this.objects).forEach((e) => {
      this.objects[e]?.drawUser?.call(this.objects[e], user);
    });
  }

  initialize() {
    this.drawBase(this.plotBase);
    this.objects.dragBox1 = new DragBox(this.plotContainer, this.dragHandler);
  }
}
