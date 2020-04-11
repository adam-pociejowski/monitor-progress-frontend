import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import { DocumentModel } from '../../core/model/document.model';
import { Activity } from '../model/activity.model';
import { Measure } from '../model/measure.model';
import { ActivityConfig } from '../model/activity.config.model';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs-compat/add/observable/of";

@Injectable()
export class ActivityService {
  configs: ActivityConfig[] = [];
  onActivityAdded = new Subject<Activity>();

  constructor(private restService: RestService) {}

  getConfigByName = (name: string) => {
    return this.getConfigs()
      .map((configs : ActivityConfig[]) => {
        for (let config of configs)
          if (config.name === name)
            return config;
      });
  };

  getConfigs = () => {
    if (this.configs.length == 0) {
      return this.restService
        .get('/activity/config')
        .map((response: any) => {
            this.configs = response.map((element: any) => new ActivityConfig(element.name, element.measureType, element.fitnessPointsFactor));
            return this.configs;
        });
    }
    return Observable.of(this.configs)
  };

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
