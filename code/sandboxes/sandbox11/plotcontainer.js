export class PlotContainer {
  constructor() {
    this.plotContainer = document.createElement("div");
    this.#initialize();
  }

  #initialize() {
    document.body.appendChild(this.plotContainer);
    this.plotContainer.setAttribute("class", "plotContainer");

    this.width = parseInt(getComputedStyle(this.plotContainer).width, 10);
    this.height = parseInt(getComputedStyle(this.plotContainer).height, 10);

    const layers = ["plotBase", "plotHighlight", "plotUser"];
    layers.forEach((e) => this.#makeLayer(e));

    this.plotBase.save();
    this.plotBase.fillStyle = "antiquewhite";
    this.plotBase.fillRect(0, 0, this.width, this.height);
    this.plotBase.restore();
  }

  #makeLayer(name) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    this[name] = context;
    this[name].width = this.width;
    this[name].height = this.height;
    this.plotContainer.appendChild(canvas);

    canvas.width = this.width;
    canvas.height = this.height;
  }
}
