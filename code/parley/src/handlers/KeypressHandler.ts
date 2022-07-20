import { Handler } from "./Handler.js";

export class KeypressHandler extends Handler {
  validKeys: string[];
  lastPressed: string;
  currentlyPressed: boolean[];

  constructor() {
    super();
    this.callbacks = [];
    this.validKeys = [
      "Equal",
      "Minus",
      "BracketLeft",
      "BracketRight",
      "ShiftLeft",
      "KeyR",
    ];
    this.lastPressed = "";
    this.currentlyPressed = Array(this.validKeys.length).fill(false);
    this.actions = ["keydown", "keyup"];
    this.consequences = ["keyPressed", "keyReleased"];
  }

  keyPressed = (event: { code: string }) => {
    if (this.validKeys.includes(event.code)) {
      this.lastPressed = event.code;
      this.currentlyPressed[event.code] = true;
      this.notifyAll("keyPressed");
    }
  };

  keyReleased = (event: { code: string }) => {
    if (this.validKeys.includes(event.code)) {
      this.currentlyPressed[event.code] = false;
      this.notifyAll("keyReleased");
    }
  };

  isPressed = (key: string) => {
    return !!this.currentlyPressed.filter((_, i) => this.validKeys[i] === key);
  };
}
