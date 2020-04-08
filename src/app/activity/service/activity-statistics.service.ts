import 'rxjs/add/operator/map';
import "rxjs-compat/add/observable/of";
import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import { DocumentStats } from "../../core/model/document.stats.model";

@Injectable()
export class ActivityStatisticsService {

  constructor(private restService: RestService) {}

  getFitnessPointsPerDay = (startKey: string, endKey: string) => {
    return this.restService
      .get(`/activity-statistics/stats-per-day/${startKey}/${endKey}`);
  };

  getStats = () => {
    return this.restService
      .get('/activity-statistics/stats')
      .map((obj: any) => {
        let stats: any = {};
        for (let key in obj) {
          let element = obj[key];
          stats[key] = new DocumentStats(element.sum, element.count, element.min, element.max, element.sumsqr);
        }
        return stats;
      });
  };

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
}
