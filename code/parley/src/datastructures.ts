type VectorGeneric = (number | string | boolean)[];
type VectorNumeric = number[];
type VectorDiscrete = (string | boolean)[];

type DataFrame = {
  [index: string]: VectorGeneric;
};

type Mapping = Map<string, string>;

export { VectorGeneric, VectorNumeric, VectorDiscrete, DataFrame, Mapping };
