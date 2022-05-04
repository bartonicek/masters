import { GraphicLayer } from "./GraphicLayer.js";

export class GraphicStack {
  graphicContainer: HTMLDivElement;
  graphicBase: any;
  graphicHighlight: any;
  graphicUser: any;
  width: number;
  height: number;

  constructor() {
    this.graphicContainer = document.createElement("div");
    this.initialize();
  }

  initialize() {
    document.body.appendChild(this.graphicContainer);
    this.graphicContainer.setAttribute("class", "graphicContainer");

    this.width = parseInt(getComputedStyle(this.graphicContainer).width, 10);
    this.height = parseInt(getComputedStyle(this.graphicContainer).height, 10);

    const graphicLayers = ["graphicBase", "graphicHighlight", "graphicUser"];
    graphicLayers.forEach((e) => {
      this[e] = new GraphicLayer(this.width, this.height);
      this.graphicContainer.appendChild(this[e].canvas);
    });
    this.graphicBase.drawBackground();
  }
}
