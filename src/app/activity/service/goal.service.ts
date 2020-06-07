import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import 'rxjs/add/operator/map';
import "rxjs-compat/add/observable/of";
import { Goal } from "../model/goal/goal.model";
import { CrudService } from "./crud.service";

@Injectable({
  providedIn: 'root',
})
export class GoalService extends CrudService<Goal> {

  constructor(restService: RestService) {
    super(restService, '/goal')
  }
}
