export class StateHandler {
    keypressHandler;
    constructor(keypressHandler) {
        this.keypressHandler = keypressHandler;
    }
    get or() {
        return this.keypressHandler.isPressed("or");
    }
}
