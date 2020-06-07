import { Component, OnInit } from '@angular/core';
import { ActivityConfig } from "../../../model/activity/activity.config.model";
import { ActivityService } from "../../../service/activity.service";
import { Goal } from "../../../model/goal/goal.model";
import { Period } from "../../../model/goal/period.enum";
import { GoalMeasure } from "../../../model/goal/goal.measure.enum";
import { GoalItem } from "../../../model/goal/goal-item.model";
import { GoalService } from "../../../service/goal.service";
import {DocumentModel} from "../../../../core/model/document.model";

@Component({
  selector: 'app-goal-panel',
  templateUrl: './goal-panel.component.html',
  styleUrls: ['./goal-panel.component.css']
})
export class GoalPanelComponent implements OnInit {
  goalAddIconClicked = false;
  configs: ActivityConfig[];
  goals: Goal[];

  constructor(private activityService: ActivityService,
              private goalService: GoalService) {}

  ngOnInit(): void {
    this.activityService.getConfigs()
      .subscribe((configs: ActivityConfig[]) => this.configs = configs);
    this.getGoals();
  }

  getGoals = () => {
    this.goalService
      .findAll()
      .subscribe((goals: DocumentModel<Goal>[]) => {
        console.log('getGoals', goals);
      });

    this.goals = [
      new Goal(
        'ALL',
        Period.DAILY,
        GoalMeasure.SUM,
        50,
        new Date(),
        false,
        [],
        new GoalItem(
          10,
          new Date(),
          new Date())),
      new Goal(
        'PUSH_UP',
        Period.WEEKLY,
        GoalMeasure.FITNESS_POINTS,
        23,
        new Date(),
        false,
        [],
        new GoalItem(
          27,
          new Date(),
          new Date()))
    ];
  }

  onGoalAddIconClicked = () => {
    this.goalAddIconClicked = !this.goalAddIconClicked;
  }

  onGoalAdded = (goal: Goal) => {
    this.goalService
      .add(goal)
      .subscribe((response: any) => {
        console.log('goal added');
      })
    console.log(goal);
  }
}
