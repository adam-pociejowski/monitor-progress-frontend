import 'rxjs/add/operator/map';
import 'rxjs-compat/add/observable/of';
import {Injectable} from '@angular/core';
import {RestService} from '../../core/service/rest.service';
import {ReduceRequest} from '../../core/model/reduce.request.model';
import {UserService} from '../../user/service/user.service';
import {GroupType} from "../../core/model/group.type.enum";
import {ReducedResultService} from "../../core/service/reduced.result.service";

@Injectable()
export class ActivityStatisticsService {
  WITH_ACTIVITY_TYPE_CONFIG = [GroupType.EMAIL, GroupType.ACTIVITY_TYPE, GroupType.YEAR, GroupType.MONTH, GroupType.DAY];
  WITHOUT_ACTIVITY_TYPE_CONFIG = [GroupType.EMAIL, GroupType.YEAR, GroupType.MONTH, GroupType.DAY];

  constructor(private restService: RestService, private userService: UserService) {}

  getFitnessPoints = (startKey: any[], endKey: any[], groupLevel: number) =>
    this.restService
      .post(`/activity-statistics/fitness-points`, this.prepareReduceRequest(startKey, endKey, groupLevel))
      .map((response: any) => ReducedResultService.mapToReducedResults(response, this.WITHOUT_ACTIVITY_TYPE_CONFIG));

  getStats = (startKey: any[], endKey: any[], groupLevel: number) =>
    this.restService
      .post(`/activity-statistics/stats`, this.prepareReduceRequest(startKey, endKey, groupLevel))
      .map((response: any) => ReducedResultService.mapToReducedResults(response, this.WITH_ACTIVITY_TYPE_CONFIG));

  prepareKey = (date: Date) =>
    [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ];

  private prepareReduceRequest = (startKey: any[], endKey: any[], groupLevel: number) =>
    new ReduceRequest(
      groupLevel,
      [this.userService.user.email].concat(startKey),
      [this.userService.user.email].concat(endKey));
}
