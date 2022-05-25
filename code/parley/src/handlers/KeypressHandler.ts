import { Handler } from "./Handler.js";

export class KeypressHandler extends Handler {
  lastPressed: string;

  constructor() {
    super();
    this.callbacks = [];
    this.lastPressed = "";
    // this.actions = ["keyup"];
    // this.consequences = ["reportKey"];
  }

  reportKey = (event: { code: string }) => {
    this.lastPressed = event.code;
    this.notifyAll();
  };
}
