import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivityConfig} from "../../../../model/activity/activity.config.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Period} from "../../../../model/goal/period.enum";
import {GoalMeasure} from "../../../../model/goal/goal.measure.enum";
import {Goal} from "../../../../model/goal/goal.model";

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {
  @Output() activityGoalAdded = new EventEmitter<Goal>();
  @Input() configs: ActivityConfig[];
  activityTypes: string[] = ['ALL'];
  periods: Period[] = [Period.NONE, Period.DAILY, Period.WEEKLY, Period.MONTHLY, Period.YEARLY];
  goalMeasures: GoalMeasure[] = [GoalMeasure.FITNESS_POINTS, GoalMeasure.SUM, GoalMeasure.MAXIMUM, GoalMeasure.AVERAGE];
  addGoalFormGroup = new FormGroup({
    activityType: new FormControl('ALL'),
    period: new FormControl(Period.NONE),
    goalMeasure: new FormControl(GoalMeasure.FITNESS_POINTS),
    amount: new FormControl(0)
  });

  constructor() {}

  ngOnInit(): void {
    this.configs
      .forEach((config: ActivityConfig) => this.activityTypes.push(config.name));
  }

  onGoalSubmitted = () => {
    let form = this.addGoalFormGroup.getRawValue();
    this.activityGoalAdded.emit(new Goal(
      form.activityType,
      form.period,
      form.goalMeasure,
      form.amount,
      new Date()
    ));
  }
}
