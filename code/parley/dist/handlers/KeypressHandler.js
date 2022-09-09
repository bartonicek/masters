import { Handler } from "./Handler.js";
export class KeypressHandler extends Handler {
    validKeys;
    lastPressed;
    currentlyPressed;
    constructor() {
        super();
        this.callbacks = [];
        this.validKeys = [
            "Equal",
            "Minus",
            "BracketLeft",
            "BracketRight",
            "ControlLeft",
            "ShiftLeft",
            "KeyR",
            "Digit1",
            "Digit2",
        ];
        this.lastPressed = "";
        this.currentlyPressed = Array(this.validKeys.length).fill(false);
        this.actions = ["keydown", "keyup"];
        this.consequences = ["keyPressed", "keyReleased"];
        // Register key press/release behavior on the document body
        this.actions.forEach((action, i) => {
            document.body.addEventListener(action, (event) => this[this.consequences[i]](event));
        });
    }
    get currentlyPressedKeys() {
        return this.validKeys.filter((_, i) => this.currentlyPressed[i]);
    }
    keyPressed = (event) => {
        if (this.validKeys.includes(event.code)) {
            this.lastPressed = event.code;
            this.currentlyPressed[this.validKeys.indexOf(event.code)] = true;
            this.notifyAll("keyPressed");
        }
    };
    keyReleased = (event) => {
        if (this.validKeys.includes(event.code)) {
            this.currentlyPressed[this.validKeys.indexOf(event.code)] = false;
            this.notifyAll("keyReleased");
        }
    };
    isPressed = (key) => {
        return this.currentlyPressed.filter((_, i) => this.validKeys[i] === key)[0];
    };
}
