import { Handler } from "./Handler.js";

export class KeypressHandler extends Handler {
  last: string;
  current: string;
  validKeys: string[];

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

  keyPressed = (event: { code: string }) => {
    if (this.validKeys.includes(event.code)) {
      this.current = event.code;
      this.last = event.code;
      this.notifyAll("keyPressed");
    }
  };

  keyReleased = (event: { code: string }) => {
    this.current = "";
    this.notifyAll("keyReleased");
  };
}
