const unique = (x) => {
  return Array.from(new Set(x));
};

const round = (x, digits) => {
  return Number(Math.round(x + "e+" + digits) + "e-" + digits);
};

// Gauss-Jordan elimination algorithm: solves Ax = b
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

// Find the point where a line running parallel with the x-axis
// from point x intersects a vector that starts from the specified origin
const pointOfIntersection = (x, origin, vector) => {
  const b = x.map((e, i) => e + origin[i]);
  return gaussJordan([[-1, 0], vector], b);
};

// Find IF a line running parallel with the x-axis from a point x
// intersects a vector that starts from the specified origin
const pointIntersects = (x, origin, vector) => {
  return pointOfIntersection(x, origin, vector)[1] / vector[1] < 1;
};

export { round, unique, gaussJordan, pointOfIntersection, pointIntersects };
