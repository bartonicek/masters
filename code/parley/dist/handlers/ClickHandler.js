import { Handler } from "./Handler.js";
export class ClickHandler extends Handler {
    container;
    holding;
    clickCurrent;
    clickLast;
    //clickArray: [number, number][];
    constructor(container) {
        super();
        this.container = container;
        this.holding = false;
        this.clickCurrent = [null, null];
        this.clickLast = [null, null];
        this.actions = ["mousedown", "mouseup"];
        this.consequences = ["mouseDown", "mouseUp"];
        // Register key press/release behavior on the document body
        this.actions.forEach((action, i) => {
            this.container.addEventListener(action, (event) => this[this.consequences[i]](event));
        });
    }
    mouseDown = (event) => {
        this.holding = true;
        this.clickCurrent = [event.offsetX, event.offsetY];
        this.clickLast = [event.offsetX, event.offsetY];
        this.notifyAll("mouseDown");
    };
    mouseUp = (event) => {
        this.holding = false;
        this.clickCurrent = [null, null];
        this.notifyAll("mouseUp");
    };
}
