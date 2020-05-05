import 'rxjs/add/operator/map';
import 'rxjs-compat/add/observable/of';
import {Injectable} from '@angular/core';
import {RestService} from '../../core/service/rest.service';
import {DocumentStats} from '../../core/model/document.stats.model';
import {ReduceRequest} from '../../core/model/reduce.request.model';
import {UserService} from '../../user/service/user.service';
import {ReducedResult} from "../../core/model/reduced.stats.model";
import {GroupType} from "../../core/model/group.type.enum";

@Injectable()
export class ActivityStatisticsService {
  defaultGroupConfig = [GroupType.EMAIL, GroupType.ACTIVITY_TYPE, GroupType.YEAR, GroupType.MONTH, GroupType.DAY];

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
      .post(`/activity-statistics/stats`, this.prepareReduceRequest(startKey, endKey, groupLevel))
      .map((response: any) =>
        Object
          .entries(response)
          .map(([key, value]) => {
            return new ReducedResult<DocumentStats>(
              this.prepareGroupMap(this.defaultGroupConfig, key),
              new DocumentStats(
                value['sum'],
                value['count'],
                value['min'],
                value['max'],
                value['sumsqr']))
          }));

  findByKeys = (results: ReducedResult<DocumentStats>[], map: Map<GroupType, string>) => {
    for (let result of results) {
      let foundResult = true;
      for (let key of map.keys()) {
        if (result.groupMap[key] !== map[key]) {
          foundResult = false;
          break;
        }
      }
      if (foundResult) {
        return result;
      }
    }
    console.error('Result not found for keys', map)
  }

  prepareKey = (activityType: any, date: Date) =>
    [
      activityType,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ];

  private prepareGroupMap = (configuration: GroupType[],
                             groupsString): Map<GroupType, string> => {
    let map = new Map<GroupType, any>();
    groupsString
      .split(',')
      .forEach((value: string, index: number) => {
        map.set(configuration[index], value);
      })
    return map;
  };

  private prepareReduceRequest = (startKey: any[],
                                  endKey: any[],
                                  groupLevel: number) =>
    new ReduceRequest(
      groupLevel,
      [this.userService.user.email].concat(startKey),
      [this.userService.user.email].concat(endKey));

  private static mapToDocumentStats = (obj: any) => new DocumentStats(obj['sum'], obj['count'], obj['min'], obj['max'], obj['sumsqr']);
}
