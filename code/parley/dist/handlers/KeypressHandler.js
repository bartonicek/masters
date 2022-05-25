import { Handler } from "./Handler.js";
export class KeypressHandler extends Handler {
    lastPressed;
    constructor() {
        super();
        this.callbacks = [];
        this.lastPressed = "";
        // this.actions = ["keyup"];
        // this.consequences = ["reportKey"];
    }
    reportKey = (event) => {
        this.lastPressed = event.code;
        this.notifyAll();
    };
}
