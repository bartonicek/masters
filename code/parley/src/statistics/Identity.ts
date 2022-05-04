import * as datastr from "../datastructures";

export class Identity {
  x: datastr.VectorGeneric;
  y: datastr.VectorGeneric;

  constructor(data: datastr.DataFrame, mapping: datastr.Mapping) {
    this.x = data[mapping.get("x")];
    this.y = data[mapping.get("y")];
  }
}
