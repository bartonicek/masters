import { Handler } from "./Handler.js";

export class KeypressHandler extends Handler {
  last: string;
  current: string;

  constructor() {
    super();
    this.callbacks = [];
    this.last = "";
    this.current = "";
    this.actions = ["keydown", "keyup"];
    this.consequences = ["keyPressed", "keyReleased"];
  }

  keyPressed = (event: { code: string }) => {
    this.current = event.code;
    this.last = event.code;
  };

  keyReleased = (event: { code: string }) => {
    this.current = "";
  };
}
