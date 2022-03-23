import { Axis } from "./axis.js";
import { ClickHandler } from "./clickhandler.js";
import { DragBox } from "./dragbox.js";
import { DragHandler } from "./draghandler.js";
import { PlotContainer } from "./plotcontainer.js";
import { Points } from "./points.js";
import { XYScaleContinuous } from "./scales/XYScaleContinuous.js";
import { XYScaleDiscrete } from "./scales/XYScaleDiscrete.js";
import { unique } from "./stats.js";

export class Plot extends PlotContainer {
  constructor(data, mapping, marker) {
    super();
    this.data = data;
    this.mapping = mapping;
    this.marker = marker;

    this.scales = {
      x:
        unique(this.data[this.mapping.get("x")]).length < 5
          ? new XYScaleDiscrete(this.data[this.mapping.get("x")], this.width)
          : new XYScaleContinuous(this.data[this.mapping.get("x")], this.width),
      y:
        unique(this.data[this.mapping.get("y")]).length < 5
          ? new XYScaleDiscrete(
              this.data[this.mapping.get("y")],
              this.height,
              -1
            )
          : new XYScaleContinuous(
              this.data[this.mapping.get("y")],
              this.height,
              -1
            ),
    };

    this.objects = {
      points1: new Points(this.data, this.mapping, this.scales),
      axis1: new Axis(this.scales),
      dragBox1: new DragBox(),
    };

    this.dragHandler = new DragHandler();
    //this.clickHandler = new ClickHandler(this.plotContainer, this.marker);

    this.initialize();
  }

  drawBase = () => {
    Object.keys(this.objects).forEach((e) => {
      this.objects[e]?.drawBase?.call(this.objects[e], this.plotBase);
    });
  };

  drawHighlight = (marker) => {
    Object.keys(this.objects).forEach((e) => {
      this.objects[e]?.drawHighlight?.call(
        this.objects[e],
        this.plotHighlight,
        marker.selected
      );
    });
  };

  drawUser = (handler) => {
    Object.keys(this.objects).forEach((e) => {
      this.objects[e]?.drawUser?.call(this.objects[e], this.plotUser, handler);
    });
  };

  inSelection = (points) => {
    let set = new Set();
    let sel;

    Object.keys(this.objects).forEach((e) => {
      sel = this.objects[e]?.inSelection?.call(this.objects[e], points);
      if (sel) {
        set = new Set([...set, ...sel]);
      }
    });
    return Array.from(set);
  };

  updateMarker = (points) => {
    this.marker.receive(points);
  };

  onSelection = (handler) => {
    this.updateMarker(this.inSelection(handler.points));
  };

  initialize() {
    this.drawBase();

    const markerCallbacks = ["drawHighlight", "drawUser"];
    markerCallbacks.forEach((e) => this.marker.registerCallback(this[e]));

    const dragHandlerCallbacks = ["onSelection", "drawUser"];
    dragHandlerCallbacks.forEach((e) =>
      this.dragHandler.registerCallback(this[e])
    );

    const actions = ["mousedown", "mousemove", "mouseup"];
    const handlers = ["dragHandler", "dragHandler", "dragHandler"];
    const consequences = ["startDrag", "whileDrag", "endDrag"];

    // For each action, add a listener that handles action event with a consequence
    actions.forEach((action, index) => {
      this.plotContainer.addEventListener(action, (event) => {
        this[handlers[index]][consequences[index]](event);
      });
    });
  }
}
