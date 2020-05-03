import 'rxjs/add/operator/map';
import 'rxjs-compat/add/observable/of';
import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import { DocumentStats } from '../../core/model/document.stats.model';
import { ReduceRequest } from '../model/reduce.request.model';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class ActivityStatisticsService {

  constructor(private restService: RestService,
              private userService: UserService) {
  }

  getFitnessPoints = (startKey: any[],
                      endKey: any[],
                      groupLevel: number) =>
    this.restService
      .post(`/activity-statistics/fitness-points`, this.prepareReduceRequest(startKey, endKey, groupLevel))
      .map((response: any) => {
        let map = new Map<string, Map<string, DocumentStats>>();
        for (const [date, results] of Object.entries(response)) {
          let groups = date.split(',');
          let activityType = groups[1];
          let year = +groups[2] - 2000;
          let month = +groups[3] < 10 ? `0${+groups[3]}` : +groups[3];
          let day = +groups[4] < 10 ? `0${+groups[4]}` : +groups[4];
          let dateKey = `${day}/${month}/${year}`;
          if (!map.has(dateKey)) {
            let dayResultsMap = new Map<string, DocumentStats>();
            dayResultsMap.set(activityType, ActivityStatisticsService.mapToDocumentStats(results));
            map.set(dateKey, dayResultsMap);
          } else {
            map.get(dateKey).set(activityType, ActivityStatisticsService.mapToDocumentStats(results));
          }
        }
        return map;
      });

  getStats = (startKey: any[],
              endKey: any[],
              groupLevel: number) =>
    this.restService
      .post(`/activity-statistics/stats`, this.prepareReduceRequest(startKey, endKey, groupLevel));

  prepareKey = (activityType: any, date: Date) =>
    [
      activityType,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ];

  private prepareReduceRequest = (startKey: any[],
                                  endKey: any[],
                                  groupLevel: number) =>
    new ReduceRequest(
            groupLevel,
            [this.userService.user.email].concat(startKey),
            [this.userService.user.email].concat(endKey));



  getStatsPerWeek = () =>
    this.restService
      .get(`/activity-statistics/stats-per-week`)
      .map((response: any) => {
        let map = new Map<string, Map<string, DocumentStats>>();
        for (const [date, results] of Object.entries(response)) {
          let dayResultsMap = new Map<string, DocumentStats>();
          for (const [activityType, result] of Object.entries(results)) {
            dayResultsMap.set(activityType, ActivityStatisticsService.mapToDocumentStats(result));
          }
          map.set(date, dayResultsMap);
        }
        return map;
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
    return `${date.getFullYear()}-${month}-${day}`;
  };

  private static mapToDocumentStats = (obj: any) => new DocumentStats(obj['sum'], obj['count'], obj['min'], obj['max'], obj['sumsqr']);
}
