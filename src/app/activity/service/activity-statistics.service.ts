import 'rxjs/add/operator/map';
import "rxjs-compat/add/observable/of";
import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import { DocumentStats } from "../../core/model/document.stats.model";

@Injectable()
export class ActivityStatisticsService {

  constructor(private restService: RestService) {}

  getFitnessPointsPerDay = (startKey: string, endKey: string) =>
    this.restService
      .get(`/activity-statistics/fitness-points-per-day/${startKey}/${endKey}`);

  getStatsPerDate = () =>
    this.restService
      .get(`/activity-statistics/stats-per-date`)
      .map((response: any) => {
        let map = new Map<string, Map<string, DocumentStats>>()
        for (const [date, results] of Object.entries(response)) {
          let dayResultsMap = new Map<string, DocumentStats>()
          for (const [activityType, result] of Object.entries(results)) {
            dayResultsMap.set(activityType, ActivityStatisticsService.mapToDocumentStats(result))
          }
          map.set(date, dayResultsMap);
        }
        return map;
      });

  getStats = () =>
    this.restService
      .get(`/activity-statistics/stats`)
      .map((response: any) => {
        for (const [key, value] of Object.entries(response)) {
          response[key] = ActivityStatisticsService.mapToDocumentStats(value);
        }
        return response;
      });

  static getDateString = (date: Date) => {
    let month = (date.getMonth() + 1).toString();
    if (date.getMonth() + 1 < 10) {
      month = `0${month}`;
    }
    let day = date.getDate().toString();
    if (date.getDate() < 10) {
      day = `0${day}`;
    }
    return  `${date.getFullYear()}-${month}-${day}`;
  }

  private static mapToDocumentStats = (obj: any) => new DocumentStats(obj['sum'], obj['count'], obj['min'], obj['max'], obj['sumsqr']);
}
