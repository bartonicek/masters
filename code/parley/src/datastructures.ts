// Generic vector type has to be dirty otherwise methods like .map()
// and .filter() don't work
type VectorGeneric = (number | string | boolean)[];

type DataFrame = {
  [index: string]: VectorGeneric;
};

type ValidMappings = "x" | "y" | "z" | "size" | "col" | "shape";
type Mapping = Map<ValidMappings, string>;

type ValidMemberships = 1 | 2 | 3;

// Rectangle defined by two [x, y] points
type Rect2Points = [[number, number], [number, number]];

export {
  VectorGeneric,
  DataFrame,
  ValidMappings,
  Mapping,
  ValidMemberships,
  Rect2Points,
};
