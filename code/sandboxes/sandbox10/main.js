import { Plot } from "./plot.js";

const getData = async (path) => {
  const response = await fetch(path);
  return response.json();
};

const data1 = await getData("mtcars.json");
const n = data1.mpg.length;

const mapping1 = new Map([
  ["x", "wt"],
  ["y", "mpg"],
]);

const mapping2 = new Map([
  ["x", "wt"],
  ["y", "disp"],
]);

const mapping3 = new Map([
  ["x", "cyl"],
  ["y", "disp"],
]);

class Marker {
  constructor(n) {
    this.selected = Array.from(Array(n)).map((e) => false);
  }

  receive(selectedPoints) {
    this.selected = this.selected.map((e, i) => {
      return selectedPoints.includes(i);
    });

    Object.keys(plots).forEach((e) => {
      plots[e].drawHighlight(plots[e].plotHighlight, this.selected);
      plots[e].drawUser(plots[e].plotUser);
    });
  }
}

const marker1 = new Marker(n);

const plot1 = new Plot(data1, mapping1, marker1);
const plot2 = new Plot(data1, mapping2, marker1);
const plot3 = new Plot(data1, mapping3, marker1);
const plots = { plot1, plot2, plot3 };
