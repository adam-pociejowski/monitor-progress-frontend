import { Component, OnInit } from '@angular/core';
import { ActivityStatisticsService } from '../../service/activity-statistics.service';
import { DocumentStats } from '../../../core/model/document.stats.model';
import { ChartModel } from '../../model/chart/chart.model';
import { ChartSeries } from '../../model/chart/chart.series.model';
import { ShortDatePipe } from '../../../core/pipe/short.date.pipe';
import { ActivityService } from "../../service/activity.service";
import {ReducedResult} from "../../../core/model/reduced.stats.model";
import {GroupType} from "../../../core/model/group.type.enum";
import {ReducedResultService} from "../../../core/service/reduced.result.service";

@Component({
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: ['./progress-dashboard.component.css']
})
export class ProgressDashboardComponent implements OnInit {
  view: any[] = [window.innerWidth - 150, 300];
  selectedActivityTypes = ['PULL_UP', 'PULL_UP_BICEPS', 'PUSH_UP', 'PUSH_UP_BICEPS', 'PUSH_UP_ELEVATED'];
  selectedChartAggregates = ['AVG', 'MAX', 'SUM', 'COUNT'];
  dateChartData: Map<string, Array<ChartModel>>;
  weekChartData: Map<string, Array<ChartModel>>;
  legend: boolean = true;
  animations: boolean = true;
  colorScheme = {
    domain: ['#CFC0BB', '#000063', '#00600f', '#ab000d', '#81d4fa', '#d500f9', '#37474f', '#ff8f00']
  };
  datePipe = new ShortDatePipe();
  visibleDiagram: string;

  constructor(private activityStatisticsService: ActivityStatisticsService) {}

  ngOnInit(): void {
    this.activityStatisticsService
      .getStats(
        ['', 0],
        [{}, new Date().getFullYear()+1],
        5)
      .subscribe((results: ReducedResult<DocumentStats>[]) => {
        console.log(results);
        this.dateChartData = this.prepareChartData('DATE', results);
        this.visibleDiagram = 'DATE';
      });
  }

  prepareChartData = (type: string,
                      results: ReducedResult<DocumentStats>[]) => {
    let data = this.prepareResultsMap(results);
    let chartData: Map<string, Array<ChartModel>> = this.initChartData(type, data);
    this.selectedActivityTypes
      .map((activityType: string) => {
        let activityStats: Map<string, DocumentStats> = data.get(activityType);
        if (activityStats) {
          this.initChartModelsForActivityType(chartData, activityType);
          activityStats.forEach((documentStats: DocumentStats, date: string) => {
            for (let aggregate of this.selectedChartAggregates) {
              chartData
                .get(aggregate)
                .find(x => x.name == activityType)
                .series
                .push(
                  new ChartSeries(type == 'DATE' ?
                    this.datePipe.transform(new Date(Date.parse(date)).toISOString()) :
                    date,
                    this.getValueDependsOnAggregate(documentStats, aggregate)));
            }
          });
        }
      });
    return chartData;
  };

  private prepareResultsMap = (results: ReducedResult<DocumentStats>[]) => {
    let data = new Map<string, Map<string, DocumentStats>>();
    results
      .forEach((result: ReducedResult<DocumentStats>) => {
        if (!data.has(result.groupMap.get(GroupType.ACTIVITY_TYPE))) {
          data.set(result.groupMap.get(GroupType.ACTIVITY_TYPE), new Map<string, DocumentStats>());
        }
        data.get(result.groupMap.get(GroupType.ACTIVITY_TYPE)).set(ReducedResultService.mapToDateString(result, "YYYY-MM-dd"), result.value)
      })
    return data;
  }

  private getValueDependsOnAggregate = (documentStats: DocumentStats, aggregate: string) => {
    switch (aggregate) {
      case 'SUM':
        return documentStats.sum;
      case 'MAX':
        return documentStats.max;
      case 'COUNT':
        return documentStats.count;
      case 'AVG':
        return documentStats.sum / documentStats.count;
    }
  };

  private initChartData = (type: string,
                           data: Map<string, Map<string, DocumentStats>>) => {
    let chartData = new Map<string, Array<ChartModel>>();
    let datesArray = this.generateDatesArray(this.findMinDate(data), new Date());
    this.selectedChartAggregates
      .forEach((aggregate: string) => {
        chartData.set(aggregate, new Array<ChartModel>());
        if (type == 'DATE') {
          this.appendAllDatesModel(aggregate, datesArray, chartData);
        }
        this.selectedActivityTypes
          .forEach((activityType: string) => {
            chartData.get(aggregate).push(new ChartModel(activityType, []));
          });
      });
    return chartData;
  };

  private appendAllDatesModel = (aggregate: string,
                                 datesArray: Date[],
                                 chartData: Map<string, Array<ChartModel>>) =>
    chartData
      .get(aggregate)
      .push(new ChartModel('ALL_DATES', datesArray
        .map((date: Date) => new ChartSeries(this.datePipe.transform(date.toISOString()), 0))));

  private generateDatesArray = (minDate: Date, maxDate: Date) => {
    let dates = [];
    let currentDate = new Date(minDate.getTime());
    while (ProgressDashboardComponent.isBeforeOrEqual(currentDate, maxDate)) {
      dates.push(new Date(currentDate.getTime()));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  private static isBeforeOrEqual(dateBefore: Date, dateAfter: Date) {
    dateBefore.setHours(0, 0, 0, 0);
    dateAfter.setHours(0, 0, 0, 0);
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
          });
      });
    return new Date(minDate);
  };

  private initChartModelsForActivityType = (chartData: Map<string, Array<ChartModel>>, activityType: string) =>
    chartData
      .forEach((chartModels: Array<ChartModel>, aggregate: string) => {
        chartModels.push(new ChartModel(activityType, []));
      });
}
