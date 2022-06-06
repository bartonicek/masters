import { Handler } from "./Handler.js";
export class KeypressHandler extends Handler {
    last;
    current;
    constructor() {
        super();
        this.callbacks = [];
        this.last = "";
        this.current = "";
        this.actions = ["keydown", "keyup"];
        this.consequences = ["keyPressed", "keyReleased"];
    }
    keyPressed = (event) => {
        this.current = event.code;
        this.last = event.code;
    };
    keyReleased = (event) => {
        this.current = "";
    };
}
