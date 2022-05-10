// Generic vector type has to be dirty otherwise methods like .map()
// and .filter() don't work
type VectorGeneric = (number | string | boolean)[];

type DataFrame = {
  [index: string]: VectorGeneric;
};

type ValidMappings = "x" | "y" | "z" | "size" | "col" | "shape";
type Mapping = Map<ValidMappings, string>;

export { VectorGeneric, DataFrame, ValidMappings, Mapping };
