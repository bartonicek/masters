console.log("hello worlde");

class Entity {
  stat: any;
  scales: any;

  constructor() {}

  registerStat = (stat: any) => {
    this.stat = stat;
  };

  registerScales = (scales: any) => {
    this.scales = scales;
  };
}
