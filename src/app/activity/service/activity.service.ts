import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import { DocumentModel } from '../../core/model/document.model';
import { Activity } from '../model/activity/activity.model';
import { Measure } from '../model/activity/measure.model';
import { ActivityConfig } from '../model/activity/activity.config.model';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs-compat/add/observable/of";
import {CrudService} from "./crud.service";

@Injectable({
  providedIn: 'root',
})
export class ActivityService extends CrudService<Activity>{
  configs: ActivityConfig[] = [];
  onActivityAdded = new Subject<Activity>();
  editingActivity: DocumentModel<Activity>;

  constructor(restService: RestService) {
    super(restService, '/activity')
  }

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
    return Observable.of(this.configs);
  };

  findOlderDocuments = (limit: number, previousDate: string): Observable<DocumentModel<Activity>[]> =>
    this.restService
      .get(`/activity/older/${limit}/${previousDate}`)
      .map((response: any) =>
        response.map((element: any) => this.mapToDocument(element)));

  mapToObject = (obj: any): Activity =>
    new Activity(
      obj.name,
      obj.datetime,
      obj.type,
      new Measure(
        obj.measure.type,
        obj.measure.value),
      obj.fitnessPoints,
      obj.metadata);
}
