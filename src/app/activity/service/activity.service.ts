import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import { DocumentModel } from '../../core/model/document.model';
import { Activity } from '../model/activity.model';
import { Measure } from '../model/measure.model';
import { Observable } from 'rxjs';
import { ActivityConfig } from '../model/activity.config.model';
import {DocumentStats} from "../../core/model/document.stats.model";

@Injectable()
export class ActivityService {

  constructor(private restService: RestService) {}

  getStats = () => {
    return this.restService
      .get('/activity/stats')
      .map((obj: any) => {
        let stats: any = {};
        for (let key in obj) {
          let element = obj[key];
          stats[key] = new DocumentStats(element.sum, element.count, element.min, element.max, element.sumsqr);
        }
        return stats;
      });
  };

  findConfig = () =>
    this.restService
      .get('/activity/config')
      .map((response: any) =>
        response.map((element: any) => new ActivityConfig(element.name, element.measureType, element.fitnessPointsFactor)));

  findOlderDocuments = (limit: number, previousDate: string): Observable<DocumentModel<Activity>[]> =>
    this.restService
      .get(`/activity/older/${limit}/${previousDate}`)
      .map((response: any) =>
        response.map((element: any) => this.mapToActivityDocument(element)));

  findNewerDocuments = (limit: number, previousDate: string): Observable<DocumentModel<Activity>[]> =>
    this.restService
      .get(`/activity/older/${limit}/${previousDate}`)
      .map((response: any) =>
        response.map((element: any) => this.mapToActivityDocument(element)));

  add = (activity: Activity) =>
    this.restService
      .post('/activity', activity);

  update = (updatedDocument: DocumentModel<Activity>) =>
    this.restService
      .put('/activity', updatedDocument);

  delete = (removedDocument: DocumentModel<Activity>) =>
    this.restService
      .delete(`/${removedDocument.id}/${removedDocument.rev}`);

  private mapToActivityDocument = (element: any): DocumentModel<Activity> =>
    new DocumentModel<Activity>(
      element.id,
      element.rev,
      new Activity(
        element.value.name,
        element.value.datetime,
        element.value.type,
        new Measure(
          element.value.measure.type,
          element.value.measure.value),
        element.value.fitnessPoints,
        element.value.metadata)
    );
}
