import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../../../service/activity.service";
import { ActivityConfig } from "../../../../model/activity.config.model";
import { FormControl, FormGroup } from "@angular/forms";
import {Period} from "../../../../../core/model/period.enum";
import {GoalMeasure} from "../../../../../core/model/goal.measure.enum";

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {
  configs: ActivityConfig[];
  activityTypes: string[] = ['ALL'];
  periods: Period[] = [Period.NONE, Period.DAILY, Period.WEEKLY, Period.YEARLY];
  goalMeasures: GoalMeasure[] = [GoalMeasure.FITNESS_POINTS, GoalMeasure.SUM, GoalMeasure.MAXIMUM, GoalMeasure.AVERAGE];
  addGoalFormGroup = new FormGroup({
    activityType: new FormControl('ALL'),
    period: new FormControl(Period.NONE),
    goalMeasure: new FormControl(GoalMeasure.FITNESS_POINTS),
    amount: new FormControl(0)
  });

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityService.getConfigs()
      .subscribe((configs: ActivityConfig[]) => {
        this.configs = configs;
        configs.forEach((config: ActivityConfig) => this.activityTypes.push(config.name));
      });
  }

}
