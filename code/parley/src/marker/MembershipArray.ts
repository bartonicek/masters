export class MembershipArray {
  n: number;
  array: number[];

  constructor(n: number) {
    this.n = n;
    this.array = new Array(n).fill(0);
  }

  clear = () => (this.array = new Array(this.n).fill(0));

  receiveAdd = (points: number[], group: 1 | 2 | 3) => {
    points.forEach((e) => (this.array[e] = group));
  };

  receiveReplace = (points: number[], group: 1 | 2 | 3) => {
    this.clear();
    points.forEach((e) => (this.array[e] = group));
  };
}
