export class ClickHandler {
  constructor(plotContainer, marker) {
    this.plotContainer = plotContainer;
    this.marker = marker;

    this.initialize();
  }

  unselect() {
    this.marker.receive([]);
  }

  // initialize() {
  //   const actions = ["dblclick"];
  //   const consequences = ["unselect"];

  //   actions.forEach((action, index) => {
  //     this.plotContainer.addEventListener(action, (event) => {
  //       this[consequences[index]](event);
  //     });
  //   });
  // }
}
