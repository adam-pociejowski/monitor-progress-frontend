import {Component, OnInit} from '@angular/core';
import {ActivityGoal} from "../../../../model/activity-goal.model";
import {Period} from "../../../../../core/model/period.enum";
import {GoalMeasure} from "../../../../../core/model/goal.measure.enum";

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  goals: ActivityGoal[] = [
    new ActivityGoal('ALL', Period.DAILY, GoalMeasure.SUM, 50, 40),
    new ActivityGoal('ALL', Period.DAILY, GoalMeasure.SUM, 50, 40),
    new ActivityGoal('PUSH_UP', Period.WEEKLY, GoalMeasure.SUM, 50, 78),
    new ActivityGoal('PULL_UP', Period.DAILY, GoalMeasure.FITNESS_POINTS, 56, 40)
  ]

  constructor() { }

  ngOnInit(): void {}

}
