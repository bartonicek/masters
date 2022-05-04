import * as stats from "../statistics.js";

export class Bodies {
  stat: stats.Stat;
  scales: any;
  defaultStat: string;

  constructor() {
    this.defaultStat = "identity";
  }

  registerScales = (scales: any) => {
    this.scales = scales;
  };

  registerStat = (data, mapping, statistic = this.defaultStat, ...args) => {
    this.stat = stats[statistic](data, mapping, ...args);
  };
}
