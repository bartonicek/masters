// class Marker {
//   constructor(n) {
//     this.selected = Array.from(Array(n), (e) => false);
//     this.callBacks = {};
//   }

//   registerCallback(callback, name) {
//     this.callBacks[name] = callback;
//   }
// }

// class Plot {
//   constructor(x) {
//     this.x = x;
//   }

//   incrementX = () => {
//     this.x *= 2;
//   };
// }

// const x = 5;

// const marker1 = new Marker(20);
// const plot1 = new Plot(x);

// console.log(plot1.x);
// marker1.registerCallback(plot1.incrementX, "incrementX");
// marker1.callBacks.incrementX();
// console.log(plot1.x);

// console.log(Object.keys(marker1.callBacks));

const A = [
  [1, 0],
  [2, 4],
];
const b = [1, -1];

const gaussJordan = (A, b) => {
  for (let i = 0; i < A.length; i++) {
    const z = A[i][i];
    A[i] = A[i].map((e) => e / z);
    b[i] = b[i] / z;
    for (let j = i + 1; j < A.length; j++) {
      const w = A[j][i] / z;
      A[j] = A[j].map((e, k) => e - w * A[i][k]);
      b[j] = b[j] - w * b[i];
    }
  }
  return b;
};

const pointOfIntersection = (x, origin, vector) => {
  const b = x.map((e, i) => e + origin[i]);
  return gaussJordan([[-1, 0], vector], b);
};

const pointIntersects = (x, origin, vector) => {
  return pointOfIntersection(x, origin, vector)[1] / vector[1] < 1;
};

console.log(pointOfIntersection([-1, 1], [0, 0], [2, 2]));
console.log(pointIntersects([-1, 1], [0, 0], [2, 2]));
