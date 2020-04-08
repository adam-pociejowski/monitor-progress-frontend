import 'rxjs/add/operator/map';
import "rxjs-compat/add/observable/of";
import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import { DocumentStats } from "../../core/model/document.stats.model";

@Injectable()
export class ActivityStatisticsService {

  constructor(private restService: RestService) {}

  getFitnessPointsPerDay = () => {
    return this.restService
      .get('/activity-statistics/stats-per-day');
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
}
