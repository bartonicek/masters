// Generic vector type has to be dirty otherwise .map() and .filter() don't work
type VectorGeneric = (number | string | boolean)[];

// Pure vector types
// type Vector<Type extends unknown> = Type extends unknown ? Type[] : never;
// type VectorNumeric = Vector<number>;
// type VectorString = Vector<string>;

// type VectorGeneric = number[] | string[] | boolean[];
// type VectorNumeric = number[];
// type VectorDiscrete = string[] | boolean[];

type DataFrame = {
  [index: string]: VectorGeneric;
};

type Mapping = Map<string, string>;

export { VectorGeneric, DataFrame, Mapping };
