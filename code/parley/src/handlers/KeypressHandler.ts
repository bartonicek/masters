import { Handler } from "./Handler.js";

export class KeypressHandler extends Handler {
  lastPressed: string;
  pressing: string;

  constructor() {
    super();
    this.callbacks = [];
    this.lastPressed = "";
    this.pressing = "";
    this.actions = ["keydown", "keyup"];
    this.consequences = ["keyPressed", "keyReleased"];
  }

  keyPressed = (event: { code: string }) => {
    this.pressing = event.code;
    console.log(event.code);
  };
}
