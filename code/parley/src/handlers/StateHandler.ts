import { Handler } from "./Handler.js";
import { KeypressHandler } from "./KeypressHandler.js";

export class StateHandler extends Handler {
  keypressHandler: KeypressHandler;
  plotIds: string[];
  plotsActive: boolean[];
  plotContainers: any[];
  validModes: string[];
  modeKeys: string[];

  constructor() {
    super();
    this.plotIds = [];
    this.plotsActive = [];
    this.plotContainers = [];
    this.validModes = ["or", "group1", "group2"];
    this.modeKeys = ["ShiftLeft", "Digit1", "Digit2"];
  }

  activate = (id: string) => {
    this.plotsActive[this.plotIds.indexOf(id)] = true;
    this.plotContainers[this.plotIds.indexOf(id)].classList.add("active");
  };

  activateAll = () => {
    this.plotsActive.fill(true);
    this.plotContainers.forEach((e) => e.classList.add("active"));
  };

  deactivateAll = () => {
    this.plotsActive.fill(false);
    this.plotContainers.forEach((e) => e.classList.remove("active"));
  };

  isActive = (id: string) => {
    return this.plotsActive[this.plotIds.indexOf(id)];
  };

  inMode = (mode: typeof this.validModes[number]) => {
    const { keypressHandler, validModes, modeKeys } = this;
    return keypressHandler.isPressed(modeKeys[validModes.indexOf(mode)]);
  };
}
