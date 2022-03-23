const unique = (x) => {
  return Array.from(new Set(x));
};

const round = (x, digits) => {
  return Number(Math.round(x + "e+" + digits) + "e-" + digits);
};

export { round, unique };
