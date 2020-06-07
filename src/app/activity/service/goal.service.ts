import { Injectable } from '@angular/core';
import { RestService } from '../../core/service/rest.service';
import 'rxjs/add/operator/map';
import "rxjs-compat/add/observable/of";
import { Goal } from "../model/goal/goal.model";
import { CrudService } from "./crud.service";
import {GoalItem} from "../model/goal/goal-item.model";

@Injectable({
  providedIn: 'root',
})
export class GoalService extends CrudService<Goal> {

  constructor(restService: RestService) {
    super(restService, '/goal');
  }

  mapToObject = (obj: any): Goal =>
    new Goal(
      obj.activityType,
      obj.period,
      obj.goalMeasure,
      obj.goalAmount,
      obj.creationDate,
      obj.archived,
      obj.elapsedGoals
        .map((item: any) => this.mapToGoalItem(item)),
      this.mapToGoalItem(obj.currentGoal)
    )

  private mapToGoalItem = (data: any) =>
    new GoalItem(
      data.amount,
      data.startDate,
      data.endDate
    )
}
