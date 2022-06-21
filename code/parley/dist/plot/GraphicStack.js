import { GraphicLayer } from "./GraphicLayer.js";
export class GraphicStack {
    graphicDiv;
    graphicContainer;
    graphicBase;
    graphicHighlight;
    graphicUser;
    id;
    width;
    height;
    static count = 0;
    static incrementCount = () => {
        this.count++;
    };
    constructor() {
        this.id = `plot${GraphicStack.count}`;
        this.graphicDiv = document.querySelector(".graphicDiv");
        this.graphicContainer = document.createElement("div");
        this.initialize();
        GraphicStack.incrementCount();
    }
    initialize() {
        this.graphicDiv.appendChild(this.graphicContainer);
        this.graphicContainer.setAttribute("class", "graphicContainer");
        this.graphicContainer.setAttribute("id", this.id);
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
