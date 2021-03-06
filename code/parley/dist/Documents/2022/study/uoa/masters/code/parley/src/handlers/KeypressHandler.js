import { Handler } from "./Handler.js";
export class KeypressHandler extends Handler {
    last;
    current;
    validKeys;
    constructor() {
        super();
        this.callbacks = [];
        this.last = "";
        this.current = "";
        this.validKeys = [
            "Equal",
            "Minus",
            "BracketLeft",
            "BracketRight",
            "ShiftLeft",
            "KeyR",
        ];
        this.actions = ["keydown", "keyup"];
        this.consequences = ["keyPressed", "keyReleased"];
    }
    keyPressed = (event) => {
        if (this.validKeys.includes(event.code)) {
            this.current = event.code;
            this.last = event.code;
            this.notifyAll();
        }
    };
    keyReleased = (event) => {
        this.current = "";
        this.notifyAll();
    };
}
