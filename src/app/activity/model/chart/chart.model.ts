import { ChartSeries } from "./chart.series.model";

export class ChartModel {
  constructor(public name: string,
              public series: ChartSeries[]) {
  }
}
