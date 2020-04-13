import { Component, OnInit } from '@angular/core';
import { ActivityStatisticsService } from "../../service/activity-statistics.service";
import { DocumentStats } from "../../../core/model/document.stats.model";
import { ChartModel } from "../../model/chart.model";
import { ActivityService } from "../../service/activity.service";
import { ActivityConfig } from "../../model/activity.config.model";
import {ChartSeries} from "../../model/chart.series.model";
import {ShortDatePipe} from "../../../core/pipe/short.date.pipe";

@Component({
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: ['./progress-dashboard.component.css']
})
export class ProgressDashboardComponent implements OnInit {
  view: any[] = [700, 300];
  selectedActivityTypes = ['PULL_UP', 'PUSH_UP'];
  selectedChartAggregates = ['COUNT', 'SUM', 'AVG', 'MAX'];
  allAggregates = ['COUNT', 'SUM', 'AVG', 'MAX'];
  chartData: Map<string, Array<ChartModel>>;
  legend: boolean = true;
  animations: boolean = true;
  xAxisLabel: string = 'Date';
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  data: Map<string, Map<string, DocumentStats>>;
  datePipe = new ShortDatePipe();

  constructor(private activityStatisticsService: ActivityStatisticsService,
              private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.activityStatisticsService
      .getStatsPerDate()
      .subscribe((response: Map<string, Map<string, DocumentStats>>) => {
        this.data = response;
        this.prepareChartData();
      });
  }

  prepareChartData = () => this.activityService
      .getConfigs()
      .subscribe((configs: ActivityConfig[]) => {
        let chartData: Map<string, Array<ChartModel>> = this.initChartData();
        this.selectedActivityTypes
          .map((activityType: string) => {
            let activityStats: Map<string, DocumentStats> = this.data.get(activityType);
            this.initChartModelsForActivityType(chartData, activityType);
            activityStats.forEach((documentStats: DocumentStats, date: string) => {
              for (let aggregate of this.selectedChartAggregates) {
                chartData
                  .get(aggregate)
                  .find(x => x.name == activityType)
                  .series
                  .find(series => {
                    return this.datePipe.transform(new Date(Date.parse(date)).toISOString()) == series.name
                  })
                  .value = this.getValueDependsOnAggregate(documentStats, aggregate);
              }
            })
          })
        this.chartData = chartData;
      });

  private getValueDependsOnAggregate = (documentStats: DocumentStats, aggregate: string) => {
    switch (aggregate) {
      case 'SUM': return documentStats.sum;
      case 'MAX': return documentStats.max;
      case 'COUNT': return documentStats.count;
      case 'AVG': return documentStats.sum / documentStats.count;
    }
  }

  private initChartData = () => {
    let chartData = new Map<string, Array<ChartModel>>();
    let datesArray = this.generateDatesArray(this.findMinDate(this.data), new Date());
    this.selectedChartAggregates
      .forEach((aggregate: string) => {
        chartData.set(aggregate, new Array<ChartModel>());
        this.selectedActivityTypes
          .forEach((activityType: string) => {
            chartData.get(aggregate).push(new ChartModel(activityType, this.prepareEmptyChartSeries(datesArray)))

          })
      })
    return chartData;
  }

  private prepareEmptyChartSeries = (datesArray: Date[]) =>
    datesArray
      .map((date: Date) => new ChartSeries(this.datePipe.transform(date.toISOString()), 0));

  private generateDatesArray = (minDate: Date, maxDate: Date) => {
    let dates = [];
    let currentDate = new Date(minDate.getTime());
    while (ProgressDashboardComponent.isBeforeOrEqual(currentDate, maxDate)) {
      dates.push(new Date(currentDate.getTime()));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  private static isBeforeOrEqual(dateBefore: Date, dateAfter: Date) {
    dateBefore.setHours(0,0,0,0);
    dateAfter.setHours(0,0,0,0);
    return dateBefore.getTime() <= dateAfter.getTime();
  }

  private findMinDate = (data: Map<string, Map<string, DocumentStats>>) => {
      let minDate = new Date().getTime();
      data
        .forEach((activityResults: Map<string, DocumentStats>, activityType: string) => {
          activityResults
            .forEach((activityResult: DocumentStats, date: string) => {
              if (Date.parse(date) < minDate) {
                minDate = Date.parse(date);
              }
            })
        })
      return new Date(minDate);
   }

  private initChartModelsForActivityType = (chartData: Map<string, Array<ChartModel>>, activityType: string) =>
    chartData
      .forEach((chartModels: Array<ChartModel>, aggregate: string) => {
        chartModels.push(new ChartModel(activityType, []));
      });
}
