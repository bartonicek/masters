import { Handler } from "./Handler.js";
export class StateHandler extends Handler {
    keypressHandler;
    plotIds;
    plotsActive;
    plotContainers;
    validModes;
    modeKeys;
    constructor() {
        super();
        this.plotIds = [];
        this.plotsActive = [];
        this.plotContainers = [];
        this.validModes = ["or", "group1", "group2"];
        this.modeKeys = ["ShiftLeft", "Digit1", "Digit2"];
    }
    activate = (id) => {
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
    isActive = (id) => {
        return this.plotsActive[this.plotIds.indexOf(id)];
    };
    inMode = (mode) => {
        const { keypressHandler, validModes, modeKeys } = this;
        return keypressHandler.isPressed(modeKeys[validModes.indexOf(mode)]);
    };
}
